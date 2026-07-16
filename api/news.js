const FEEDS = [
  { url: 'https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml', source: 'Agência Brasil' },
  { url: 'https://feeds.bbci.co.uk/portuguese/rss.xml', source: 'BBC News Brasil' }
];

function clean(value='') {
  return value.replace(/<!\[CDATA\[|\]\]>/g,'').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
}
function parse(xml, source) {
  const items=[];
  const blocks=xml.match(/<item[\s\S]*?<\/item>/gi)||[];
  for(const block of blocks.slice(0,6)){
    const title=clean((block.match(/<title[^>]*>([\s\S]*?)<\/title>/i)||[])[1]||'');
    const description=clean((block.match(/<description[^>]*>([\s\S]*?)<\/description>/i)||[])[1]||'');
    if(title) items.push({title,summary:description.slice(0,260),source});
  }
  return items;
}
module.exports = async function handler(req,res){
  res.setHeader('Cache-Control','s-maxage=300, stale-while-revalidate=600');
  try{
    const results=await Promise.all(FEEDS.map(async feed=>{
      const response=await fetch(feed.url,{headers:{'User-Agent':'TV Voz NEWS/1.0'}});
      if(!response.ok) return [];
      return parse(await response.text(),feed.source);
    }));
    const items=results.flat().slice(0,10);
    if(!items.length) throw new Error('Nenhuma notícia recebida.');
    res.status(200).json({items});
  }catch(error){
    res.status(200).json({items:[]});
  }
};
