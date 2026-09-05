const {verifyJob,readTurnVideo}=require('./_studio-live-provider');
module.exports=async function handler(req,res){
  if(req.method!=='GET')return res.status(405).json({error:'method_not_allowed'});
  try{
    const job=verifyJob(req.query&&req.query.token);
    const turns=[];let total=0;
    for(const v of job.videos){
      const state=await readTurnVideo(v.videoId);
      if(state.status==='failed')return res.status(503).json({status:'unavailable'});
      if(state.status!=='completed')return res.status(200).json({status:'preparing'});
      total+=state.duration||0;
      turns.push({speaker:v.speaker,mode:v.mode,text:v.text,url:state.url});
    }
    res.setHeader('Cache-Control','no-store');
    return res.status(200).json({status:'ready',block:{id:job.blockId,duration:total||45,turns}});
  }catch(e){
    return res.status(400).json({status:'unavailable'});
  }
}
