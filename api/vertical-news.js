const CONFIG={
  "voznews":{q:"site:gov.br OR site:ebc.com.br Brasil governo economia saúde tecnologia turismo educação notícias",label:"VOZ NEWS BRASIL"},
  "energia":{q:"site:gov.br energia OR petróleo OR gás OR eletricidade OR ANEEL OR MME",label:"ENERGIA"},
  "agronegocio":{q:"site:gov.br agricultura OR agronegócio OR safra OR MAPA OR Conab OR Embrapa",label:"AGRONEGÓCIO"},
  "sustentabilidade":{q:"site:gov.br meio ambiente OR sustentabilidade OR clima OR Ibama OR MMA",label:"SUSTENTABILIDADE"},
  "economia-negocios-consumo":{q:"site:gov.br economia OR negócios OR consumo OR comércio OR indústria OR MDIC OR Fazenda",label:"ECONOMIA, NEGÓCIOS E CONSUMO"},
  "educacao-carreiras-cultura":{q:"site:gov.br educação OR carreiras OR cultura OR MEC OR MinC",label:"EDUCAÇÃO, CARREIRAS E CULTURA"},
  "estilo-esporte-experiencias":{q:"site:gov.br esporte OR lazer OR experiências OR turismo esportivo",label:"ESTILO, ESPORTE E EXPERIÊNCIAS"},
  "gastronomia":{q:"site:gov.br gastronomia OR alimentos OR restaurantes OR turismo gastronômico",label:"GASTRONOMIA"},
  "mobilidade":{q:"site:gov.br mobilidade OR transporte OR trânsito OR rodovias OR aviação OR portos",label:"MOBILIDADE"},
  "moveis-decoracao":{q:"site:gov.br habitação OR construção OR móveis OR design OR indústria moveleira",label:"MÓVEIS E DECORAÇÃO"},
  "poder-justica-cidadania":{q:"site:gov.br justiça OR cidadania OR direitos OR STF OR CNJ OR MJSP",label:"PODER, JUSTIÇA E CIDADANIA"},
  "saude-beleza":{q:"site:gov.br saúde OR bem-estar OR Anvisa OR SUS OR Ministério da Saúde",label:"SAÚDE E BEM-ESTAR"},
  "tecnologia-ia-midia":{q:"site:gov.br tecnologia OR inteligência artificial OR inovação OR comunicação OR MCTI",label:"TECNOLOGIA, IA E MÍDIA"},
  "turismo":{q:"site:gov.br turismo OR destinos OR viagens OR Embratur OR Ministério do Turismo",label:"TURISMO"}
};
function decode(s=""){return String(s).replace(/<!\[CDATA\[|\]\]>/g,"").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n));}
function stripSource(t=""){return decode(t).replace(/\s+-\s+[^-]{2,100}$/,"").replace(/\s+/g," ").trim();}
function sourceName(t=""){const m=decode(t).match(/\s+-\s+([^-]{2,100})$/);return m?m[1].trim():"Fonte oficial";}
function parse(xml){const out=[];for(const b of (xml.match(/<item>[\s\S]*?<\/item>/gi)||[]).slice(0,18)){const raw=(b.match(/<title>([\s\S]*?)<\/title>/i)||[])[1]||"";const link=decode((b.match(/<link>([\s\S]*?)<\/link>/i)||[])[1]||"").trim();const pubDate=decode((b.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)||[])[1]||"").trim();const title=stripSource(raw);if(title&&link)out.push({title,link,pubDate,source:sourceName(raw)});}return out;}
module.exports=async function handler(req,res){
  try{
    const key=String(req.query.vertical||"voznews");
    const c=CONFIG[key]||CONFIG.voznews;
    const url="https://news.google.com/rss/search?q="+encodeURIComponent(c.q)+"&hl=pt-BR&gl=BR&ceid=BR:pt-419";
    const r=await fetch(url,{headers:{"User-Agent":"Mozilla/5.0 VOZ NEWS"}});
    if(!r.ok)throw new Error("feed");
    const now=Date.now(),seen=new Set();
    const items=parse(await r.text()).filter(x=>{const k=x.title.toLowerCase();if(seen.has(k))return false;seen.add(k);const d=Date.parse(x.pubDate);return !Number.isFinite(d)||(now-d)<7*864e5;}).slice(0,5).map((x,i)=>({...x,featured:i===0,summary:i===0?"Destaque do dia selecionado em fonte pública oficial. A VOZ NEWS acompanha os desdobramentos e mantém o link da origem para consulta.":"Atualização do setor apurada em fonte pública oficial, com acesso direto à origem da informação."}));
    res.setHeader("Cache-Control","s-maxage=900, stale-while-revalidate=120");
    return res.status(200).json({vertical:key,label:c.label,updatedAt:new Date().toISOString(),items});
  }catch(e){return res.status(500).json({error:"Não foi possível carregar a atualização oficial agora."});}
};