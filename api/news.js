const {buildStudioBlock}=require('../studio-live-core');
const {createTurnVideo,signJob,verifyJob,readTurnVideo}=require('./_studio-live-provider');

const people = [
  {name:'Lula',query:'Lula presidente Brasil',handle:'lulaoficial',source:'Presidência • Brasil'},
  {name:'Celina Leão',query:'Celina Leão Distrito Federal',handle:'celinaleao',source:'GDF • Brasília'},
  {name:'Julio Cesar Ribeiro',query:'Julio Cesar Ribeiro deputado DF',handle:'juliocesarribeiro',source:'Câmara • DF'},
  {name:'Gilberto Nascimento',query:'Gilberto Nascimento deputado SP',handle:'gnascimento_20',source:'Câmara • SP'},
  {name:'Hermeto',query:'Deputado Hermeto DF',handle:'hermeto.oficial',source:'CLDF • Brasília'},
  {name:'Paula Belmonte',query:'Paula Belmonte DF',handle:'paulabelmonteoficial',source:'Política • Brasília'}
];
function clean(s=''){return String(s).replace(/<!\[CDATA\[|\]\]>/g,'').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim()}
async function latest(p){
  try{
    const u='https://news.google.com/rss/search?q='+encodeURIComponent(p.query)+'&hl=pt-BR&gl=BR&ceid=BR:pt-419';
    const r=await fetch(u,{headers:{'user-agent':'VOZNEWS/1.0'}});
    if(!r.ok) throw new Error('rss');
    const xml=await r.text(),item=(xml.match(/<item>[\s\S]*?<\/item>/)||[])[0]||'';
    const title=clean((item.match(/<title>([\s\S]*?)<\/title>/)||[])[1]||'');
    const link=clean((item.match(/<link>([\s\S]*?)<\/link>/)||[])[1]||'');
    return title?{title,summary:`Acompanhe a atualização mais recente sobre ${p.name} na cobertura diária do VOZ NEWS.`,source:p.source,link,image:`/api/instagram-photo?handle=${encodeURIComponent(p.handle)}`,instagram:`https://www.instagram.com/${p.handle}/`}:null;
  }catch(e){return null}
}
async function loadNews(){
  const rows=await Promise.all(people.map(latest));
  const items=rows.filter(Boolean);
  const now=new Date();
  const edition=new Intl.DateTimeFormat('pt-BR',{timeZone:'America/Sao_Paulo',day:'2-digit',month:'long',year:'numeric'}).format(now);
  return {updatedAt:now.toISOString(),edition:`VOZ NEWS • ${edition}`,requiredCoverage:people.map(p=>p.name),items};
}
async function prepareStudioLive(res){
  try{
    const news=await loadNews();
    const block=buildStudioBlock(news.items||[]);
    const videos=await Promise.all(block.turns.map(async turn=>{
      const job=await createTurnVideo(turn);
      return {speaker:turn.speaker,mode:turn.mode,text:turn.text,videoId:job.videoId};
    }));
    const token=signJob({blockId:block.blockId,generatedAt:block.generatedAt,sourceHeadlines:block.sourceHeadlines,videos});
    res.setHeader('Cache-Control','no-store');
    return res.status(202).json({status:'preparing',token,blockId:block.blockId,targetDuration:45});
  }catch(e){
    console.error('studio-live-prepare',e.message);
    return res.status(503).json({status:'unavailable'});
  }
}
async function readStudioLive(req,res){
  try{
    const job=verifyJob(req.query&&req.query.token);
    const states=await Promise.all(job.videos.map(async v=>({v,state:await readTurnVideo(v.videoId)})));
    if(states.some(x=>x.state.status==='failed'))return res.status(503).json({status:'unavailable'});
    if(states.some(x=>x.state.status!=='completed'))return res.status(200).json({status:'preparing'});
    const turns=states.map(({v,state})=>({speaker:v.speaker,mode:v.mode,text:v.text,url:state.url}));
    const total=states.reduce((sum,x)=>sum+(x.state.duration||0),0);
    res.setHeader('Cache-Control','no-store');
    return res.status(200).json({status:'ready',block:{id:job.blockId,duration:total||45,turns}});
  }catch(e){
    return res.status(400).json({status:'unavailable'});
  }
}
export default async function handler(req,res){
  const action=req.query&&req.query.studio_live_action;
  if(action==='prepare'){
    if(req.method!=='POST')return res.status(405).json({error:'method_not_allowed'});
    return prepareStudioLive(res);
  }
  if(action==='state'){
    if(req.method!=='GET')return res.status(405).json({error:'method_not_allowed'});
    return readStudioLive(req,res);
  }
  if(req.method!=='GET')return res.status(405).json({error:'method_not_allowed'});
  const news=await loadNews();
  res.setHeader('Cache-Control','s-maxage=900, stale-while-revalidate=3600');
  return res.status(200).json(news);
}
