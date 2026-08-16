function authHeader(){
  const key=String(process.env.DID_API_KEY||'').trim();
  if(!key) throw new Error('DID_API_KEY ausente');
  return key.startsWith('Basic ')?key:`Basic ${key}`;
}
async function did(path,options={}){
  const r=await fetch(`https://api.d-id.com${path}`,{...options,headers:{Authorization:authHeader(),Accept:'application/json',...(options.body?{'Content-Type':'application/json'}:{}),...(options.headers||{})}});
  const text=await r.text(); let data={}; try{data=text?JSON.parse(text):{}}catch{data={raw:text}};
  return {r,data};
}
module.exports=async function handler(req,res){
  if(!['GET','POST'].includes(req.method)) return res.status(405).json({error:'method'});
  if(String(req.query?.token||'')!=='V33-UNICO-160826-X7Q9') return res.status(401).json({error:'unauthorized'});

  const id=String(req.query?.id||'').trim();
  if(id){
    try{
      const {r,data}=await did('/talks/'+encodeURIComponent(id));
      return res.status(r.status).json({id:data.id||id,status:data.status||null,result_url:data.result_url||null,error:data.error||data.description||data.message||null});
    }catch(e){return res.status(500).json({error:e.message})}
  }

  const presenter=String(req.query?.presenter||'deijanete').toLowerCase();
  const item=presenter==='paulo'?{
    source_url:'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/studio-paulo-source.png',
    voice_id:'U6LxHR0vu0MhG5Nqp5ID',
    text:'Seja bem-vindo ao VOZ NEWS.'
  }:{
    source_url:'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/studio-deijanete-source.png',
    voice_id:'Dimf6681ffz3PTVPPAEX',
    text:'Agora, o destaque do dia.'
  };
  const payload={
    source_url:item.source_url,
    driver_url:'bank://lively/driver-06',
    script:{type:'text',input:item.text,provider:{type:'elevenlabs',voice_id:item.voice_id,voice_config:{stability:0.72,similarity_boost:0.9}}},
    config:{fluent:true,stitch:true,result_format:'mp4'},
    name:`V33 UNICO ${presenter.toUpperCase()}`,
    user_data:JSON.stringify({project:'V33',mode:'teste-unico',presenter})
  };
  try{
    const {r,data}=await did('/talks',{method:'POST',body:JSON.stringify(payload)});
    return res.status(r.status).json({id:data.id||null,status:data.status||null,error:data.description||data.message||null});
  }catch(e){return res.status(500).json({error:e.message})}
};
