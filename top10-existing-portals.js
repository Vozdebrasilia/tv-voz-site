(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root && root.document) api.boot(root.document, root.location);
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  const PORTALS = {
    '/energia/': {
      topic: 'Energia, Agro & Sustentabilidade',
      interviews: [
        ['Marcelo Crivella — entrevista institucional', 'https://www.youtube.com/watch?v=6rW1U7YlZ-E'],
        ['Daniel Balaban — liderança e segurança alimentar', 'https://www.youtube.com/watch?v=5QWMLQjrV4c'],
        ['Rostyslav Tronenko — relações internacionais', 'https://www.youtube.com/watch?v=81SWKSXbtN0']
      ],
      companies: [
        ['Petrobras', 'Petróleo e energia', 'https://petrobras.com.br/'],
        ['Eletrobras', 'Energia elétrica', 'https://eletrobras.com/'],
        ['Itaipu Binacional', 'Geração renovável', 'https://www.itaipu.gov.br/'],
        ['Neoenergia Brasília', 'Distribuição de energia', 'https://www.neoenergia.com/'],
        ['ENGIE Brasil', 'Energia e infraestrutura', 'https://www.engie.com.br/'],
        ['Schneider Electric', 'Gestão de energia', 'https://www.se.com/br/pt/']
      ]
    },
    '/gastronomia/': {
      topic: 'Turismo, Hotelaria & Gastronomia',
      interviews: [
        ['Patrícia Calmon — Pastelaria Viçosa', 'https://www.youtube.com/watch?v=GIoOUiQZ4Ao'],
        ['Teruo — gastronomia e empreendedorismo', 'https://www.youtube.com/watch?v=xIN7omCOUfU'],
        ['Paulo Octávio — turismo, negócios e Brasília', 'https://www.youtube.com/watch?v=m8s4ajix3vA']
      ],
      companies: [
        ['Pastelaria Viçosa', 'Tradição brasiliense', 'https://www.instagram.com/pastelariavicosa/'],
        ['Mané Mercado', 'Mercado gastronômico', 'https://www.instagram.com/manemercado/'],
        ['Coco Bambu', 'Restaurante', 'https://cocobambu.com/'],
        ['Vasto', 'Restaurante', 'https://vastorestaurante.com.br/'],
        ['Rubaiyat Brasília', 'Restaurante', 'https://gruporubaiyat.com/'],
        ['Mangai', 'Culinária brasileira', 'https://mangai.com.br/']
      ]
    },
    '/mobilidade/': {
      topic: 'Mobilidade, Aviação & Transportes',
      interviews: [
        ['Osório Adriano Filho — Brasal', 'https://www.youtube.com/watch?v=15DtHnZYRtA'],
        ['Dauto Tintas — setor automotivo', 'https://www.youtube.com/watch?v=sHgGEnqJO3M'],
        ['Paulo Octávio — mobilidade e desenvolvimento', 'https://www.youtube.com/watch?v=m8s4ajix3vA']
      ],
      companies: [
        ['Localiza', 'Locação de veículos', 'https://www.localiza.com/brasil/pt-br'],
        ['Movida', 'Locação de veículos', 'https://www.movida.com.br/'],
        ['Unidas', 'Locação de veículos', 'https://www.unidas.com.br/'],
        ['Brasal Veículos', 'Concessionárias', 'https://www.brasal.com.br/'],
        ['LATAM Airlines', 'Aviação', 'https://www.latamairlines.com/br/pt'],
        ['Inframerica', 'Aeroporto de Brasília', 'https://www.bsb.aero/']
      ]
    },
    '/moveis-decoracao/': {
      topic: 'Imóveis, Casa & Construção',
      interviews: [
        ['Fernando Rabelo — Coreto', 'https://www.youtube.com/watch?v=b5t8TEEJdiU'],
        ['Paulo Octávio — construção e cidades', 'https://www.youtube.com/watch?v=m8s4ajix3vA'],
        ['Canon — imagem, arquitetura e criação', 'https://www.youtube.com/watch?v=aK34W2Ob6ms']
      ],
      companies: [
        ['Coreto', 'Móveis e design', 'https://www.instagram.com/coreto.com.br/'],
        ['Bontempo', 'Móveis planejados', 'https://www.bontempo.com.br/'],
        ['CasaPark', 'Design e decoração', 'https://casapark.com.br/'],
        ['Artefacto', 'Mobiliário', 'https://artefacto.com.br/'],
        ['Florense', 'Móveis planejados', 'https://www.florense.com/'],
        ['Tok&Stok', 'Casa e decoração', 'https://www.tokstok.com.br/']
      ]
    },
    '/saude-beleza/': {
      topic: 'Saúde & Bem-Estar',
      interviews: [
        ['Janete Vaz — Grupo Sabin', 'https://www.youtube.com/watch?v=Y4K1klhysDs'],
        ['Dr. Julian Machado — saúde e autoridade médica', 'https://www.youtube.com/watch?v=W38MqDRffaI'],
        ['Dr. Carlos Alberto — Ótica Brasiliense', 'https://www.youtube.com/watch?v=CoUtlJfXcjM'],
        ['Instituto da Medicina da Visão', 'https://www.youtube.com/watch?v=tB84ssWNLYg']
      ],
      companies: [
        ['Grupo Sabin', 'Medicina diagnóstica', 'https://www.sabin.com.br/'],
        ['Instituto da Medicina da Visão', 'Saúde ocular', 'https://www.imv.com.br/'],
        ['Hospital Brasília', 'Hospital e especialidades', 'https://www.rededorsaoluiz.com.br/hospital/hospital-brasilia'],
        ['Rede D’Or', 'Hospitais e clínicas', 'https://www.rededorsaoluiz.com.br/'],
        ['Ótica Brasiliense', 'Saúde visual', 'https://www.instagram.com/oticabrasiliense/'],
        ['Drogasil', 'Farmácia e cuidados', 'https://www.drogasil.com.br/']
      ]
    },
    '/poder-justica-cidadania/': {
      topic: 'Poder, Justiça & Cidadania',
      interviews: [
        ['Celina Leão — gestão pública e Brasília', 'https://www.youtube.com/watch?v=oPQf_cMwzKc'],
        ['Senador Paulo Paim — direitos e cidadania', 'https://www.youtube.com/watch?v=bKH2NVFZnos'],
        ['Érika Kokay — política e participação social', 'https://www.youtube.com/watch?v=80bo5avnFNk']
      ],
      companies: [
        ['Câmara dos Deputados', 'Poder Legislativo', 'https://www.camara.leg.br/'],
        ['Senado Federal', 'Poder Legislativo', 'https://www12.senado.leg.br/'],
        ['Supremo Tribunal Federal', 'Justiça constitucional', 'https://portal.stf.jus.br/'],
        ['CNJ', 'Conselho Nacional de Justiça', 'https://www.cnj.jus.br/'],
        ['Defensoria Pública do DF', 'Acesso à Justiça', 'https://www.defensoria.df.gov.br/'],
        ['Instituto Brazil Just', 'Cidadania e impacto social', '/ibj.html']
      ]
    },
    '/economia-negocios-consumo/': {
      topic: 'Economia, Negócios & Consumo',
      interviews: [
        ['Osório Adriano Filho — trajetória da Brasal', 'https://www.youtube.com/watch?v=15DtHnZYRtA'],
        ['Paulo Octávio — visão empresarial e legado', 'https://www.youtube.com/watch?v=m8s4ajix3vA'],
        ['Janete Vaz — liderança e empreendedorismo', 'https://www.youtube.com/watch?v=Y4K1klhysDs']
      ],
      companies: [
        ['Banco Central do Brasil', 'Economia e sistema financeiro', 'https://www.bcb.gov.br/'],
        ['Sebrae', 'Empreendedorismo', 'https://sebrae.com.br/'],
        ['CNC', 'Comércio de bens e serviços', 'https://cnc.org.br/'],
        ['CNI', 'Indústria', 'https://www.portaldaindustria.com.br/cni/'],
        ['Brasal', 'Grupo empresarial', 'https://www.brasal.com.br/'],
        ['Grupo Sabin', 'Empresa e inovação', 'https://www.sabin.com.br/']
      ]
    },
    '/tecnologia-ia-midia/': {
      topic: 'Tecnologia, IA & Mídia',
      interviews: [
        ['Canon — imagem, tecnologia e criação', 'https://www.youtube.com/watch?v=aK34W2Ob6ms'],
        ['Andreza Bentes — tecnologia aplicada à educação', 'https://www.youtube.com/watch?v=mFX7ZEVbjrI'],
        ['Janete Vaz — inovação e gestão', 'https://www.youtube.com/watch?v=Y4K1klhysDs']
      ],
      companies: [
        ['Ministério da Ciência, Tecnologia e Inovação', 'Política de inovação', 'https://www.gov.br/mcti/pt-br'],
        ['Serpro', 'Tecnologia pública', 'https://www.serpro.gov.br/'],
        ['Sebrae Startups', 'Empreendedorismo tecnológico', 'https://sebrae.com.br/'],
        ['Canon Brasil', 'Imagem e produção', 'https://www.canon.com.br/'],
        ['Campus Party Brasil', 'Tecnologia e comunidade', 'https://brasil.campus-party.org/'],
        ['TV Voz de Brasília', 'Mídia e jornalismo', 'https://www.youtube.com/@VozdebrasiliaTV']
      ]
    },
    '/educacao-carreiras-cultura/': {
      topic: 'Educação, Carreiras & Cultura',
      interviews: [
        ['Andreza Bentes — Kumon e desenvolvimento', 'https://www.youtube.com/watch?v=mFX7ZEVbjrI'],
        ['Daniel Balaban — conhecimento e cooperação', 'https://www.youtube.com/watch?v=5QWMLQjrV4c'],
        ['Embaixadora Mai Taha Khalil — cultura e relações bilaterais', 'https://www.youtube.com/watch?v=Yi9gy8MuU-8']
      ],
      companies: [
        ['Ministério da Educação', 'Políticas educacionais', 'https://www.gov.br/mec/pt-br'],
        ['CAPES', 'Formação e pós-graduação', 'https://www.gov.br/capes/pt-br'],
        ['CNPq', 'Pesquisa e conhecimento', 'https://www.gov.br/cnpq/pt-br'],
        ['Universidade de Brasília', 'Ensino superior', 'https://www.unb.br/'],
        ['Kumon', 'Educação complementar', 'https://www.kumon.com.br/'],
        ['Secretaria de Cultura do DF', 'Cultura e economia criativa', 'https://www.cultura.df.gov.br/']
      ]
    },
    '/estilo-esporte-experiencias/': {
      topic: 'Estilo, Esporte & Experiências',
      interviews: [
        ['Dr. Julian Machado — esporte e qualidade de vida', 'https://www.youtube.com/watch?v=W38MqDRffaI'],
        ['Patrícia Calmon — marca e experiência do cliente', 'https://www.youtube.com/watch?v=GIoOUiQZ4Ao'],
        ['Fernando Rabelo — design e estilo corporativo', 'https://www.youtube.com/watch?v=b5t8TEEJdiU']
      ],
      companies: [
        ['Comitê Olímpico do Brasil', 'Esporte', 'https://www.cob.org.br/'],
        ['Confederação Brasileira de Futebol', 'Futebol', 'https://www.cbf.com.br/'],
        ['Styllus La Vie', 'Moda e celebrações', 'https://www.instagram.com/stylluslavie/'],
        ['Petlove', 'Pet e bem-estar animal', 'https://www.petlove.com.br/'],
        ['Sympla', 'Eventos e experiências', 'https://www.sympla.com.br/'],
        ['Arena BRB', 'Esporte e entretenimento', 'https://www.arenabrb.com/']
      ]
    }
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  }

  function buildInterviewSection(config) {
    const cards = config.interviews.map(([title, href]) =>
      `<a class="vn-contract-card" href="${escapeHtml(href)}" target="_blank" rel="noopener"><span class="vn-contract-kicker">ENTREVISTA EM VÍDEO</span><strong>${escapeHtml(title)}</strong><span>Assistir no YouTube →</span></a>`
    ).join('');
    return `<section class="vn-contract-section" id="entrevistas"><div class="vn-contract-wrap"><p class="vn-contract-eyebrow">VOZ NEWS • LIDERANÇAS</p><h2>Entrevistas com autoridades e protagonistas</h2><p>Conversas com lideranças públicas, empresariais e especialistas relacionadas a ${escapeHtml(config.topic)}.</p><div class="vn-contract-grid">${cards}</div></div></section>`;
  }

  function buildCompanySection(config) {
    const cards = config.companies.map(([name, category, href]) =>
      `<a class="vn-company-card" data-company-name="${escapeHtml(`${name} ${category}`.toLowerCase())}" href="${escapeHtml(href)}" target="_blank" rel="noopener"><strong>${escapeHtml(name)}</strong><span>${escapeHtml(category)}</span><small>Abrir canal oficial →</small></a>`
    ).join('');
    return `<section class="vn-contract-section vn-company-section" id="pesquisa-empresas" data-company-directory><div class="vn-contract-wrap"><p class="vn-contract-eyebrow">CONSULTA E PESQUISA</p><h2>Empresas e serviços do setor</h2><p>Consulte organizações selecionadas ou amplie a busca para encontrar empresas relacionadas a ${escapeHtml(config.topic)}.</p><form class="vn-company-search"><label>Empresa, serviço ou segmento<input type="search" name="company" placeholder="Digite o que procura" autocomplete="off"></label><button type="submit">PESQUISAR</button></form><p class="vn-company-status" aria-live="polite"></p><div class="vn-contract-grid vn-company-grid">${cards}</div><a class="vn-search-more" href="https://www.google.com/maps/search/${encodeURIComponent(config.topic)}" target="_blank" rel="noopener">AMPLIAR PESQUISA NO MAPA →</a></div></section>`;
  }

  function installStyles(doc) {
    if (doc.getElementById('vn-contract-styles')) return;
    const style = doc.createElement('style');
    style.id = 'vn-contract-styles';
    style.textContent = `.vn-contract-section{padding:72px 20px;background:#06162b;color:#fff}.vn-company-section{background:#eef4f9;color:#071526}.vn-contract-wrap{width:min(1180px,100%);margin:auto}.vn-contract-eyebrow{font-weight:900;letter-spacing:.13em;color:#d4af37}.vn-contract-section h2{font-size:clamp(30px,4vw,52px);line-height:1.05;margin:.25em 0}.vn-contract-section p{max-width:850px;line-height:1.6}.vn-contract-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:28px}.vn-contract-card,.vn-company-card{display:flex;flex-direction:column;gap:10px;padding:22px;border-radius:18px;text-decoration:none;background:#0c2a49;color:#fff;border:1px solid rgba(212,175,55,.45);box-shadow:0 15px 40px rgba(0,0,0,.12)}.vn-contract-card strong,.vn-company-card strong{font-size:19px}.vn-contract-card span:last-child,.vn-contract-kicker,.vn-company-card small{color:#f4ce4b;font-weight:800}.vn-company-card{background:#fff;color:#071526;border-color:#cad7e5}.vn-company-card small{color:#8b6500}.vn-company-search{display:flex;gap:12px;align-items:end;max-width:780px;margin-top:24px}.vn-company-search label{display:grid;gap:8px;flex:1;font-weight:800}.vn-company-search input{width:100%;padding:15px 16px;border:1px solid #aab8c8;border-radius:10px;font:inherit}.vn-company-search button,.vn-search-more{display:inline-flex;padding:15px 20px;border:0;border-radius:10px;background:#d4af37;color:#071526;font-weight:900;text-decoration:none;cursor:pointer}.vn-search-more{margin-top:22px}.vn-company-status{min-height:1.5em;font-weight:700}@media(max-width:820px){.vn-contract-grid{grid-template-columns:1fr}.vn-company-search{align-items:stretch;flex-direction:column}}`;
    doc.head.appendChild(style);
  }

  function boot(doc, location) {
    const config = PORTALS[location.pathname.replace(/index\.html$/, '')];
    if (!config || !doc.body) return;
    installStyles(doc);
    const footer = doc.querySelector('footer');
    const anchor = footer || null;
    const mount = html => {
      const template = doc.createElement('template');
      template.innerHTML = html.trim();
      doc.body.insertBefore(template.content.firstElementChild, anchor);
    };
    if (!doc.getElementById('entrevistas')) mount(buildInterviewSection(config));
    if (!doc.getElementById('pesquisa-empresas')) mount(buildCompanySection(config));
    const section = doc.getElementById('pesquisa-empresas');
    const form = section && section.querySelector('.vn-company-search');
    if (!form) return;
    const input = form.elements.company;
    const cards = [...section.querySelectorAll('[data-company-name]')];
    const status = section.querySelector('.vn-company-status');
    const more = section.querySelector('.vn-search-more');
    const apply = () => {
      const query = input.value.trim().toLowerCase();
      let visible = 0;
      cards.forEach(card => {
        const show = !query || card.dataset.companyName.includes(query);
        card.hidden = !show;
        if (show) visible += 1;
      });
      status.textContent = query ? `${visible} resultado(s) neste diretório. Use o mapa para ampliar a pesquisa.` : '';
      more.href = `https://www.google.com/maps/search/${encodeURIComponent(`${query || config.topic} ${config.topic}`)}`;
    };
    form.addEventListener('submit', event => { event.preventDefault(); apply(); });
    input.addEventListener('input', apply);
  }

  return { PORTALS, buildInterviewSection, buildCompanySection, boot };
});
