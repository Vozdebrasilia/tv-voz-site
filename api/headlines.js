const FEEDS=[
['Brasil','https://news.google.com/rss/search?q=Brasil+not%C3%ADcias+hoje&hl=pt-BR&gl=BR&ceid=BR:pt-419'],
['Brasília','https://news.google.com/rss/search?q=Bras%C3%ADlia+DF+not%C3%ADcias+hoje&hl=pt-BR&gl=BR&ceid=BR:pt-419'],
['Política','https://news.google.com/rss/search?q=pol%C3%ADtica+Brasil+elei%C3%A7%C3%B5es+2026&hl=pt-BR&gl=BR&ceid=BR:pt-419'],
['Economia','https://news.google.com/rss/search?q=economia+Brasil+hoje&hl=pt-BR&gl=BR&ceid=BR:pt-419'],
['Mundo','https://news.google.com/rss/search?q=mundo+internacional+not%C3%ADcias+hoje&hl=pt-BR&gl=BR&ceid=BR:pt-419'],
['Goiás','https://news.google.com/rss/search?q=Goi%C3%A1s+Goi%C3%A2nia+not%C3%ADcias+hoje&hl=pt-BR&gl=BR&ceid=BR:pt-419']
];
const CONFIG={
"voznews":{q:"site:gov.br OR site:ebc.com.br Brasil governo economia saúde tecnologia turismo educação notícias",label:"VOZ NEWS BRASIL"},
"energia":{q:"site:gov.br energia OR petróleo OR gás OR eletricidade OR ANEEL OR MME",label:"ENERGIA"},
"agronegocio":{q:"site:gov.br agricultura OR agronegócio OR safra OR MAPA OR Conab OR Embrapa",label:"AGRONEGÓCIO"},
"sustentabilidade":{q:"site:gov.br meio ambiente OR sustentabilidade OR clima OR Ibama OR MMA",label:"SUSTENTABILIDADE"},
"economia-negocios-consumo":{q:"site:gov.br economia OR negócios OR consumo OR comércio OR indústria OR MDIC OR Fazenda",label:"ECONOMIA, NEGÓCIOS E CONSUMO"},
"educacao-carreiras-cultura":{q:"site:gov.br educação OR carreiras OR cultura OR MEC OR MinC",label:"EDUCAÇÃO, CARREIRAS E CULTURA"},
"estilo-esporte-experiencias":{q:"site:gov.br esporte OR lazer OR turismo esportivo",label:"ESTILO, ESPORTE E EXPERIÊNCIAS"},
"gastronomia":{q:"site:gov.br gastronomia OR alimentos OR restaurantes OR turismo gastronômico",label:"GASTRONOMIA"},
"mobilidade":{q:"site:gov.br mobilidade OR transporte OR trânsito OR rodovias OR aviação OR portos",label:"MOBILIDADE"},
"moveis-decoracao":{q:"site:gov.br habitação OR construção OR móveis OR design OR indústria moveleira",label:"MÓVEIS E DECORAÇÃO"},
"poder-justica-cidadania":{q:"site:gov.br justiça OR cidadania OR direitos OR CNJ OR MJSP",label:"PODER, JUSTIÇA E CIDADANIA"},
"saude-beleza":{q:"site:gov.br saúde OR bem-estar OR Anvisa OR SUS OR Ministério da Saúde",label:"SAÚDE E BEM-ESTAR"},
"tecnologia-ia-midia":{q:"site:gov.br tecnologia OR inteligência artificial OR inovação OR comunicação OR MCTI",label:"TECNOLOGIA, IA E MÍDIA"},
"turismo":{q:"site:gov.br turismo OR destinos OR viagens OR Embratur OR Ministério do Turismo",label:"TURISMO"}
};
function decode(str=''){return String(str).replace(/<!\[CDATA\[|\]\]>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(Number(n)));}
function cleanTitle(title=''){return decode(title).replace(/\s+-\s+[^-]{2,100}$/,'').replace(/\s+/g,' ').trim();}
function sourceName(title=''){const m=decode(title).match(/\s+-\s+([^-]{2,100})$/);return m?m[1].trim():'Fonte oficial';}
function extract(xml,topic){const out=[];const blocks=xml.match(/<item>[\s\S]*?<\/item>/gi)||[];for(const block of blocks.slice(0,20)){const raw=(block.match(/<title>([\s\S]*?)<\/title>/i)||[])[1]||'';const title=cleanTitle(raw);const link=decode((block.match(/<link>([\s\S]*?)<\/link>/i)||[])[1]||'').trim();const pubDate=decode((block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)||[])[1]||'').trim();const desc=decode((block.match(/<description>([\s\S]*?)<\/description>/i)||[])[1]||'');const media=(block.match(/<(?:media:content|media:thumbnail)[^>]+url=["']([^"']+)["']/i)||[])[1]||'';const descImg=(desc.match(/<img[^>]+src=["']([^"']+)["']/i)||[])[1]||'';const rssImage=decode(media||descImg).trim();if(title&&link)out.push({title,link,pubDate,topic,source:sourceName(raw),rssImage});}return out;}
async function enrichItem(item){
  const validImage=(u='')=>{
    const s=String(u||'').trim();
    if(!/^https?:\/\//i.test(s))return '';
    if(/news\.google\.|gstatic\.com\/.*news|google.*news.*logo|googlenews/i.test(s))return '';
    return s;
  };
  const rssImage=validImage(item.rssImage);
  try{
    const r=await fetch(item.link,{redirect:'follow',headers:{'User-Agent':'Mozilla/5.0 VOZ NEWS'}});
    const finalLink=r.url||item.link;
    const html=await r.text();
    const pick=(re)=>{const m=html.match(re);return m&&m[1]?decode(m[1]).trim():''};
    const pageImage=validImage(
      pick(/<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i)||
      pick(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["']/i)||
      pick(/<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i)||
      pick(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i)
    );
    return {...item,link:finalLink,image:rssImage||pageImage||''};
  }catch{return {...item,image:rssImage||''};}
}
function score(item){let s=0;const d=Date.parse(item.pubDate);if(Number.isFinite(d)){const age=(Date.now()-d)/3600000;s+=Math.max(0,36-age);}if(item.topic==='Brasília')s+=4;if(item.topic==='Brasil')s+=3;if(item.topic==='Política')s+=2;return s;}
module.exports=async function handler(req,res){try{
 const vertical=String(req.query.vertical||'').trim();
 if(vertical){
   const c=CONFIG[vertical]||CONFIG.voznews;
   const url='https://news.google.com/rss/search?q='+encodeURIComponent(c.q)+'&hl=pt-BR&gl=BR&ceid=BR:pt-419';
   const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 VOZ NEWS'}});
   if(!r.ok)throw new Error('feed');
   const now=Date.now(),seen=new Set();
   const baseItems=extract(await r.text(),c.label).filter(x=>{const k=x.title.toLowerCase();if(seen.has(k))return false;seen.add(k);const d=Date.parse(x.pubDate);return !Number.isFinite(d)||(now-d)<7*864e5;}).slice(0,5);
   const items=(await Promise.all(baseItems.map(enrichItem))).map((x,i)=>({...x,featured:i===0,summary:i===0?'Destaque do dia selecionado em fonte pública oficial. A VOZ NEWS acompanha os desdobramentos e mantém o link da origem para consulta.':'Atualização do setor apurada em fonte pública oficial, com acesso direto à origem da informação.'}));
   res.setHeader('Cache-Control','s-maxage=900, stale-while-revalidate=120');
   return res.status(200).json({vertical,label:c.label,updatedAt:new Date().toISOString(),items});
 }
 const batches=await Promise.all(FEEDS.map(async([topic,url])=>{const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 VOZ NEWS'}});if(!r.ok)return[];return extract(await r.text(),topic);}));
 const seen=new Set();const headlines=batches.flat().filter(x=>{const d=Date.parse(x.pubDate);return !Number.isFinite(d)||(Date.now()-d)<48*3600000;}).sort((a,b)=>score(b)-score(a)).filter(x=>{const k=x.title.toLowerCase();if(seen.has(k))return false;seen.add(k);return true;}).slice(0,24);
 if(!headlines.length)throw new Error('feed vazio');
 res.setHeader('Cache-Control','s-maxage=900, stale-while-revalidate=120');
 return res.status(200).json({updatedAt:new Date().toISOString(),headlines});
}catch(e){return res.status(500).json({error:'Não foi possível atualizar as manchetes agora.'});}};