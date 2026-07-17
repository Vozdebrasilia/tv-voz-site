const { didFetch } = require('./_did');

function sanitizeNewsText(value=''){
  let text=String(value||'')
    .replace(/https?:\/\/[^\s<>()]+/gi,' ')
    .replace(/www\.[^\s<>()]+/gi,' ')
    .replace(/<[^>]*>/g,' ')
    .replace(/[#*_~|>`@]/g,' ')
    .replace(/\s+/g,' ')
    .trim();
  if(text&&!/[.!?]$/.test(text)) text+='.';
  return text;
}

async function resolveVoice(presenter){
  const upper=presenter==='deijanete'?'DEIJANETE':'PAULO';
  const explicitId=String(process.env[`${upper}_VOICE_ID`]||'').trim();
  const explicitProvider=String(process.env[`${upper}_VOICE_PROVIDER`]||'').trim();
  if(explicitId) return {id:explicitId,provider:explicitProvider||'microsoft',cloned:true};

  try{
    const voices=await didFetch('/tts/voices');
    const list=Array.isArray(voices)?voices:(voices.voices||[]);
    const terms=presenter==='deijanete'?['deijanete','deija','fayad']:['paulo fayad','paulo'];
    const match=list.find(v=>terms.some(term=>String(v.name||v.display_name||'').toLowerCase().includes(term)));
    if(match) return {id:match.id||match.voice_id,provider:match.provider||match.type||'microsoft',cloned:true};
  }catch(e){}

  return presenter==='deijanete'
    ? {id:'pt-BR-FranciscaNeural',provider:'microsoft',cloned:false}
    : {id:'pt-BR-AntonioNeural',provider:'microsoft',cloned:false};
}

function publicSourceUrl(req,presenter){
  const proto=String(req.headers['x-forwarded-proto']||'https').split(',')[0].trim();
  const host=String(req.headers['x-forwarded-host']||req.headers.host||'').split(',')[0].trim();
  if(!host) throw new Error('Domínio público do site não identificado.');
  const file=presenter==='deijanete'?'studio-deijanete-source.jpg':'studio-paulo-source.jpg';
  return `${proto}://${host}/${file}`;
}

module.exports=async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST') return res.status(405).json({error:'Método não permitido.'});
  try{
    const presenter=req.body?.presenter==='paulo'?'paulo':'deijanete';
    const text=sanitizeNewsText(req.body?.text||'').slice(0,1200);
    if(!text) return res.status(400).json({error:'Texto da notícia ausente.'});
    const voice=await resolveVoice(presenter);
    const payload={
      source_url:publicSourceUrl(req,presenter),
      script:{type:'text',input:text,provider:{type:voice.provider,voice_id:voice.id}},
      config:{stitch:true,result_format:'mp4',fluent:true,pad_audio:0},
      name:`VOZ NEWS - ${presenter}`,
      user_data:JSON.stringify({presenter,cloned_voice:voice.cloned})
    };
    const data=await didFetch('/talks',{method:'POST',body:JSON.stringify(payload)});
    return res.status(200).json({id:data.id,status:data.status,result_url:data.result_url||null,using_cloned_voice:voice.cloned,voice_id:voice.id});
  }catch(error){
    const status=error.status&&error.status<500?error.status:500;
    return res.status(status).json({error:error.message||'Falha ao criar vídeo na D-ID.',details:error.data||null});
  }
};
