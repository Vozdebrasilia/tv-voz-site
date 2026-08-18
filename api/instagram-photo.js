const sources = {
  'lulaoficial': { direct:'https://www.gov.br/planejamento/pt-br/assuntos/noticias/2026/imagens/55156120202_eb131de887_o.jpg/@@images/image-800-178cef2bb9f4c0f5ebc07851937db6f2.jpeg' },
  'celinaleao': { page:'https://celina11.com/noticias/celina-leao-abre-campanha-de-reeleicao-ao-governo-do-df-ao-lado-de-michelle-bolsonaro-e-bia-kicis/' },
  'juliocesarribeiro': { direct:'https://www.camara.leg.br/internet/deputado/bandep/204372.jpg' },
  'gnascimento_20': { direct:'https://www.camara.leg.br/internet/deputado/bandep/74270.jpg' },
  'hermeto.oficial': { page:'https://hermeto.com.br/' },
  'paulabelmonteoficial': { page:'https://paulabelmonte.com.br/psdb-df-confirma-paula-belmonte-como-candidata-ao-gdf-em-convencao-no-dia-4-de-agosto/' },
  'flaviobolsonaro': { page:'https://www25.senado.leg.br/web/senadores/senador/-/perfil/5894' }
};

function ogImage(html=''){
  return (html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)||
          html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)||[])[1];
}

async function sendImage(url,res,referer){
  const img=await fetch(url.replace(/&amp;/g,'&'),{headers:{'user-agent':'Mozilla/5.0','referer':referer||url}});
  if(!img.ok) throw new Error('image');
  const type=(img.headers.get('content-type')||'').toLowerCase();
  if(!type.startsWith('image/')) throw new Error('not-image');
  res.setHeader('Content-Type',type);
  res.setHeader('Cache-Control','public, s-maxage=86400, stale-while-revalidate=604800');
  return res.status(200).send(Buffer.from(await img.arrayBuffer()));
}

export default async function handler(req,res){
  const handle=String(req.query.handle||'').toLowerCase();
  const src=sources[handle];
  if(!src) return res.status(404).end();
  try{
    if(src.direct) return await sendImage(src.direct,res,src.direct);
    const page=await fetch(src.page,{headers:{'user-agent':'Mozilla/5.0 (compatible; VOZNEWS/1.0)','accept-language':'pt-BR,pt;q=0.9'}});
    if(!page.ok) throw new Error('page');
    const html=await page.text();
    const image=ogImage(html);
    if(!image) throw new Error('og:image');
    return await sendImage(image,res,src.page);
  }catch(e){
    res.setHeader('Cache-Control','no-store');
    return res.redirect(302,'/logo-voznews-oficial.png');
  }
}
