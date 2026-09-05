const crypto=require('crypto');
const API='https://api.heygen.com';
function b64(v){return Buffer.from(JSON.stringify(v)).toString('base64url')}
function signJob(payload){
  const secret=process.env.VOZNEWS_LIVE_SIGNING_SECRET;
  if(!secret)throw new Error('missing signing secret');
  const body=b64(payload),sig=crypto.createHmac('sha256',secret).update(body).digest('base64url');
  return `${body}.${sig}`;
}
function verifyJob(token){
  const secret=process.env.VOZNEWS_LIVE_SIGNING_SECRET;
  if(!secret)throw new Error('missing signing secret');
  const [body,sig]=String(token||'').split('.');
  const expected=crypto.createHmac('sha256',secret).update(body||'').digest('base64url');
  if(!body||!sig||sig.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected)))throw new Error('invalid token');
  return JSON.parse(Buffer.from(body,'base64url').toString('utf8'));
}
function identity(speaker){
  if(speaker==='deijanete')return {avatarId:process.env.VOZNEWS_DEIJANETE_AVATAR_ID,voiceId:process.env.VOZNEWS_DEIJANETE_VOICE_ID};
  if(speaker==='paulo')return {avatarId:process.env.VOZNEWS_PAULO_AVATAR_ID,voiceId:process.env.VOZNEWS_PAULO_VOICE_ID};
  throw new Error('invalid speaker');
}
async function heygen(path,options={}){
  const key=process.env.HEYGEN_API_KEY;
  if(!key)throw new Error('missing HEYGEN_API_KEY');
  const r=await fetch(API+path,{...options,headers:{'Content-Type':'application/json','x-api-key':key,...options.headers}});
  const data=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(`heygen:${r.status}:${JSON.stringify(data)}`);
  return data;
}
async function createTurnVideo(turn){
  const ids=identity(turn.speaker);
  if(!ids.avatarId||!ids.voiceId)throw new Error('missing presenter identity');
  const data=await heygen('/v3/videos',{method:'POST',body:JSON.stringify({
    type:'avatar',avatar_id:ids.avatarId,script:turn.text,voice_id:ids.voiceId,
    title:`VOZ NEWS ${turn.speaker} ${Date.now()}`,resolution:'720p',aspect_ratio:'16:9',
    output_format:'webm'
  })});
  const videoId=data&&data.data&&data.data.video_id;
  if(!videoId)throw new Error('missing video id');
  return {videoId};
}
async function readTurnVideo(videoId){
  const data=await heygen(`/v3/videos/${videoId}`,{method:'GET'});
  const item=data&&data.data||{};
  if(item.status==='failed')return {status:'failed'};
  if(item.status==='completed'&&item.video_url)return {status:'completed',url:item.video_url,duration:Number(item.duration)||0};
  return {status:'processing'};
}
module.exports={signJob,verifyJob,createTurnVideo,readTurnVideo};
