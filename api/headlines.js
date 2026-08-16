const FEED='https://news.google.com/rss?hl=pt-BR&gl=BR&ceid=BR:pt-419';

function decode(str=''){
  return String(str)
    .replace(/<!\[CDATA\[|\]\]>/g,'')
    .replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'")
    .replace(/&lt;/g,'<').replace(/&gt;/g,'>')
    .replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(Number(n)));
}

function cleanTitle(title=''){
  return decode(title).replace(/\s+-\s+[^-]{2,80}$/,'').replace(/\s+/g,' ').trim();
}

function extract(xml){
  const items=[];
  const blocks=xml.match(/<item>[\s\S]*?<\/item>/gi)||[];
  for(const block of blocks.slice(0,20)){
    const title=cleanTitle((block.match(/<title>([\s\S]*?)<\/title>/i)||[])[1]||'');
    const link=decode((block.match(/<link>([\s\S]*?)<\/link>/i)||[])[1]||'').trim();
    const pubDate=decode((block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)||[])[1]||'').trim();
    if(title) items.push({title,link,pubDate});
  }
  return items;
}

module.exports=async function handler(req,res){
  try{
    const r=await fetch(FEED,{headers:{'User-Agent':'Mozilla/5.0 VOZ NEWS'}});
    if(!r.ok) throw new Error('feed '+r.status);
    const xml=await r.text();
    const headlines=extract(xml);
    if(!headlines.length) throw new Error('feed vazio');
    res.setHeader('Cache-Control','s-maxage=3600, stale-while-revalidate=300');
    return res.status(200).json({updatedAt:new Date().toISOString(),headlines});
  }catch(error){
    return res.status(500).json({error:'Não foi possível atualizar as manchetes agora.'});
  }
};