(() => {
  const events = [
    {
      title: 'O QUE NOS HABITA — DANIEL TOYS',
      text: 'Exposição inédita de Daniel Toys sobre memória, pertencimento e afetos ocupa o Espaço Cultural Renato Russo a partir de 18 de agosto.',
      meta: '<strong>Período:</strong> 18 de agosto a 27 de setembro de 2026<span class="mini"><strong>Local:</strong> Espaço Cultural Renato Russo</span>',
      href: 'https://brasilia.deboa.com/',
      link: 'Ver programação cultural →',
      image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=82'
    },
    {
      title: 'ROCKNIGHTS — GOLDEN LOVE HITS',
      text: 'Noite especial de rock e clássicos em Brasília, com programação marcada para sexta-feira, 21 de agosto.',
      meta: '<strong>Data:</strong> 21 de agosto de 2026<span class="mini"><strong>Horário:</strong> 20h • AABB Brasília</span>',
      href: 'https://www.sympla.com.br/eventos/brasilia-df/show-musica-festa',
      link: 'Ver evento e ingressos →',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=82'
    },
    {
      title: 'BAILÃO 2000 — BRASÍLIA',
      text: 'Festa com repertório nostálgico dos anos 2000 entra na agenda da capital nesta sexta-feira, 21 de agosto.',
      meta: '<strong>Data:</strong> 21 de agosto de 2026<span class="mini"><strong>Horário:</strong> 22h</span>',
      href: 'https://www.sympla.com.br/eventos/brasilia-df/show-musica-festa',
      link: 'Ver informações →',
      image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=82'
    },
    {
      title: 'ABSTRACT FESTIVAL 10 ANOS — EDIÇÃO ESPECIAL',
      text: 'A Festa Star Light celebra os 10 anos do Abstract Festival em edição especial na noite de 22 de agosto, em Brasília.',
      meta: '<strong>Data:</strong> 22 de agosto de 2026<span class="mini"><strong>Horário:</strong> 22h59</span>',
      href: 'https://agitabrasilia.com/eventos/',
      link: 'Ver agenda e informações →',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=82'
    },
    {
      title: 'LEGIÃO URBANA — TRIBUTO ACÚSTICO',
      text: 'Tributo acústico à Legião Urbana chega ao Teatro Royal Tulip na sexta-feira, 28 de agosto.',
      meta: '<strong>Data:</strong> 28 de agosto de 2026<span class="mini"><strong>Horário:</strong> 21h • Teatro Royal Tulip</span>',
      href: 'https://www.sympla.com.br/eventos/brasilia-df/show-musica-festa',
      link: 'Ver evento →',
      image: 'https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?auto=format&fit=crop&w=1200&q=82'
    },
    {
      title: 'HOT WHEELS MONSTER TRUCKS LIVE — BRASÍLIA',
      text: 'O espetáculo Hot Wheels Monster Trucks Live ocupa a Arena Mané Garrincha no sábado, 29 de agosto.',
      meta: '<strong>Data:</strong> 29 de agosto de 2026<span class="mini"><strong>Horário:</strong> 18h30 • Arena Mané Garrincha</span>',
      href: 'https://agitabrasilia.com/eventos/',
      link: 'Ver informações →',
      image: 'https://images.unsplash.com/photo-1511527844068-006b95d162c2?auto=format&fit=crop&w=1200&q=82'
    },
    {
      title: 'THE BEATLES ABBEY ROAD — ULTIMATE TRIBUTE SHOW',
      text: 'Tributo especial aos Beatles chega ao Centro de Convenções Ulysses Guimarães no domingo, 30 de agosto.',
      meta: '<strong>Data:</strong> 30 de agosto de 2026<span class="mini"><strong>Horário:</strong> 19h • Centro de Convenções Ulysses Guimarães</span>',
      href: 'https://www.sympla.com.br/eventos/brasilia-df/show-musica-festa',
      link: 'Ver evento e ingressos →',
      image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1200&q=82'
    },
    {
      title: 'CINEMA — ESTREIAS DE 20 DE AGOSTO',
      text: 'A programação dos cinemas de Brasília recebe novos títulos em 20 de agosto, entre eles Rio de Clarice, Anistia 79, O Shaolin do Sertão 2 e Amélia Toledo — Lembrar de não esquecer.',
      meta: '<strong>Estreias:</strong> 20 de agosto de 2026<span class="mini"><strong>Onde:</strong> cinemas de Brasília</span>',
      href: 'https://www.veloxtickets.com/Portal/Ingresso/cinema/Brasilia',
      link: 'Ver programação de cinema →',
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
    if(head) head.textContent = 'Agenda de Brasília atualizada com eventos, cultura, shows, experiências e cinema. Conteúdo revisado em 17 de agosto de 2026.';
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', updateBrasiliaEvents);
  else updateBrasiliaEvents();
})();
