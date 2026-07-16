const { didFetch } = require('./_did');
module.exports = async function handler(req,res){
  const id=String(req.query?.id||'').trim();
  if(!id) return res.status(400).json({error:'ID do vídeo ausente.'});
  try{
    const data=await didFetch(`/talks/${encodeURIComponent(id)}`);
    res.setHeader('Cache-Control','no-store');
    res.status(200).json({id:data.id,status:data.status,result_url:data.result_url||null,error:data.error||null});
  }catch(error){
    const status=error.status&&error.status<500?error.status:500;
    res.status(status).json({error:error.message||'Falha ao consultar a D-ID.',details:error.data||null});
  }
};
