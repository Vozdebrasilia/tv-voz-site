import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export default function handler(req,res){
  try{
    const parts=[1,2,3,4,5,6].map(n=>fs.readFileSync(path.join(process.cwd(),`studio-final-20260905-part${n}.b64`),'utf8').replace(/\s+/g,''));
    const data=parts.join('');
    const raw=Buffer.from(data,'base64');
    const b64sha=crypto.createHash('sha256').update(data).digest('hex');
    const rawsha=crypto.createHash('sha256').update(raw).digest('hex');
    const ok=data.length===41740 && raw.length===31304 && b64sha==='331941e0eca718cd92adcfdc3537b0001c9892975ffc99226f373a9694e8508f' && rawsha==='f60799c498d2e309bee1dbe45d14f984bbe86731fdfdf3cfb052e78f0aadfcc0' && raw.subarray(0,4).toString()==='RIFF' && raw.subarray(8,12).toString()==='WEBP';
    res.status(ok?200:500).json({ok,b64Length:data.length,rawLength:raw.length,b64sha,rawsha,format:raw.subarray(8,12).toString()});
  }catch(error){res.status(500).json({ok:false,error:String(error?.message||error)});}
}
