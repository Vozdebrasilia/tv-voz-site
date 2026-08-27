const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const exists = p => fs.existsSync(path.join(root,p));
function must(cond,msg){ if(!cond) throw new Error(msg); }

must(exists('gastronomia/index.html'),'gastronomia/index.html ausente');
must(exists('gastronomia/gastronomia.js'),'gastronomia/gastronomia.js ausente');
must(exists('api/restaurants.js'),'api/restaurants.js ausente');
const html = read('gastronomia/index.html');
const js = read('gastronomia/gastronomia.js');
const api = read('api/restaurants.js');
const catalogText = exists('gastronomia/data/restaurants.json') ? read('gastronomia/data/restaurants.json') : '';

for (const token of ['VOZ NEWS','GASTRONOMIA','Brasília','Brasil','Mundo','Mané Mercado','Renata La Porta','Deijanete Fayad','Paulo Fayad','Vasto','Coco Bambu','Mangai','Piselli','Rubaiyat','Kubitschek','Pastelaria Viçosa','Sabores de Brasília e do Cerrado']) {
  must(html.includes(token) || js.includes(token) || catalogText.includes(token), `conteúdo obrigatório ausente: ${token}`);
}
must(html.includes('id="restaurant-search"'),'formulário de busca ausente');
must(html.includes('id="search-results"'),'área de resultados ausente');
must(js.includes('/api/restaurants'),'cliente não consulta /api/restaurants');
must(api.includes('nominatim.openstreetmap.org'),'endpoint sem geocodificação Nominatim');
must(api.includes('overpass-api.de'),'endpoint sem busca Overpass');
must(!/href=["']#["']/.test(html),'há link essencial href="#"');

must(exists('gastronomia.js'),'loader raiz de /gastronomia ausente');
const loader = read('gastronomia.js');
must(loader.includes("/gastronomia/"),'loader não fixa a base /gastronomia/');
must(loader.includes("/gastronomia/gastronomia.js"),'loader não chama o JavaScript real da vertical');

must(exists('gastronomia/data/restaurants.json'),'catálogo próprio de restaurantes ausente');
const catalog = JSON.parse(catalogText);
must(Array.isArray(catalog) && catalog.length >= 80,'catálogo gastronômico precisa de pelo menos 80 registros');
for (const city of ['Brasília','São Paulo','Rio de Janeiro','Belo Horizonte','Salvador','Recife','Fortaleza','Curitiba','Porto Alegre','Goiânia','Florianópolis','Campinas','Belém','Manaus','Nova York','Miami','Paris','Lisboa','Roma','Londres','Madri','Barcelona','Buenos Aires','Santiago','Cidade do México','Tóquio','Dubai','Bangkok']) {
  must(catalog.some(r => r.city === city), `cidade ausente no catálogo: ${city}`);
}
for (const item of catalog) {
  for (const key of ['id','name','city','country','cuisine','category','priceBand','profile','address','url','tier','source','featured','tags']) {
    must(Object.prototype.hasOwnProperty.call(item,key),`campo ${key} ausente em ${item.id || item.name || 'registro'}`);
  }
}
must(api.includes("require('../gastronomia/data/restaurants.json')"),'API não carrega catálogo próprio');
must(api.includes('ownCount'),'API não informa quantidade de resultados próprios');
must(api.includes('externalCount'),'API não informa quantidade de resultados públicos');
must(api.includes('externalStatus'),'API não informa estado da camada externa');
must(api.includes("externalStatus = 'degraded'") || api.includes("externalStatus:'degraded'") || api.includes("externalStatus: 'degraded'"),'API não prevê degradação da fonte externa');

must(html.includes('DESTINOS NO BRASIL') || js.includes('DESTINOS NO BRASIL'),'atalhos de destinos brasileiros ausentes');
must(html.includes('DESTINOS NO MUNDO') || js.includes('DESTINOS NO MUNDO'),'atalhos de destinos internacionais ausentes');
must(html.includes('Autoridade em Gastronomia e Eventos') || js.includes('Autoridade em Gastronomia e Eventos'),'Renata La Porta não está posicionada como autoridade');
must(html.includes('Encontro Gastrô Brasília 2026') || js.includes('Encontro Gastrô Brasília 2026'),'reconhecimento 2026 de Renata La Porta ausente');
must(js.includes('externalStatus'),'cliente não trata falha/degradação da camada externa');
must(js.includes('data-search-location'),'atalhos de localização não estão ligados à busca');

must(js.includes('/studio-paulo-source.png'),'Gastronomia não usa o avatar de Paulo do site-mãe');
must(js.includes('--tomato:#e53935'),'cor tomate da identidade gastronômica ausente');
must(js.includes('--orange:#ff7a00'),'laranja vibrante da identidade gastronômica ausente');
must(js.includes('--warm-bg:#fff8f1'),'fundo claro e quente da identidade gastronômica ausente');

for (const asset of ['gastronomia/media/paulo-jovem-ficticio.b64','gastronomia/media/isabella-jovem-ficticia.b64']) {
  must(exists(asset),`ativo jovem ausente: ${asset}`);
  must(read(asset).length > 1000,`ativo jovem vazio: ${asset}`);
}
must(js.includes('paulo-jovem-ficticio.b64'),'card do Paulo jovem não usa personagem fictício');
must(js.includes('isabella-jovem-ficticia.b64'),'card da Isabella jovem não usa personagem fictícia');
must(js.includes('PERSONAGEM FICTÍCIO'),'falta identificação de personagens fictícios');

must(js.includes('data-reveal'),'elementos animados por scroll ausentes');
must(js.includes('data-parallax'),'parallax leve ausente');
must(js.includes('prefers-reduced-motion'),'fallback de redução de movimento ausente');
must(js.includes('IntersectionObserver'),'animação de entrada por scroll ausente');
must(js.includes('requestAnimationFrame'),'loop de movimento otimizado ausente');

for (const page of ['renata-la-porta.html','sabores-brasilia-cerrado.html','pastelaria-vicosa.html','mane-mercado.html']) {
  must(exists(`gastronomia/materias/${page}`),`matéria ausente: ${page}`);
  const article = read(`gastronomia/materias/${page}`);
  must(article.includes('Deijanete Fayad'),`matéria ${page} sem análise de Deijanete Fayad`);
}
console.log('gastronomia-portal-test: PASS');
