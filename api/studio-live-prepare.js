const {buildStudioBlock}=require('../studio-live-core');
const {createTurnVideo,signJob}=require('./_studio-live-provider');
module.exports=async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'method_not_allowed'});
  try{
    const host=req.headers.host,proto=req.headers['x-forwarded-proto']||'https';
    const newsResponse=await fetch(`${proto}://${host}/api/news`,{headers:{accept:'application/json'}});
    if(!newsResponse.ok)throw new Error('news unavailable');
    const news=await newsResponse.json();
    const block=buildStudioBlock(news.items||[]);
    const videos=[];
    for(const turn of block.turns){
      const job=await createTurnVideo(turn);
      videos.push({speaker:turn.speaker,mode:turn.mode,text:turn.text,videoId:job.videoId});
    }
    const token=signJob({blockId:block.blockId,generatedAt:block.generatedAt,sourceHeadlines:block.sourceHeadlines,videos});
    res.setHeader('Cache-Control','no-store');
    return res.status(202).json({status:'preparing',token,blockId:block.blockId,targetDuration:45});
  }catch(e){
    console.error('studio-live-prepare',e.message);
    return res.status(503).json({status:'unavailable'});
  }
}
