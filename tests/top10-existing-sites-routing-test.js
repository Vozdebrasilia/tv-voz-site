const fs = require('fs');

const source = fs.readFileSync('top10-runtime.js', 'utf8');
const expectedRoutes = [
  '/energia-agro-sustentabilidade/',
  '/mobilidade/',
  '/saude-beleza/',
  '/moveis-decoracao/',
  '/gastronomia/'
];

for (const route of expectedRoutes) {
  if (!source.includes(`siteHref:'${route}'`)) {
    throw new Error(`TOP 10 não abre o portal existente: ${route}`);
  }
}

if (!source.includes("if(grupo.siteHref){location.href=grupo.siteHref;return;}")) {
  throw new Error('Cartões TOP 10 não encaminham para portais completos');
}

console.log('PASS: cinco portais existentes conectados aos módulos TOP 10');
