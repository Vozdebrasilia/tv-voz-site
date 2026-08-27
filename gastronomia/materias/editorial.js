(() => {
  const page = location.pathname.split('/').pop();
  const configs = {
    'mane-mercado.html': {
      title: 'Avaliação Voz News — Mané Mercado',
      deijanete: 'A variedade funciona como convite à convivência: grupos diferentes conseguem compartilhar a mesma mesa sem abrir mão de suas preferências.',
      paulo: 'O endereço combina com a Brasília dos grandes encontros. A força está na circulação, na diversidade e na capacidade de transformar refeição em programa.',
      gallery: [
        ['https://mane.com.vc/_next/image?q=75&url=%2Fimages%2Fhero2.jpg&w=1920','Ambiente gastronômico do Mané Mercado'],
        ['https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85','Mesa de restaurante'],
        ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85','Prato em restaurante']
      ],
      young: 'Para o olhar adolescente, variedade, ambiente para grupos, sobremesas e facilidade para escolher pratos diferentes são pontos fortes a observar.'
    },
    'pastelaria-vicosa.html': {
      title: 'Avaliação Voz News — Pastelaria Viçosa',
      deijanete: 'O valor dessa experiência está justamente na simplicidade. É uma comida que se tornou vínculo afetivo com o cotidiano da cidade.',
      paulo: 'A Rodoviária e a Viçosa fazem parte de uma Brasília vivida, popular e acelerada. O sabor está ligado à memória de quem passou por ali durante décadas.',
      gallery: [
        ['https://3.bp.blogspot.com/-KqQuhbEFDJw/VbwBueyx4yI/AAAAAAAANws/kSiQ0DYzROE/s1600/pastelaria-2.jpg','Pastelaria Viçosa'],
        ['https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85','Pastel frito e crocante'],
        ['https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=85','Bebida gelada servida com lanche']
      ],
      young: 'A editoria adolescente vai observar preço, rapidez, tamanho da porção e o quanto um clássico popular ainda conversa com quem está descobrindo Brasília agora.'
    },
    'renata-la-porta.html': {
      title: 'Avaliação Voz News — Renata La Porta',
      deijanete: 'Hospitalidade é a soma de detalhes que fazem o convidado se sentir cuidado. Em eventos, a comida participa diretamente da memória daquele momento.',
      paulo: 'Brasília sempre foi uma cidade de recepções, encontros e celebrações. O setor de buffet faz parte dessa história institucional e social.',
      gallery: [
        ['https://images.metroimg.com/2019/07/12111836/250619-HB-Perfil-da-chef-Renata-La-Porta4.jpg','Chef Renata La Porta'],
        ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85','Mesa preparada para evento'],
        ['https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=85','Serviço gastronômico em evento']
      ],
      young: 'Para os adolescentes, eventos também são experiência visual: sobremesas, apresentação, ambiente e momentos que rendem boas fotos entram na avaliação.'
    },
    'sabores-brasilia-cerrado.html': {
      title: 'Avaliação Voz News — Cerrado na mesa',
      deijanete: 'Quando o ingrediente regional ganha contexto, o leitor entende que sabor, território e identidade fazem parte da mesma história.',
      paulo: 'Pequi, baru e outros produtos do Cerrado ajudam Brasília a contar uma história que não está apenas nos monumentos, mas também na mesa.',
      gallery: [
        ['https://commons.wikimedia.org/wiki/Special:FilePath/Pequi_do_cerrado.jpg','Pequi do Cerrado'],
        ['https://commons.wikimedia.org/wiki/Special:FilePath/Castanhas_de_Baru_em_cima_de_um_prato.jpg','Castanhas de baru'],
        ['https://commons.wikimedia.org/wiki/Special:FilePath/Arroz_com_pequi.jpg','Arroz com pequi']
      ],
      young: 'A editoria adolescente vai testar como ingredientes regionais podem aparecer em versões mais jovens: hambúrgueres, molhos, sobremesas, massas e lanches.'
    }
  };
  const cfg = configs[page];
  if (!cfg) return;
  const article = document.querySelector('article');
  if (!article) return;

  const style = document.createElement('style');
  style.textContent = `
    .vn-gallery{display:grid;grid-template-columns:2fr 1fr 1fr;gap:10px;margin:34px 0}.vn-gallery figure{margin:0;overflow:hidden;border-radius:20px;border:1px solid rgba(212,175,55,.26);background:#0a1b29}.vn-gallery img{width:100%;height:260px;object-fit:cover;transition:.55s}.vn-gallery figure:first-child img{height:360px}.vn-gallery img:hover{transform:scale(1.06)}.vn-gallery figcaption{padding:9px 11px;font-size:11px;color:#aebdca}.vn-panel{margin:38px 0;padding:24px;border-radius:26px;border:1px solid rgba(212,175,55,.38);background:linear-gradient(145deg,rgba(212,175,55,.10),rgba(255,255,255,.04))}.vn-panel h2{margin:0 0 18px}.vn-voices{display:grid;grid-template-columns:1fr 1fr;gap:14px}.vn-voice{display:grid;grid-template-columns:74px 1fr;gap:13px;padding:16px;border-radius:18px;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.1)}.vn-voice img{width:74px;height:88px;object-fit:cover;object-position:top;border-radius:14px}.vn-voice strong{display:block;color:#f1d270;font-size:17px}.vn-voice small{font-size:10px;font-weight:900;letter-spacing:.8px}.vn-voice p{font-size:14px;line-height:1.48;margin:7px 0 0;color:#dbe6ee}.vn-young{margin-top:14px;padding:15px 17px;border-radius:17px;background:linear-gradient(135deg,rgba(255,122,182,.12),rgba(99,212,255,.12));border:1px solid rgba(99,212,255,.2);font-size:14px;line-height:1.5;color:#e7f0f6}.vn-young b{color:#fff}.vn-back{display:inline-flex;margin-top:8px;padding:12px 16px;border-radius:999px;background:#f1d270;color:#171000;font-weight:900;font-size:12px}@media(max-width:760px){.vn-gallery{grid-template-columns:1fr}.vn-gallery img,.vn-gallery figure:first-child img{height:240px}.vn-voices{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const panel = document.createElement('section');
  panel.className = 'vn-panel';
  panel.innerHTML = `
    <h2>${cfg.title}</h2>
    <div class="vn-voices">
      <div class="vn-voice"><img src="../../deijanete-fayad-anchor.jpg" alt="Deijanete Fayad"><div><strong>Deijanete Fayad</strong><small>ANÁLISE EDITORIAL</small><p>${cfg.deijanete}</p></div></div>
      <div class="vn-voice"><img src="../../paulo-fayad-anchor.jpg" alt="Paulo Fayad"><div><strong>Paulo Fayad</strong><small>MEMÓRIA E EXPERIÊNCIA</small><p>${cfg.paulo}</p></div></div>
    </div>
    <div class="vn-young"><b>🍔 Olhar adolescente — Paulo Filho e Isabella:</b> ${cfg.young}</div>
    <a class="vn-back" href="../#comunidade">📹 MANDE SUA RECEITA OU VÍDEO PARA A VOZ NEWS</a>
  `;

  const gallery = document.createElement('div');
  gallery.className = 'vn-gallery';
  gallery.innerHTML = cfg.gallery.map(([src,alt]) => `<figure><img loading="lazy" src="${src}" alt="${alt}"><figcaption>${alt}</figcaption></figure>`).join('');

  const source = article.querySelector('.source');
  if (source) {
    article.insertBefore(gallery, source);
    article.insertBefore(panel, source);
  } else {
    article.appendChild(gallery);
    article.appendChild(panel);
  }
})();
