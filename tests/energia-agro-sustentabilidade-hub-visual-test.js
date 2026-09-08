const fs = require('fs');

const html = fs.readFileSync('energia-agro-sustentabilidade/index.html', 'utf8');

const required = [
  'Três portais estratégicos reunidos em um único núcleo editorial da VOZ NEWS.',
  'Escolha a área e acesse conteúdos autorais, entrevistas, fontes oficiais, pesquisa e visibilidade.',
  'Petróleo, gás, eletricidade, transição energética, infraestrutura, inovação, grandes projetos e liderança setorial em um portal completo e dinâmico.',
  'Produção, alimentos, tecnologia, exportações, crédito rural, clima, produtividade, autoridades e os movimentos que impulsionam o campo brasileiro.',
  'Clima, biodiversidade, ESG, economia verde, políticas públicas, inovação ambiental e os caminhos para um futuro sustentável e competitivo.',
  'ABRIR PORTAL →',
  'FONTES OFICIAIS • ENTREVISTAS • PESQUISA • CONTEÚDO AUTORAL • VISIBILIDADE',
  'itaipu14.webp',
  'Aeronave do Ibama durante sobrevoo',
  '@keyframes energyKen',
  '@keyframes agroKen',
  '@keyframes sustainKen',
  'Foto: Joédson Alves/Agência Brasil',
  'Foto: Vinícius Mendonça/Ibama'
];

for (const marker of required) {
  if (!html.includes(marker)) throw new Error(`Hub sem acabamento aprovado: ${marker}`);
}

if (!html.includes('.portal.sust h2') || !html.includes('.portal.agro h2')) {
  throw new Error('Tipografia dos títulos longos ainda não foi ajustada');
}

for (const href of ['/energia/', '/agronegocio/', '/sustentabilidade/']) {
  const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const linkPattern = new RegExp(`<a[^>]*href=["']${escaped}["'][^>]*target=["']_blank["'][^>]*rel=["'][^"']*noopener[^"']*["']`, 'i');
  if (!linkPattern.test(html)) {
    throw new Error(`Portal ${href} deve abrir em nova aba com rel=noopener`);
  }
}

console.log('PASS: hub Energia, Agro e Sustentabilidade com texto, imagens fortes, movimento e portais em nova aba');
