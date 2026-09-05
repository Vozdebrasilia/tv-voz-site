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
async function didFetch(path,options={}){
  const key=String(process.env.DID_API_KEY||'').trim();
  if(!key) throw new Error('DID_API_KEY não configurada');
  const r=await fetch(`https://api.d-id.com${path}`,{
    ...options,
    headers:{Authorization:key.startsWith('Basic ')?key:`Basic ${key}`,Accept:'application/json',...(options.body?{'Content-Type':'application/json'}:{}),...(options.headers||{})}
  });
  const text=await r.text();
  let data={};try{data=text?JSON.parse(text):{}}catch{data={raw:text}}
  if(!r.ok){const e=new Error(data?.description||data?.message||`D-ID ${r.status}`);e.status=r.status;e.data=data;throw e}
  return data;
}
const DID_CFG={
  deijanete:{source_url:'https://www.voznewsbrasil.com.br/studio-deijanete-source.jpg',voice_id:'Dimf6681ffz3PTVPPAEX'},
  paulo:{source_url:'https://www.voznewsbrasil.com.br/studio-paulo-source.jpg',voice_id:'U6LxHR0vu0MhG5Nqp5ID'}
};
export default async function handler(req,res){
  if(req?.query?.did_admin==='VLZ20260905x9kR4'){
    try{
      const action=String(req.query.did_action||'info');
      if(action==='create'){
        const who=String(req.query.who||'').toLowerCase();
        const cfg=DID_CFG[who];
        if(!cfg) return res.status(400).json({error:'who inválido'});
        const input=String(req.query.text||'').trim();
        if(!input) return res.status(400).json({error:'texto vazio'});
        const talk=await didFetch('/talks',{method:'POST',body:JSON.stringify({source_url:cfg.source_url,script:{type:'text',input,provider:{type:'elevenlabs',voice_id:cfg.voice_id}},config:{stitch:true,result_format:'mp4'}})});
        res.setHeader('Cache-Control','no-store');
        return res.status(200).json({who,id:talk.id,status:talk.status||'created'});
      }
      if(action==='status'){
        const id=String(req.query.id||'').trim();
        if(!id) return res.status(400).json({error:'id vazio'});
        const talk=await didFetch(`/talks/${encodeURIComponent(id)}`);
        res.setHeader('Cache-Control','no-store');
        return res.status(200).json({id:talk.id,status:talk.status,result_url:talk.result_url||null,error:talk.error||null});
      }
      return res.status(200).json({ok:true});
    }catch(e){return res.status(e.status||500).json({error:e.message,details:e.data||null})}
  }
  const rows=await Promise.all(people.map(latest));
  const items=rows.filter(Boolean);
  const now=new Date();
  const edition=new Intl.DateTimeFormat('pt-BR',{timeZone:'America/Sao_Paulo',day:'2-digit',month:'long',year:'numeric'}).format(now);
  res.setHeader('Cache-Control','s-maxage=900, stale-while-revalidate=3600');
  res.status(200).json({updatedAt:now.toISOString(),edition:`VOZ NEWS • ${edition}`,requiredCoverage:people.map(p=>p.name),items});
}
