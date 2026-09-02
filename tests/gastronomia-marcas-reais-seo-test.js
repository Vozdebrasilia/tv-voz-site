const fs=require('fs');
const html=fs.readFileSync('gastronomia/index.html','utf8');
const sitemap=fs.readFileSync('sitemap.xml','utf8');
const must=(c,m)=>{if(!c) throw new Error(m)};

for(const name of [
  'Brasília Palace Hotel',
  'Copacabana Palace',
  'Rosewood São Paulo',
  'Coco Bambu Lago Sul',
  'Vasto Brasília Shopping',
  'Piselli Brasília'
]) must(html.includes(name),`marca real ausente: ${name}`);

for(const url of [
  'https://www.plazabrasilia.com.br/brasilia-palace',
  'https://www.belmond.com/en/hotels/south-america/brazil/copacabana-palace-rio-de-janeiro',
  'https://www.rosewoodhotels.com/pt/sao-paulo',
  'https://www.cocobambu.com/unidades/cb-lagosul',
  'https://vastorestaurante.com/',
  'https://www.restaurante.piselli.com.br/brasilia'
]) must(html.includes(`href="${url}`),`link oficial ausente: ${url}`);

must(!html.includes('SUA MARCA AQUI'), 'placeholder SUA MARCA AQUI ainda presente');
must(!html.includes('Hotel em Brasília</h3>'), 'hotel genérico de Brasília ainda presente');
must(!html.includes('Hotel no Rio de Janeiro</h3>'), 'hotel genérico do Rio ainda presente');
must(!html.includes('Hotel em São Paulo</h3>'), 'hotel genérico de São Paulo ainda presente');
must(!html.includes('Restaurante no Lago Sul</h3>'), 'restaurante genérico Lago Sul ainda presente');
must(!html.includes('Restaurante na Asa Sul</h3>'), 'restaurante genérico Asa Sul ainda presente');
must(!html.includes('Restaurante na Asa Norte</h3>'), 'restaurante genérico Asa Norte ainda presente');

must(html.includes('application/ld+json'), 'dados estruturados JSON-LD ausentes');
must((html.match(/\"@type\"\s*:\s*\"Hotel\"/g)||[]).length>=3, 'faltam 3 entidades Hotel no JSON-LD');
must((html.match(/\"@type\"\s*:\s*\"Restaurant\"/g)||[]).length>=3, 'faltam 3 entidades Restaurant no JSON-LD');
must(html.includes('<meta name="robots" content="index,follow,max-image-preview:large"'), 'meta robots index/follow ausente');
must(html.includes('<link rel="canonical" href="https://www.voznewsbrasil.com.br/gastronomia/"'), 'canonical da gastronomia ausente');
must(sitemap.includes('<loc>https://www.voznewsbrasil.com.br/gastronomia/</loc><lastmod>2026-09-02</lastmod>'), 'lastmod da gastronomia ausente no sitemap');

console.log('gastronomia-marcas-reais-seo-test: PASS');
