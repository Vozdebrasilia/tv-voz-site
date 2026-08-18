const allowed = {
  'lulaoficial':true,'celinaleao':true,'juliocesarribeiro':true,'gnascimento_20':true,'hermeto.oficial':true,'paulabelmonteoficial':true
};
const fallback = {
  'celinaleao':'/Entrevista%20Exclusiva%20com%20Celina%20Le%C3%A3o(2).png',
  'juliocesarribeiro':'https://www.camara.leg.br/internet/deputado/bandep/204372.jpg',
  'gnascimento_20':'https://www.camara.leg.br/internet/deputado/bandep/74270.jpg'
};
export default async function handler(req,res){
  const handle=String(req.query.handle||'').toLowerCase();
  if(!allowed[handle]) return res.status(404).end();
  try{
    const profile=await fetch(`https://www.instagram.com/${handle}/`,{headers:{'user-agent':'Mozilla/5.0 (compatible; VOZNEWS/1.0)','accept-language':'pt-BR,pt;q=0.9'}});
    if(!profile.ok) throw new Error('instagram');
    const html=await profile.text();
    const image=(html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)||html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)||[])[1];
    if(!image) throw new Error('og:image');
    const img=await fetch(image.replace(/&amp;/g,'&'),{headers:{'user-agent':'Mozilla/5.0','referer':`https://www.instagram.com/${handle}/`}});
    if(!img.ok) throw new Error('image');
    res.setHeader('Content-Type',img.headers.get('content-type')||'image/jpeg');
    res.setHeader('Cache-Control','public, s-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).send(Buffer.from(await img.arrayBuffer()));
  }catch(e){
    if(fallback[handle]){res.setHeader('Cache-Control','public, s-maxage=3600');return res.redirect(302,fallback[handle]);}
    return res.redirect(302,'/logo-voznews-oficial.png');
  }
}
