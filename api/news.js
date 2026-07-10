const feeds = [
  { source: 'Agência Brasil', url: 'https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml' },
  { source: 'Câmara dos Deputados', url: 'https://www.camara.leg.br/noticias/rss' },
  { source: 'Senado Notícias', url: 'https://www12.senado.leg.br/noticias/rss' },
  { source: 'CNN Brasil', url: 'https://www.cnnbrasil.com.br/feed/' }
];
function clean(v=''){
  return String(v).replace(/<!\[CDATA\[/g,'').replace(/\]\]>/g,'').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
}
function pick(item, tag){
  const m = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return m ? clean(m[1]) : '';
}
async function readFeed(feed){
  const r = await fetch(feed.url, { headers: { 'user-agent': 'TV Voz IA News Bot' } });
  if(!r.ok) throw new Error(feed.source + ' indisponível');
  const xml = await r.text();
  const raw = xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
  return raw.slice(0,5).map(item => ({
    title: pick(item,'title'),
    summary: pick(item,'description') || pick(item,'summary') || pick(item,'content'),
    link: pick(item,'link'),
    pubDate: pick(item,'pubDate') || pick(item,'updated'),
    source: feed.source
  })).filter(x => x.title);
}
export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  try{
    const settled = await Promise.allSettled(feeds.map(readFeed));
    const items = settled.flatMap(x => x.status === 'fulfilled' ? x.value : []).slice(0,16);
    res.status(200).json({ updatedAt: new Date().toISOString(), items });
  }catch(err){
    res.status(200).json({ updatedAt: new Date().toISOString(), items: [] });
  }
}
