const { didFetch } = require('./_did');
module.exports = async function handler(req,res){
  try{
    const data=await didFetch('/tts/voices');
    const list=Array.isArray(data)?data:(data.voices||[]);
    const safe=list.map(v=>({id:v.id||v.voice_id,name:v.name||v.display_name||'',provider:v.provider||v.type||''}));
    res.status(200).json({voices:safe});
  }catch(error){
    res.status(error.status||500).json({error:error.message||'Falha ao listar vozes.'});
  }
};
