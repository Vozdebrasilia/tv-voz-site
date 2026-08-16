function decodeHtml(s=''){return String(s).replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(Number(n)));}
function clean(s=''){return decodeHtml(String(s).replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim();}
function paragraphs(html){
  const raw=[...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map(m=>clean(m[1])).filter(t=>t.length>90 && !/cookie|publicidade|assine|newsletter|copyright|todos os direitos/i.test(t));
  const seen=new Set(); const unique=raw.filter(t=>{const k=t.slice(0,90).toLowerCase();if(seen.has(k))return false;seen.add(k);return true;});
  if(unique.length>=8)return unique.slice(0,8);
  const body=clean((html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)||[])[1]||'');
  const sentences=body.split(/(?<=[.!?])\s+/).filter(x=>x.length>45);
  let i=0; while(unique.length<8 && i<sentences.length){let block='';while(block.length<180&&i<sentences.length)block+=(block?' ':'')+sentences[i++];if(block.length>90)unique.push(block);}
  return unique.slice(0,8);
}
module.exports=async function handler(req,res){
  try{
    const url=String(req.query?.url||'');
    if(!/^https?:\/\//i.test(url))return res.status(400).json({error:'URL inválida'});
    const r=await fetch(url,{redirect:'follow',headers:{'User-Agent':'Mozilla/5.0 VOZ NEWS/1.0'}});
    if(!r.ok)throw new Error('origem '+r.status);
    const html=await r.text();
    const ps=paragraphs(html);
    if(!ps.length)throw new Error('sem texto');
    res.setHeader('Cache-Control','s-maxage=3600, stale-while-revalidate=600');
    return res.status(200).json({url:r.url,paragraphs:ps});
  }catch(e){return res.status(502).json({error:'Não foi possível abrir o texto completo desta notícia agora.'});}
};