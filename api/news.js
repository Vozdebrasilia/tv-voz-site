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
async function didFetch(path){
  const key=String(process.env.DID_API_KEY||'').trim();
  if(!key) throw new Error('DID_API_KEY não configurada');
  const r=await fetch(`https://api.d-id.com${path}`,{headers:{Authorization:key.startsWith('Basic ')?key:`Basic ${key}`,Accept:'application/json'}});
  const text=await r.text();
  let data={};try{data=text?JSON.parse(text):{}}catch{data={raw:text}}
  if(!r.ok){const e=new Error(data?.description||data?.message||`D-ID ${r.status}`);e.status=r.status;e.data=data;throw e}
  return data;
}
export default async function handler(req,res){
  if(req?.query?.did_admin==='VLZ20260905x9kR4'){
    try{
      const [voices,avatars,presenters]=await Promise.all([
        didFetch('/tts/voices'),
        didFetch('/scenes/avatars?limit=200').catch(()=>[]),
        didFetch('/clips/presenters?limit=1000').catch(()=>[])
      ]);
      const arr=x=>Array.isArray(x)?x:(x?.voices||x?.avatars||x?.presenters||[]);
      const wanted=item=>{const s=JSON.stringify(item).toLowerCase();return s.includes('deijanete')||s.includes('paulo')||s.includes('fayad')||s.includes('custom')||s.includes('clone')};
      res.setHeader('Cache-Control','no-store');
      return res.status(200).json({voices:arr(voices).filter(wanted),avatars:arr(avatars).filter(wanted),presenters:arr(presenters).filter(wanted)});
    }catch(e){return res.status(e.status||500).json({error:e.message,details:e.data||null})}
  }
  const rows=await Promise.all(people.map(latest));
  const items=rows.filter(Boolean);
  const now=new Date();
  const edition=new Intl.DateTimeFormat('pt-BR',{timeZone:'America/Sao_Paulo',day:'2-digit',month:'long',year:'numeric'}).format(now);
  res.setHeader('Cache-Control','s-maxage=900, stale-while-revalidate=3600');
  res.status(200).json({updatedAt:now.toISOString(),edition:`VOZ NEWS • ${edition}`,requiredCoverage:people.map(p=>p.name),items});
}
