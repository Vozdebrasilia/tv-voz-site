const fs = require('fs');
const { PORTALS, buildInterviewSection, buildCompanySection } = require('../top10-existing-portals.js');

const portals = [
  { name: 'Energia', path: '/energia/', file: 'energia/home.html' },
  { name: 'Gastronomia', path: '/gastronomia/', file: 'gastronomia/index.html' },
  { name: 'Mobilidade', path: '/mobilidade/', file: 'mobilidade/index.html' },
  { name: 'Móveis e Decoração', path: '/moveis-decoracao/', file: 'moveis-decoracao/index.html' },
  { name: 'Saúde e Bem-Estar', path: '/saude-beleza/', file: 'saude-beleza/index.html' }
];

for (const portal of portals) {
  const source = fs.readFileSync(portal.file, 'utf8');
  if (!source.includes('/top10-existing-portals.js')) {
    throw new Error(`${portal.name}: módulo compartilhado não foi carregado`);
  }

  const config = PORTALS[portal.path];
  if (!config) throw new Error(`${portal.name}: configuração não encontrada`);
  const rendered = buildInterviewSection(config) + buildCompanySection(config);
  const requirements = [
    ['aba de entrevistas', 'id="entrevistas"'],
    ['entrevista em vídeo', 'youtube.com/watch?v='],
    ['aba de consulta e pesquisa', 'id="pesquisa-empresas"'],
    ['diretório de empresas correlatas', 'data-company-directory']
  ];

  for (const [label, marker] of requirements) {
    if (!rendered.includes(marker)) {
      throw new Error(`${portal.name}: falta ${label}`);
    }
  }
}

console.log('PASS: cinco portais cumprem entrevistas, pesquisa e empresas correlatas');
