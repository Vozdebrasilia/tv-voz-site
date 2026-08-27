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

for (const token of ['VOZ NEWS','GASTRONOMIA','Brasília','Brasil','Mundo','Mané Mercado','Renata La Porta','Deijanete Fayad','Paulo Fayad','Vasto','Coco Bambu','Mangai','Piselli','Rubaiyat','Kubitschek','Pastelaria Viçosa','Sabores de Brasília e do Cerrado']) {
  must(html.includes(token) || js.includes(token), `conteúdo obrigatório ausente: ${token}`);
}
must(html.includes('id="restaurant-search"'),'formulário de busca ausente');
must(html.includes('id="search-results"'),'área de resultados ausente');
must(js.includes('/api/restaurants'),'cliente não consulta /api/restaurants');
must(api.includes('nominatim.openstreetmap.org'),'endpoint sem geocodificação Nominatim');
must(api.includes('overpass-api.de'),'endpoint sem busca Overpass');
must(!/href=["']#["']/.test(html),'há link essencial href="#"');
for (const page of ['renata-la-porta.html','sabores-brasilia-cerrado.html','pastelaria-vicosa.html','mane-mercado.html']) {
  must(exists(`gastronomia/materias/${page}`),`matéria ausente: ${page}`);
  const article = read(`gastronomia/materias/${page}`);
  must(article.includes('Deijanete Fayad'),`matéria ${page} sem análise de Deijanete Fayad`);
}
console.log('gastronomia-portal-test: PASS');
