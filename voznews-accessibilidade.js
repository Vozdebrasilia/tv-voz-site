(() => {
  const load=(src,id)=>{if(document.getElementById(id))return;const s=document.createElement('script');s.id=id;s.src=src;s.async=false;document.head.appendChild(s)};
  load('/voznews-accessibilidade-original.js','voznews-accessibilidade-original');

  const path=location.pathname.replace(/\/$/,'');
  if(path!=='') return;

  const credibilityLogoMap=new Map([
    ['./selo-40anos-transparente.png','/assets/awards/card-01.webp'],
    ['./capa-anuario.jpg','/assets/awards/card-02.webp'],
    ['./logo-ibj.jpg','/assets/awards/card-03.webp'],
    ['./logo-trofeu.jpg','/assets/awards/card-05.webp'],
    ['./assets-v23/selo-internacional-1.svg','/assets/awards/card-08.webp'],
    ['./assets-v23/selo-internacional-2.svg','/assets/awards/card-09.webp'],
    ['./assets-v23/selo-internacional-3.svg','/assets/awards/card-10.webp'],
    ['./assets-v23/selo-internacional-4.svg','/assets/awards/card-11.webp']
  ]);
  document.querySelectorAll('#credibilidade img').forEach(img=>{
    const current=img.getAttribute('src');
    const replacement=credibilityLogoMap.get(current);
    if(replacement) img.setAttribute('src',replacement);
  });

  const stats=document.querySelector('.eco-stats');
  if(!stats || document.getElementById('voznews-awards-grid')) return;

  const items=[
    {title:'TV Voz de Brasília — 40 anos',img:'/assets/awards/card-01.webp',text:'Quatro décadas construindo autoridade, confiança, credibilidade e visibilidade. O selo celebra a trajetória iniciada com a criação da Voz de Brasília e reconhece uma história marcada por presença, comunicação e relacionamento com o público.'},
    {title:'Anuário Brasileiro — 25 anos',img:'/assets/awards/card-02.webp',text:'Vinte e cinco anos de confiança em uma marca editorial que atravessou gerações. Esta edição marca o encerramento da série impressa regular do Anuário Brasileiro de Economia, Turismo e Meio Ambiente. A partir do próximo ano, a publicação passa a ser prioritariamente virtual, preservando a possibilidade de edições impressas especiais em datas ou projetos comemorativos.'},
    {title:'Instituto Brazil Just — 25 anos',img:'/assets/awards/card-03.webp',text:'Um reconhecimento à atuação humana do Instituto Brazil Just, que acolhe pessoas com carinho, atenção e dignidade, levando amor, cuidado e provisão a comunidades e indivíduos em situações nas quais a presença do Estado não alcança plenamente.'},
    {title:'TV Voz de Brasília Filmes',img:'/assets/awards/card-04.webp',text:'O caçula do ecossistema nasce para transformar histórias reais em memória audiovisual. O selo representa vidas, trajetórias e acontecimentos retratados em filme a partir da experiência verdadeira de seus participantes.'},
    {title:'Troféu Top of Millenium — 10ª edição',img:'/assets/awards/card-05.webp',text:'Em sua 10ª edição, o Troféu Top of Millenium reconhece autoridades, lideranças e empresas que se destacam no Brasil por sua contribuição, excelência, protagonismo e por trajetórias singulares capazes de deixar legado.'},
    {title:'Marca de 1.000+ Entrevistas',img:'/assets/awards/card-06.webp',text:'Reconhece uma marca histórica de mais de mil entrevistas realizadas, registrando ideias, trajetórias e experiências de personalidades, empresários, autoridades e protagonistas de diferentes setores. É o selo da memória construída por meio da conversa.'},
    {title:'Selo Cobertura Nacional e Internacional',img:'/assets/awards/card-07.webp',text:'Destinado a iniciativas, personalidades e organizações cuja atuação ultrapassa fronteiras locais e conquista projeção no Brasil e no exterior. Representa presença, alcance e capacidade de gerar visibilidade em diferentes territórios.'},
    {title:'Selo Conexão Global',img:'/assets/awards/card-08.webp',text:'Reconhece quem promove pontes entre países, culturas, instituições e mercados. Simboliza diplomacia, intercâmbio, desenvolvimento, cooperação e relacionamento internacional.'},
    {title:'Selo Excelência Editorial',img:'/assets/awards/card-09.webp',text:'Destinado a conteúdos e projetos que demonstram qualidade, responsabilidade, consistência editorial e compromisso com uma comunicação ética e relevante.'},
    {title:'Selo Impacto Social',img:'/assets/awards/card-10.webp',text:'Reconhece projetos, instituições e pessoas que produzem transformação concreta na vida de comunidades, ampliando oportunidades, dignidade, cuidado e inclusão.'},
    {title:'Selo Parceiro Estratégico',img:'/assets/awards/card-11.webp',text:'Reconhece empresas, instituições e lideranças que constroem relações duradouras e geram resultados por meio de confiança, cooperação e visão compartilhada. É o selo de quem entende que grandes impactos são construídos em conjunto.'}
  ];

  const grid=document.createElement('section');
  grid.id='voznews-awards-grid';
  grid.setAttribute('aria-label','Marcas institucionais, premiações e selos');
  grid.innerHTML=items.map((item,i)=>`<a href="#voznews-award-${i+1}" class="voznews-award-card" data-award-index="${i}" aria-label="Saiba mais sobre ${item.title}"><span class="voznews-award-img"><img src="${item.img}" alt="${item.title}" loading="lazy"></span><strong>${item.title}</strong><small>Saiba mais</small></a>`).join('');
  stats.insertAdjacentElement('afterend',grid);

  const modal=document.createElement('div');
  modal.id='voznews-award-modal';
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML='<div class="voznews-award-dialog" role="dialog" aria-modal="true" aria-labelledby="voznews-award-title"><button type="button" class="voznews-award-close" aria-label="Fechar">×</button><img class="voznews-award-modal-img" alt=""><div><h3 id="voznews-award-title"></h3><p id="voznews-award-text"></p></div></div>';
  document.body.appendChild(modal);

  const open=i=>{const item=items[i];if(!item)return;modal.querySelector('.voznews-award-modal-img').src=item.img;modal.querySelector('.voznews-award-modal-img').alt=item.title;modal.querySelector('#voznews-award-title').textContent=item.title;modal.querySelector('#voznews-award-text').textContent=item.text;modal.classList.add('open');modal.setAttribute('aria-hidden','false');modal.querySelector('.voznews-award-close').focus()};
  const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')};
  grid.addEventListener('click',e=>{const a=e.target.closest('.voznews-award-card');if(!a)return;e.preventDefault();open(Number(a.dataset.awardIndex))});
  modal.addEventListener('click',e=>{if(e.target===modal || e.target.closest('.voznews-award-close'))close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))close()});
})();