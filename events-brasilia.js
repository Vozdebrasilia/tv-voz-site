(() => {
  const events = [
    {
      title: 'NA PRAIA 2026 — PRÓXIMOS SHOWS EM BRASÍLIA',
      text: 'A edição de 10 anos do Na Praia segue com uma sequência forte de shows: Pablo, Zezo e Patrick Costa em 21 de agosto; Marisa Monte e Silva em 22; Xand Avião em 23; MC Livinho, Kayblack e MC Hariel em 28; e Pedro Sampaio, Luísa Sonza e Carol Biazin em 29 de agosto.',
      meta: '<strong>Próximas datas:</strong> 21, 22, 23, 28 e 29 de agosto de 2026<span class="mini"><strong>Local:</strong> Na Praia Parque — Brasília</span>',
      href: 'https://napraiafestival.r2.com.vc/',
      link: 'Ver programação oficial →',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=82'
    },
    {
      title: 'O QUE NOS HABITA — DANIEL TOYS',
      text: 'Exposição inédita de Daniel Toys sobre memória, pertencimento e afetos ocupa o Espaço Cultural Renato Russo a partir de 18 de agosto.',
      meta: '<strong>Período:</strong> 18 de agosto a 27 de setembro de 2026<span class="mini"><strong>Local:</strong> Espaço Cultural Renato Russo</span>',
      href: 'https://brasilia.deboa.com/',
      link: 'Ver programação cultural →',
      image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=82'
    },
    {
      title: 'AMOR EM ROSA — NOEL ROSA EM CENA NO CCBB',
      text: 'A revista musical inspirada no universo de Noel Rosa mistura teatro, música e humor em temporada no CCBB Brasília, com 21 canções do compositor.',
      meta: '<strong>Temporada:</strong> até 23 de agosto de 2026<span class="mini"><strong>Sessões:</strong> quinta a domingo, às 19h • CCBB Brasília</span>',
      href: 'https://ccbb.com.br/brasilia/programacao/amor-em-rosa/',
      link: 'Ver serviço oficial →',
      image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=82'
    },
    {
      title: 'ALÉM DA FANTASIA — YOSHITAKA AMANO',
      text: 'A grande exposição dedicada a Yoshitaka Amano segue em cartaz no CCBB Brasília, reunindo arte, fantasia e cultura visual em uma das mostras mais marcantes da temporada.',
      meta: '<strong>Período:</strong> 17 de julho a 1º de novembro de 2026<span class="mini"><strong>Local:</strong> CCBB Brasília</span>',
      href: 'https://ccbb.com.br/brasilia/programacao/',
      link: 'Ver programação oficial →',
      image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=82'
    },
    {
      title: 'FESTIVAL PRIMEIRO OLHAR — ARTE PARA A PRIMEIRA INFÂNCIA',
      text: 'O Festival Primeiro Olhar continua com atrações gratuitas voltadas a bebês, crianças de até cinco anos, educadores e famílias, ampliando o acesso à cultura desde a primeira infância.',
      meta: '<strong>Período:</strong> 3 a 27 de agosto de 2026<span class="mini"><strong>Perfil:</strong> infantil • cultural • gratuito</span>',
      href: 'https://brasilia.deboa.com/',
      link: 'Ver agenda do festival →',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=82'
    },
    {
      title: 'MIRACULOUS LADYBUG — O MUSICAL EM BRASÍLIA',
      text: 'O musical inspirado em Miraculous: As Aventuras de Ladybug e Cat Noir chega a Brasília para quatro apresentações no fim de semana de 22 e 23 de agosto.',
      meta: '<strong>Datas:</strong> 22 e 23 de agosto de 2026<span class="mini"><strong>Local:</strong> Teatro UNIP Brasília</span>',
      href: 'https://brasilia.deboa.com/',
      link: 'Ver informações →',
      image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=82'
    },
    {
      title: 'HOT WHEELS MONSTER TRUCKS LIVE — BRASÍLIA',
      text: 'O espetáculo Hot Wheels Monster Trucks Live ocupa a Arena Mané Garrincha com manobras, veículos gigantes e uma experiência voltada a fãs de automobilismo e entretenimento em família.',
      meta: '<strong>Data:</strong> 29 de agosto de 2026<span class="mini"><strong>Horário:</strong> 18h30 • Arena Mané Garrincha</span>',
      href: 'https://agitabrasilia.com/eventos/',
      link: 'Ver informações →',
      image: 'https://images.unsplash.com/photo-1511527844068-006b95d162c2?auto=format&fit=crop&w=1200&q=82'
    },
    {
      title: '59º FESTIVAL DE BRASÍLIA DO CINEMA BRASILEIRO',
      text: 'O Cine Brasília volta a receber um dos principais festivais do audiovisual nacional, com mostras competitivas, sessões especiais, debates, oficinas e programação também em outras regiões do DF.',
      meta: '<strong>Período:</strong> 11 a 19 de setembro de 2026<span class="mini"><strong>Local principal:</strong> Cine Brasília</span>',
      href: 'https://festcinebrasilia.com.br/',
      link: 'Ver programação oficial →',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=82'
    }
  ];

  function updateBrasiliaEvents(){
    const section = document.querySelector('#shows-eventos .visual-grid');
    if(!section) return;
    const cards = [...section.querySelectorAll('.visual-card')];
    events.forEach((event, i) => {
      let card = cards[i];
      if(!card){
        card = document.createElement('a');
        card.className = 'visual-card';
        section.appendChild(card);
      }
      card.href = event.href;
      card.target = '_blank';
      card.rel = 'noopener';
      card.innerHTML = `<img alt="${event.title}" loading="lazy" src="${event.image}"/><div class="visual-body"><h3>${event.title}</h3><p>${event.text}</p><div class="contact-meta">${event.meta}</div><span class="real-link">${event.link}</span></div>`;
    });
    cards.slice(events.length).forEach(card => card.remove());
    const head = document.querySelector('#shows-eventos .section-head p, #shows-eventos > .container > p');
    if(head) head.textContent = 'Agenda de Brasília atualizada com eventos, cultura, shows, experiências e cinema. Conteúdo revisado em 18 de agosto de 2026.';
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', updateBrasiliaEvents);
  else updateBrasiliaEvents();
})();
