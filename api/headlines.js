const FEEDS=[
  ['Eleições 2026','https://news.google.com/rss/search?q=elei%C3%A7%C3%B5es+2026+Brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419'],
  ['Lula','https://news.google.com/rss/search?q=Lula+elei%C3%A7%C3%B5es+2026&hl=pt-BR&gl=BR&ceid=BR:pt-419'],
  ['Flávio Bolsonaro','https://news.google.com/rss/search?q=Fl%C3%A1vio+Bolsonaro+elei%C3%A7%C3%B5es+2026&hl=pt-BR&gl=BR&ceid=BR:pt-419'],
  ['Celina Leão','https://news.google.com/rss/search?q=Celina+Le%C3%A3o+elei%C3%A7%C3%B5es+2026&hl=pt-BR&gl=BR&ceid=BR:pt-419'],
  ['Presidenciáveis','https://news.google.com/rss/search?q=Ronaldo+Caiado+Romeu+Zema+Renan+Santos+elei%C3%A7%C3%B5es+2026&hl=pt-BR&gl=BR&ceid=BR:pt-419']
];

function decode(str=''){
  return String(str).replace(/<!\[CDATA\[|\]\]>/g,'')
    .replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'")
    .replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(Number(n)));
}
function cleanTitle(title=''){return decode(title).replace(/\s+-\s+[^-]{2,90}$/,'').replace(/\s+/g,' ').trim();}
function extract(xml,topic){
  const out=[]; const blocks=xml.match(/<item>[\s\S]*?<\/item>/gi)||[];
  for(const block of blocks.slice(0,14)){
    const title=cleanTitle((block.match(/<title>([\s\S]*?)<\/title>/i)||[])[1]||'');
    const link=decode((block.match(/<link>([\s\S]*?)<\/link>/i)||[])[1]||'').trim();
    const pubDate=decode((block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)||[])[1]||'').trim();
    if(title&&link) out.push({title,link,pubDate,topic});
  }
  return out;
}
function score(item){
  const t=(item.title+' '+item.topic).toLowerCase(); let s=0;
  if(/eleiç|campanha|presid|governo do df|gdf/.test(t))s+=12;
  if(/lula/.test(t))s+=10; if(/flávio|flavio bolsonaro/.test(t))s+=9; if(/celina leão|celina leao/.test(t))s+=9;
  if(/caiado|zema|renan santos|augusto cury/.test(t))s+=7;
  const d=Date.parse(item.pubDate); if(Number.isFinite(d)) s+=Math.max(0,8-Math.floor((Date.now()-d)/21600000));
  return s;
}
module.exports=async function handler(req,res){
  try{
    const batches=await Promise.all(FEEDS.map(async([topic,url])=>{
      const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 VOZ NEWS'}}); if(!r.ok)return[]; return extract(await r.text(),topic);
    }));
    const seen=new Set();
    const headlines=batches.flat().sort((a,b)=>score(b)-score(a)).filter(x=>{const k=x.title.toLowerCase();if(seen.has(k))return false;seen.add(k);return true;}).slice(0,24);
    if(!headlines.length)throw new Error('feed vazio');
    res.setHeader('Cache-Control','s-maxage=3600, stale-while-revalidate=300');
    return res.status(200).json({updatedAt:new Date().toISOString(),headlines});
  }catch(e){return res.status(500).json({error:'Não foi possível atualizar as manchetes agora.'});}
};