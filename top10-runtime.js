/* VOZ NEWS BRASIL — PORTAL NOTA 10 */
(()=>{
  const grupos=[
    {rank:'TOP 01',title:'PODER, JUSTIÇA & CIDADANIA',subtitle:'Política, Justiça, Segurança e Cidadania',image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Eixo%20monumental%20de%20Bras%C3%ADlia%20%2C%20Esplanada%20dos%20Minist%C3%A9rios%20e%20Congresso%20Nacional%20-%20panoramio.jpg?width=1200',items:[
      {name:'Poder, República e Esplanada',href:'./portais/poder.html'},
      {name:'Justiça e Constituição',href:'./portais/justica.html'},
      {name:'Segurança, Defesa e Cidadania',href:'./portais/seguranca.html'},
      {name:'Instituto Brazil Just — Ação Social',href:'./portais/ibj-acao-social.html'}
    ]},
    {rank:'TOP 02',title:'ECONOMIA, NEGÓCIOS & CONSUMO',subtitle:'Empresas, Mercado, Empreendedorismo e Consumo',image:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=88',items:[
      {name:'Bancos, Fintechs e Mercado',href:'./portais/bancos.html'},
      {name:'Empreendedorismo e Pequenos Negócios',href:'./portais/empreendedorismo.html'},
      {name:'Seguros, Consórcios e Proteção',href:'./portais/seguros.html'},
      {name:'Supermercados, Atacarejo e Consumo',href:'./portais/varejo.html'}
    ]},
    {rank:'TOP 03',title:'ENERGIA, AGRO & SUSTENTABILIDADE',subtitle:'Energia, Agronegócio, Meio Ambiente e Futuro',image:'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1400&q=88',items:[
      {name:'Energia, Petróleo e Transição Energética',href:'./portais/energia.html'},
      {name:'Agronegócio e Alimentos',href:'./portais/agro.html'},
      {name:'Sustentabilidade, ESG e Meio Ambiente',href:'./portais/esg.html'}
    ]},
    {rank:'TOP 04',title:'MOBILIDADE, AVIAÇÃO & TRANSPORTES',subtitle:'Carros, Motos, Logística, Náutica e Aviação',image:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=88',items:[
      {name:'Aeroportos, Aviação e Mobilidade',href:'./portais/aviacao.html'},
      {name:'Automóveis, Indústria e Mobilidade',href:'./portais/automoveis.html'},
      {name:'Logística, Cargas e Transportes',href:'./portais/logistica.html'},
      {name:'Motos, Bikes e Mobilidade Urbana',href:'./portais/motos.html'}
    ]},
    {rank:'TOP 05',title:'TECNOLOGIA, IA & MÍDIA',subtitle:'Inovação, Conteúdo, Inteligência Artificial e Imagem',image:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=88',items:[
      {name:'Tecnologia, Inovação e IA',href:'./portais/tecnologia.html'},
      {name:'Computadores, Informática e Games',href:'./portais/computadores.html'},
      {name:'Fotografia, Vídeo e Produção',href:'./portais/fotografia.html'}
    ]},
    {rank:'TOP 06',title:'SAÚDE & BEM-ESTAR',subtitle:'Clínicas, Hospitais, Especialidades e Qualidade de Vida',image:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=88',items:[
      {name:'Saúde e Bem-Estar',href:'./portais/saude-bem-estar.html'},
      {name:'Saúde, Farma e Medicamentos',href:'./portais/farma.html'},
      {name:'Drogarias, Farmácias e Cuidados',href:'./portais/drogarias.html'},
      {name:'Óticas e Saúde Visual',href:'./portais/oticas.html'},
      {name:'Odontologia e Sorriso',href:'./portais/odontologia.html'},
      {name:'Academias, Fitness e Vida Ativa',href:'./portais/fitness.html'}
    ]},
    {rank:'TOP 07',title:'IMÓVEIS, CASA & CONSTRUÇÃO',subtitle:'Mercado Imobiliário, Arquitetura, Reforma e Moradia',image:'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=88',items:[
      {name:'Construção, Imóveis e Cidades',href:'./portais/imoveis.html'},
      {name:'Casa, Móveis e Decoração',href:'./portais/casa.html'},
      {name:'Construção, Reforma e Materiais',href:'./portais/reforma.html'},
      {name:'Condomínios e Serviços Residenciais',href:'./portais/condominios.html'}
    ]},
    {rank:'TOP 08',title:'TURISMO, HOTELARIA & GASTRONOMIA',subtitle:'Destinos, Hotéis, Restaurantes e Experiências',image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=88',items:[
      {name:'Turismo, Voos e Destinos',href:'./portais/turismo.html'},
      {name:'Hotéis, Resorts e Eventos',href:'./portais/hoteis.html'},
      {name:'Gastronomia e Restaurantes',href:'./portais/gastronomia-negocios.html'},
      {name:'Adegas, Vinhos e Bebidas',href:'./portais/adegas.html'}
    ]},
    {rank:'TOP 09',title:'EDUCAÇÃO, CARREIRAS & CULTURA',subtitle:'Ensino, Oportunidades, Conhecimento e Cultura',image:'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=88',items:[
      {name:'Educação, Ensino e Carreiras',href:'./portais/educacao.html'},
      {name:'Cursos, Escolas e Idiomas',href:'./portais/cursos.html'},
      {name:'Cultura, Arte e Entretenimento',href:'./portais/cultura.html'}
    ]},
    {rank:'TOP 10',title:'ESTILO, ESPORTE & EXPERIÊNCIAS',subtitle:'Moda, Beleza, Esporte, Eventos e Lifestyle',image:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=88',items:[
      {name:'Moda, Calçados e Acessórios',href:'./portais/moda.html'},
      {name:'Beleza, Estética e Salões',href:'./portais/beleza.html'},
      {name:'Pet, Veterinária e Mundo Animal',href:'./portais/pet.html'},
      {name:'Esportes, Olimpíadas e Ligas',href:'./portais/esportes.html'},
      {name:'Casamentos, Festas e Eventos',href:'./portais/festas.html'}
    ]}
  ];

  function instalarEstilos(){
    if(document.getElementById('voznews-top10-style'))return;
    const style=document.createElement('style');
    style.id='voznews-top10-style';
    style.textContent=`
      #ecossistema{background:radial-gradient(circle at 10% 5%,rgba(105,184,255,.12),transparent 28%),radial-gradient(circle at 90% 12%,rgba(212,175,55,.12),transparent 25%),linear-gradient(180deg,#071526,#081a2d)}
      #ecossistema .section-head{max-width:1000px;text-align:center;margin-left:auto;margin-right:auto}
      #ecossistema .section-head h2{font-size:clamp(38px,5.2vw,72px);letter-spacing:-1.8px}
      #ecossistema .section-head p{max-width:900px;margin-left:auto;margin-right:auto;font-size:20px}
      .top10-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px;margin-top:34px}
      .top10-card{appearance:none;width:100%;padding:0;text-align:left;color:#fff;background:linear-gradient(145deg,#0b233d,#0d2f50);border:1px solid rgba(212,175,55,.48);border-radius:28px;overflow:hidden;cursor:pointer;box-shadow:0 24px 70px rgba(0,0,0,.34);transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease;font:inherit}
      .top10-card:hover{transform:translateY(-7px);box-shadow:0 34px 90px rgba(0,0,0,.48),0 0 28px rgba(212,175,55,.12);border-color:rgba(255,215,0,.78)}
      .top10-visual{position:relative;aspect-ratio:16/10;overflow:hidden;background:#102b49}
      .top10-visual:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(3,14,26,.02) 20%,rgba(3,14,26,.28) 58%,rgba(3,14,26,.88) 100%)}
      .top10-visual img{width:100%;height:100%;object-fit:cover;filter:brightness(1.12) saturate(1.06) contrast(1.02);transform:scale(1.015)}
      .top10-rank{position:absolute;z-index:2;left:22px;top:20px;padding:9px 15px;border-radius:999px;background:linear-gradient(135deg,#ffe36a,#c89600);color:#071526;font-weight:1000;letter-spacing:1.1px;box-shadow:0 8px 24px rgba(0,0,0,.3)}
      .top10-count{position:absolute;z-index:2;right:20px;top:20px;padding:8px 12px;border-radius:999px;background:rgba(6,20,35,.78);border:1px solid rgba(255,255,255,.24);backdrop-filter:blur(8px);font-size:13px;font-weight:900}
      .top10-visual-title{position:absolute;z-index:2;left:22px;right:22px;bottom:20px;font-size:clamp(25px,2.4vw,38px);line-height:1.02;font-weight:1000;text-shadow:0 4px 18px rgba(0,0,0,.75)}
      .top10-body{padding:22px 24px 26px}
      .top10-body p{font-size:17px!important;line-height:1.45!important;margin:0 0 18px;color:#e9f2fb!important}
      .top10-open{display:inline-flex;align-items:center;gap:8px;color:#ffd74a;font-weight:1000}
      .top10-note{margin-top:28px;padding:20px 22px;border:1px solid rgba(212,175,55,.36);border-radius:22px;background:rgba(255,255,255,.055);color:#dce7f5;line-height:1.5}
      .top10-note strong{color:#ffd74a}
      .top10-modal{position:fixed;inset:0;z-index:10050;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(1,8,16,.82);backdrop-filter:blur(14px)}
      .top10-modal.open{display:flex}
      .top10-dialog{width:min(880px,96vw);max-height:88vh;overflow:auto;border-radius:30px;background:linear-gradient(145deg,#0a1d34,#0b2d4d);border:1px solid rgba(212,175,55,.52);box-shadow:0 40px 120px rgba(0,0,0,.58);padding:30px}
      .top10-dialog-head{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:18px}
      .top10-dialog-rank{display:inline-flex;padding:7px 12px;border-radius:999px;background:#d4af37;color:#071526;font-weight:1000;margin-bottom:10px}
      .top10-dialog h3{font-size:clamp(30px,4vw,52px);line-height:1.02;margin:0;color:#fff}
      .top10-dialog-sub{color:#dce7f5;margin-top:10px;font-size:18px}
      .top10-close{border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.08);color:#fff;width:48px;height:48px;border-radius:50%;font-size:28px;cursor:pointer;flex:0 0 auto}
      .top10-links{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:24px}
      .top10-link{display:block;padding:18px 19px;border-radius:18px;background:rgba(255,255,255,.07);border:1px solid rgba(212,175,55,.23);font-weight:900;line-height:1.25;transition:.18s ease}
      .top10-link:hover{background:rgba(212,175,55,.15);border-color:rgba(255,215,0,.6);transform:translateY(-2px)}
      .top10-link span{display:block;margin-top:7px;color:#ffd74a;font-size:13px}
      @media(max-width:860px){.top10-grid,.top10-links{grid-template-columns:1fr}.top10-visual{aspect-ratio:16/11}.top10-dialog{padding:24px}}
      @media(prefers-reduced-motion:reduce){.top10-card,.top10-link{transition:none}.top10-card:hover,.top10-link:hover{transform:none}}
    `;
    document.head.appendChild(style);
  }

  function criarModal(){
    let modal=document.getElementById('voznews-top10-modal');
    if(modal)return modal;
    modal=document.createElement('div');
    modal.id='voznews-top10-modal';
    modal.className='top10-modal';
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML='<div class="top10-dialog" role="dialog" aria-modal="true" aria-labelledby="voznews-top10-title"><div class="top10-dialog-head"><div><span class="top10-dialog-rank"></span><h3 id="voznews-top10-title"></h3><p class="top10-dialog-sub"></p></div><button class="top10-close" type="button" aria-label="Fechar">×</button></div><div class="top10-links"></div></div>';
    document.body.appendChild(modal);
    const fechar=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';};
    modal.querySelector('.top10-close').addEventListener('click',fechar);
    modal.addEventListener('click',e=>{if(e.target===modal)fechar();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))fechar();});
    return modal;
  }

  function abrirGrupo(index){
    const grupo=grupos[index];
    if(!grupo)return;
    const modal=criarModal();
    modal.querySelector('.top10-dialog-rank').textContent=grupo.rank;
    modal.querySelector('#voznews-top10-title').textContent=grupo.title;
    modal.querySelector('.top10-dialog-sub').textContent=grupo.subtitle+' — escolha uma das áreas abaixo.';
    modal.querySelector('.top10-links').innerHTML=grupo.items.map(item=>`<a class="top10-link" href="${item.href}">${item.name}<span>Abrir conteúdo →</span></a>`).join('');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  }

  function transformarEcossistema(){
    const sec=document.getElementById('ecossistema');
    if(!sec||sec.dataset.voznewsTop10==='true')return;
    const head=sec.querySelector('.section-head');
    const grid=sec.querySelector('.eco-portal-grid');
    if(!head||!grid)return;
    sec.dataset.voznewsTop10='true';
    instalarEstilos();

    const badge=head.querySelector('.badge');
    const h2=head.querySelector('h2');
    const p=head.querySelector('p');
    if(badge)badge.textContent='VOZ NEWS BRASIL • PORTAL NOTA 10';
    if(h2)h2.innerHTML='VOZ NEWS BRASIL — <span class="gold">O PORTAL NOTA 10</span><br/>10 grandes verticais. Um ecossistema completo.';
    if(p)p.innerHTML='Os <strong>40 mercados especializados continuam preservados</strong>, agora organizados em apenas <strong>10 grandes módulos TOP 10</strong>. Mais simples para navegar, mais forte para comunicar e muito mais fácil de apresentar comercialmente.';

    grid.className='top10-grid';
    grid.innerHTML=grupos.map((g,i)=>`<button class="top10-card" type="button" data-top10-index="${i}" aria-label="Abrir ${g.title}"><div class="top10-visual"><img alt="${g.title}" loading="lazy" src="${g.image}"/><span class="top10-rank">${g.rank}</span><span class="top10-count">${g.items.length} módulos</span><strong class="top10-visual-title">${g.title}</strong></div><div class="top10-body"><p>${g.subtitle}.</p><span class="top10-open">Explorar módulos →</span></div></button>`).join('');
    grid.querySelectorAll('[data-top10-index]').forEach(btn=>btn.addEventListener('click',()=>abrirGrupo(Number(btn.dataset.top10Index))));

    const disclaimer=sec.querySelector('.eco-disclaimer');
    if(disclaimer){
      disclaimer.className='top10-note';
      disclaimer.innerHTML='<strong>PORTAL NOTA 10:</strong> os 40 conteúdos e páginas continuam disponíveis. A diferença é que agora o visitante entra por 10 grandes verticais e encontra, dentro de cada uma, os módulos relacionados.';
    }

    const meta=document.querySelector('meta[property="og:description"]');
    if(meta)meta.setAttribute('content','VOZ NEWS BRASIL — Portal Nota 10: 10 grandes verticais reunindo 40 mercados especializados.');
    const desc=document.querySelector('meta[name="description"]');
    if(desc)desc.setAttribute('content','VOZ NEWS BRASIL — Portal Nota 10 com 10 grandes verticais de informação, negócios, autoridade e visibilidade.');
  }

  function atualizarMobilidade(){
    const sec=document.getElementById('automoveis');
    if(!sec)return;
    const card=[...sec.querySelectorAll('.visual-card')].find(el=>/BARCOS, MOTOS E MOBILIDADE/i.test(el.textContent||''));
    if(card){
      const h3=card.querySelector('h3');
      const p=card.querySelector('p');
      const img=card.querySelector('img');
      if(h3)h3.textContent='BARCOS, MOTOS, AERONAVES E MOBILIDADE: UM MERCADO INTEIRO PARA ANUNCIAR';
      if(p)p.textContent='Concessionárias, revendas, locadoras, motos, bikes, náutica, aviação, oficinas, seguros, peças, acessórios e serviços em uma vitrine comercial de alto impacto.';
      if(img)img.alt='Barcos, motos, aeronaves e mobilidade';
    }
    const note=sec.querySelector('.cta-note');
    if(note)note.textContent='Concessionárias, revendas, locadoras, oficinas, empresas náuticas, aviação, aeronaves e serviços do setor aéreo com apresentação editorial e espaço comercial.';
    const btn=sec.querySelector('.cta-actions .btn-gold');
    if(btn)btn.textContent='Anuncie sua empresa';
  }

  function iniciar(){transformarEcossistema();atualizarMobilidade();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',iniciar,{once:true});
  else iniciar();
})();