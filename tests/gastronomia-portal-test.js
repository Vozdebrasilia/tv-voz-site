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

// Editoria adolescente: personagens sintéticos fotográficos, nunca fotos pessoais reais.
for (const asset of ['gastronomia/media/paulo-jovem-ficticio.webp','gastronomia/media/isabella-jovem-ficticia.webp']) {
  must(exists(asset),`ativo jovem ausente: ${asset}`);
}
must(html.includes('media/paulo-jovem-ficticio.webp'),'card do Paulo jovem não usa personagem fictício');
must(html.includes('media/isabella-jovem-ficticia.webp'),'card da Isabella jovem não usa personagem fictícia');
must(html.includes('PERSONAGEM FICTÍCIO'),'falta identificação de personagens fictícios');

// Movimento deve ser real no front-end e respeitar acessibilidade.
must(html.includes('data-reveal'),'elementos animados por scroll ausentes');
must(html.includes('data-parallax'),'parallax leve ausente');
must(html.includes('prefers-reduced-motion'),'fallback de redução de movimento ausente');
must(js.includes('IntersectionObserver'),'animação de entrada por scroll ausente');
must(js.includes('requestAnimationFrame'),'loop de movimento otimizado ausente');

for (const page of ['renata-la-porta.html','sabores-brasilia-cerrado.html','pastelaria-vicosa.html','mane-mercado.html']) {
  must(exists(`gastronomia/materias/${page}`),`matéria ausente: ${page}`);
  const article = read(`gastronomia/materias/${page}`);
  must(article.includes('Deijanete Fayad'),`matéria ${page} sem análise de Deijanete Fayad`);
}
console.log('gastronomia-portal-test: PASS');
