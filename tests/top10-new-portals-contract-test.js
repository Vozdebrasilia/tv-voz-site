const fs = require('fs');
const { PORTALS, buildInterviewSection, buildCompanySection } = require('../top10-existing-portals.js');

const portals = [
  ['/poder-justica-cidadania/', 'poder-justica-cidadania/index.html', 'PODER, JUSTIÇA & CIDADANIA'],
  ['/economia-negocios-consumo/', 'economia-negocios-consumo/index.html', 'ECONOMIA, NEGÓCIOS & CONSUMO'],
  ['/tecnologia-ia-midia/', 'tecnologia-ia-midia/index.html', 'TECNOLOGIA, IA & MÍDIA'],
  ['/educacao-carreiras-cultura/', 'educacao-carreiras-cultura/index.html', 'EDUCAÇÃO, CARREIRAS & CULTURA'],
  ['/estilo-esporte-experiencias/', 'estilo-esporte-experiencias/index.html', 'ESTILO, ESPORTE & EXPERIÊNCIAS']
];

for (const [path, file, title] of portals) {
  if (!fs.existsSync(file)) throw new Error(`${title}: página não criada`);
  const source = fs.readFileSync(file, 'utf8');
  const config = PORTALS[path];
  if (!config) throw new Error(`${title}: configuração não criada`);
  const rendered = source + buildInterviewSection(config) + buildCompanySection(config);
  const encodedTitle = title.replace(/&/g, '&amp;');
  for (const marker of [encodedTitle, '/logo-voznews-oficial.png', '/top10-existing-portals.js', 'id="entrevistas"', 'youtube.com/watch?v=', 'id="pesquisa-empresas"', 'data-company-directory']) {
    if (!rendered.includes(marker)) throw new Error(`${title}: falta ${marker}`);
  }
}

const runtime = fs.readFileSync('top10-runtime.js', 'utf8');
for (const [path] of portals) {
  if (!runtime.includes(`siteHref:'${path}'`)) throw new Error(`TOP 10 não aponta para ${path}`);
}

console.log('PASS: cinco novos portais cumprem conteúdo, entrevistas, pesquisa e rotas');
