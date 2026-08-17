const BASE='https://www.voznewsbrasil.com.br';
const FEEDS=[
'https://news.google.com/rss/search?q=elei%C3%A7%C3%B5es+2026+Brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419',
'https://news.google.com/rss/search?q=Bras%C3%ADlia+pol%C3%ADtica&hl=pt-BR&gl=BR&ceid=BR:pt-419',
'https://news.google.com/rss/search?q=economia+Brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419',
'https://news.google.com/rss/search?q=internacional+Brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419'];

const PORTAIS=[
'agro','automoveis','aviacao','bancos','beleza','casa','computadores','condominios','construcao','educacao',
'energia','esg','eventos','gastronomia','imoveis','industria','internacional','justica','meio-ambiente','moda',
'nautica','negocios','pet','pescarias','politica','saude','seguros','tecnologia','turismo','vinhos-e-adegas',
'brasilia','agenda-capital','compra-e-venda','concessionarias','importacao-e-exportacao','marketplace','empresas-e-liderancas','embaixadas','projetos-sociais','voz-internacional'
];

const TEMAS=[
'brasil','brasilia','politica','economia','eleicoes-2026','congresso-nacional','governo-federal','distrito-federal',
'negocios','empresas','empreendedorismo','tecnologia','inteligencia-artificial','energia','sustentabilidade','esg',
'saude','educacao','turismo','gastronomia','cultura','eventos','internacional','comercio-exterior','apexbrasil',
'imoveis','automoveis','agro','meio-ambiente','justica','cidadania','projetos-sociais','instituto-brazil-just',
'entrevistas','liderancas','embaixadas','mercado-financeiro','comunicacao','voz-news','tv-voz-de-brasilia'
];

const CLIENTES=[
'styllus-la-vie','kumon','coreto-moveis-corporativos','pastelaria-vicosa','grupo-sabin','brasal','paulo-octavio',
'canon','bio-mundo','instituto-da-visao','botoclinic','flow-estetica','oticas-brasiliense','vasto','renascer-park',
'5-estrelas','teclar','localiza','movida','unidas','schneider-electric'
];

const AUTORES=['deijanete-fayad','paulo-fayad'];
const FIXED=['/','/anunciantes.html','/ibj.html'];

function decode(s=''){return String(s).replace(/<!\[CDATA\[|\]\]>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>')}
function clean(t=''){return decode(t).replace(/\s+-\s+[^-]{2,90}$/,'').replace(/\s+/g,' ').trim()}
function slug(s=''){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,120)}
function xmlEsc(s=''){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')}

module.exports=async function(req,res){
  try{
    const titles=[];
    for(const url of FEEDS){
      try{
        const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 VOZ NEWS'}});
        if(!r.ok)continue;
        const xml=await r.text();
        for(const b of (xml.match(/<item>[\s\S]*?<\/item>/gi)||[]).slice(0,15)){
          const t=clean((b.match(/<title>([\s\S]*?)<\/title>/i)||[])[1]||'');
          if(t)titles.push(t);
        }
      }catch{}
    }

    const analyses=[...new Set(titles.map(t=>slug(t)))].filter(Boolean).map(s=>`/analises/${s}`);
    const paths=[
      ...FIXED,
      ...PORTAIS.map(s=>`/portais/${s}.html`),
      ...TEMAS.map(s=>`/tema/${s}`),
      ...CLIENTES.map(s=>`/clientes/${s}.html`),
      ...AUTORES.map(s=>`/autor/${s}`),
      ...analyses
    ];
    const unique=[...new Set(paths)];
    const now=new Date().toISOString();
    const body=unique.map(p=>{
      const isHome=p==='/';
      const isAnalysis=p.startsWith('/analises/');
      const isPortal=p.startsWith('/portais/');
      const priority=isHome?'1.0':(isPortal?'0.9':'0.8');
      const freq=isAnalysis?'hourly':(isHome?'hourly':'daily');
      return `<url><loc>${xmlEsc(BASE+p)}</loc><lastmod>${now}</lastmod><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`;
    }).join('');
    const xml=`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
    res.setHeader('Content-Type','application/xml; charset=utf-8');
    res.setHeader('Cache-Control','s-maxage=1800, stale-while-revalidate=300');
    res.status(200).send(xml);
  }catch(e){res.status(500).send('')}
};