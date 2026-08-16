function authHeader(){
  const key=String(process.env.DID_API_KEY||'').trim();
  if(!key) throw new Error('DID_API_KEY ausente');
  return key.startsWith('Basic ')?key:`Basic ${key}`;
}
const ALLOWED=new Set(['tlk_vDcHm8tttp6BlDfWUtWp0']);
module.exports=async function handler(req,res){
  try{
    const id=String(req.query?.id||'').trim();
    if(!ALLOWED.has(id)) return res.status(404).end();
    const meta=await fetch('https://api.d-id.com/talks/'+encodeURIComponent(id),{headers:{Authorization:authHeader(),Accept:'application/json'}});
    if(!meta.ok) return res.status(meta.status).end();
    const data=await meta.json();
    if(data.status!=='done'||!data.result_url) return res.status(425).end();
    const video=await fetch(data.result_url);
    if(!video.ok) return res.status(video.status).end();
    res.setHeader('Content-Type',video.headers.get('content-type')||'video/mp4');
    res.setHeader('Cache-Control','public, max-age=300');
    const buf=Buffer.from(await video.arrayBuffer());
    return res.status(200).send(buf);
  }catch(e){return res.status(500).end();}
};
