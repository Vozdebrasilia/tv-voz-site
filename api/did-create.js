const fs = require('fs');
const path = require('path');
const { didFetch, didUploadImage } = require('./_did');

async function resolveVoice(presenter){
  const upper=presenter==='deijanete'?'DEIJANETE':'PAULO';
  const explicitId=process.env[`${upper}_VOICE_ID`];
  const explicitProvider=process.env[`${upper}_VOICE_PROVIDER`];
  if(explicitId) return { id: explicitId, provider: explicitProvider || 'elevenlabs', cloned: true };

  try{
    const voices=await didFetch('/tts/voices');
    const list=Array.isArray(voices)?voices:(voices.voices||[]);
    const terms=presenter==='deijanete'?['deijanete','deija','fayad']:['paulo fayad','paulo'];
    const match=list.find(v=>terms.some(term=>String(v.name||v.display_name||'').toLowerCase().includes(term)));
    if(match) return { id: match.id || match.voice_id, provider: match.provider || match.type || 'elevenlabs', cloned: true };
  }catch(e){}

  return presenter==='deijanete'
    ? { id: 'pt-BR-FranciscaNeural', provider: 'microsoft', cloned: false }
    : { id: 'pt-BR-AntonioNeural', provider: 'microsoft', cloned: false };
}

function localImageFor(presenter){
  const filename=presenter==='deijanete'?'studio-deijanete-source.jpg':'studio-paulo-source.jpg';
  const absolutePath=path.join(process.cwd(), filename);
  if(!fs.existsSync(absolutePath)) throw new Error(`Imagem do apresentador não encontrada: ${filename}`);
  return { filename, absolutePath };
}

function uploadedImageUrl(data){
  return data?.url || data?.source_url || data?.result_url || data?.image_url || null;
}

module.exports = async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Método não permitido.'});
  try{
    const presenter=req.body?.presenter==='paulo'?'paulo':'deijanete';
    const text=String(req.body?.text||'').trim().slice(0,1500);
    if(!text) return res.status(400).json({error:'Texto da notícia ausente.'});

    const { filename, absolutePath }=localImageFor(presenter);
    const imageBuffer=fs.readFileSync(absolutePath);
    const upload=await didUploadImage(imageBuffer, filename, 'image/jpeg');
    const sourceUrl=uploadedImageUrl(upload);
    if(!sourceUrl) throw new Error('A D-ID recebeu a imagem, mas não devolveu uma URL utilizável.');

    const voice=await resolveVoice(presenter);
    const payload={
      source_url:sourceUrl,
      script:{
        type:'text',
        input:text,
        provider:{type:voice.provider,voice_id:voice.id}
      },
      config:{
        stitch:true,
        result_format:'mp4',
        fluent:true,
        pad_audio:0
      },
      name:`VOZ NEWS - ${presenter}`,
      user_data:JSON.stringify({presenter,cloned_voice:voice.cloned})
    };

    const data=await didFetch('/talks',{method:'POST',body:JSON.stringify(payload)});
    res.status(200).json({
      id:data.id,
      status:data.status,
      result_url:data.result_url||null,
      using_cloned_voice:voice.cloned,
      voice_id:voice.id
    });
  }catch(error){
    const status=error.status&&error.status<500?error.status:500;
    res.status(status).json({error:error.message||'Falha ao criar vídeo na D-ID.',details:error.data||null});
  }
};
