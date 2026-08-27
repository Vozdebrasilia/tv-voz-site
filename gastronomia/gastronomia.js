(() => {
  const directory = [
    {name:'Mané Mercado',city:'Brasília',country:'Brasil',cuisine:'Complexo gastronômico e experiências',address:'Arena BRB Mané Garrincha, Brasília',phone:'',url:'/gastronomia/materias/mane-mercado.html',image:'https://mane.com.vc/_next/image?q=75&url=%2Fimages%2Fhero2.jpg&w=1920',note:'Destaque premium da Voz News: múltiplas cozinhas, variedade de experiências e forte apelo para grupos e famílias.',tier:'sponsored'},
    {name:'Vasto Restaurante',city:'Brasília',country:'Brasil',cuisine:'Carnes nobres, sushi e contemporânea',address:'SCN Q. 5, Loja 84L, Brasília Shopping, Asa Norte',phone:'(61) 99256-8873',url:'https://brasiliashopping.com.br/lojas/vasto-restaurante',image:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',note:'No acervo da TV Voz, Deijanete e Paulo registram ambiente elegante, serviço refinado e pratos de forte apelo visual.',tier:'editorial'},
    {name:'Coco Bambu',city:'Brasília',country:'Brasil',cuisine:'Frutos do mar e cozinha brasileira',address:'SCES Trecho 2, Ícone Parque, Conjunto 36, Asa Sul',phone:'(61) 3224-5585',url:'https://cocobambu.com/',image:'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=1200&q=85',note:'Pratos generosos, frutos do mar e apresentação marcante fazem da casa uma das referências lembradas da capital.',tier:'editorial'},
    {name:'Mangai',city:'Brasília',country:'Brasil',cuisine:'Brasileira e nordestina',address:'SCE Sul, s/n, Lote 2, Asa Sul, Brasília',phone:'(61) 3252-0156',url:'https://www.instagram.com/mangairestaurantes/',image:'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85',note:'Comida brasileira com alma nordestina, buffet farto e ambiente que transforma a refeição em experiência de memória e acolhimento.',tier:'editorial'},
    {name:'Piselli Brasília',city:'Brasília',country:'Brasil',cuisine:'Italiana',address:'Shopping Iguatemi, Piso Térreo, Lago Norte',phone:'(61) 99913-7191',url:'https://piselli.com.br/',image:'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85',note:'Cozinha italiana de alto padrão, carta de vinhos e atmosfera elegante para almoço executivo ou jantar especial.',tier:'editorial'},
    {name:'Rubaiyat Brasília',city:'Brasília',country:'Brasil',cuisine:'Carnes e gastronomia premium',address:'SCES Trecho 1, Brasília',phone:'(61) 3443-5000',url:'https://rubaiyat.com.br/',image:'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',note:'Cortes especiais, apresentação cuidadosa e ambiente de alto padrão colocam o endereço entre os destinos gastronômicos premium da cidade.',tier:'editorial'},
    {name:'Kubitschek Plaza Hotel',city:'Brasília',country:'Brasil',cuisine:'Hotel, gastronomia e eventos',address:'SHN Quadra 02 Bloco E, Setor Hoteleiro Norte',phone:'(61) 3319-3543',url:'https://plazabrasilia.com.br/',image:'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',note:'Espaço tradicional da capital para hospedagem, gastronomia, eventos e encontros institucionais.',tier:'editorial'},
    {name:'Pastelaria Viçosa',city:'Brasília',country:'Brasil',cuisine:'Pastelaria e comida popular',address:'Rodoviária do Plano Piloto, Brasília',phone:'',url:'/gastronomia/materias/pastelaria-vicosa.html',image:'https://3.bp.blogspot.com/-KqQuhbEFDJw/VbwBueyx4yI/AAAAAAAANws/kSiQ0DYzROE/s1600/pastelaria-2.jpg',note:'Pastel, caldo de cana e a pressa da Rodoviária: um endereço popular que atravessa gerações e integra a memória afetiva da capital.',tier:'editorial'}
  ];

  const tierWeight = {sponsored:0,partner:1,editorial:2};
  const acceptanceCopy = 'Sabores de Brasília e do Cerrado';
  const normalize = value => (value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const esc = value => String(value || '').replace(/[&<>"']/g,ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const sortedDirectory = () => [...directory].sort((a,b)=>(tierWeight[a.tier]??9)-(tierWeight[b.tier]??9));
  const featured = document.getElementById('featured-restaurants');
  const results = document.getElementById('search-results');
  const form = document.getElementById('restaurant-search');
  const termInput = document.getElementById('search-term');
  const locationInput = document.getElementById('search-location');

  function tierBadge(item){
    if(item.tier==='sponsored') return '<span class="badge sponsor">⭐ PATROCINADO • PRIORIDADE</span>';
    if(item.tier==='partner') return '<span class="badge partner">🤝 PARCEIRO VOZ NEWS</span>';
    return '<span class="badge partner">GUIA EDITORIAL</span>';
  }

  function renderFeatured(){
    if(!featured) return;
    featured.innerHTML = sortedDirectory().map(item=>`
      <article class="card">
        <div class="card-media"><img loading="lazy" src="${esc(item.image)}" alt="${esc(item.name)}"/></div>
        <div class="card-body">
          ${tierBadge(item)}
          <span class="label">GUIA VOZ NEWS • BRASÍLIA</span>
          <h3>${esc(item.name)}</h3>
          <p>${esc(item.note)}</p>
          <div class="meta"><strong>${esc(item.cuisine)}</strong><br>${esc(item.address)}${item.phone?`<br>${esc(item.phone)}`:''}</div>
          <div class="comment-mini"><strong>Voz News:</strong> cada estabelecimento do guia recebe contexto editorial; anunciantes têm prioridade comercial e acesso direto ao conteúdo patrocinado.</div>
          <a class="cta ${item.tier==='sponsored'?'primary':''}" href="${esc(item.url)}" ${/^https?:/.test(item.url)?'target="_blank" rel="noopener"':''}>${item.tier==='sponsored'?'ABRIR ANÚNCIO / DESTAQUE':item.name==='Pastelaria Viçosa'?'LER MATÉRIA + AVALIAÇÃO':'CONHECER RESTAURANTE'}</a>
        </div>
      </article>`).join('');
  }

  function localMatches(term,location){
    const t=normalize(term),l=normalize(location);
    return sortedDirectory().filter(item=>{
      const hay=normalize([item.name,item.cuisine,item.city,item.country,item.address,item.note].join(' '));
      const locationHay=normalize([item.city,item.country,item.address].join(' '));
      return (!t||hay.includes(t))&&(!l||locationHay.includes(l)||l.includes(normalize(item.city))||l.includes(normalize(item.country)));
    });
  }

  function localCard(item){
    const tierClass=item.tier==='sponsored'?' sponsored':'';
    const badge=item.tier==='sponsored'?'<span class="badge sponsor">⭐ PATROCINADO • PRIMEIRO</span>':item.tier==='partner'?'<span class="badge partner">🤝 PARCEIRO</span>':'<span class="badge partner">GUIA VOZ NEWS</span>';
    const action=item.tier==='sponsored'?'ABRIR ANÚNCIO / DESTAQUE →':'VER RESTAURANTE →';
    return `<div class="result${tierClass}">${badge}<strong>${esc(item.name)}</strong><small>${esc(item.cuisine)}</small><p>${esc(item.address)}${item.phone?`<br>${esc(item.phone)}`:''}</p><a href="${esc(item.url)}" ${/^https?:/.test(item.url)?'target="_blank" rel="noopener"':''}>${action}</a></div>`;
  }

  function externalCard(item){
    return `<div class="result"><span class="badge partner">📍 RESULTADO PÚBLICO</span><strong>${esc(item.name||'Restaurante')}</strong><small>${esc(item.cuisine||'Restaurante')}</small><p>${esc(item.address||'Endereço não informado')}</p>${item.mapUrl?`<a href="${esc(item.mapUrl)}" target="_blank" rel="noopener">ABRIR LOCALIZAÇÃO →</a>`:''}</div>`;
  }

  async function runSearch(term,location){
    if(!results) return;
    const local=localMatches(term,location);
    results.innerHTML=local.map(localCard).join('')+'<div class="search-status">Ampliando a busca para restaurantes públicos da região…</div>';
    try{
      const url=`/api/restaurants?term=${encodeURIComponent(term||'')}&location=${encodeURIComponent(location||'Brasília, DF, Brasil')}`;
      const response=await fetch(url,{headers:{Accept:'application/json'}});
      const payload=await response.json();
      if(!response.ok) throw new Error(payload.error||'Falha na busca');
      const external=Array.isArray(payload.results)?payload.results:[];
      const known=new Set(local.map(item=>normalize(item.name)));
      const fresh=external.filter(item=>!known.has(normalize(item.name))).slice(0,18);
      results.innerHTML=(local.map(localCard).join('')+fresh.map(externalCard).join(''))||'<div class="search-status">Nenhum restaurante encontrado. Tente outro nome, cozinha ou localidade.</div>';
    }catch(error){
      results.innerHTML=local.map(localCard).join('')+`<div class="search-status">${local.length?'Mostrando o acervo Voz News. ':''}A busca mundial está temporariamente indisponível. Tente novamente em instantes.</div>`;
    }
  }

  if(form){
    form.addEventListener('submit',event=>{
      event.preventDefault();
      runSearch(termInput?.value||'',locationInput?.value||'Brasília, DF, Brasil');
    });
  }

  document.querySelectorAll('[data-search]').forEach(link=>link.addEventListener('click',()=>{
    const [term,location]=(link.dataset.search||'').split('|');
    if(termInput) termInput.value=term||'';
    if(locationInput) locationInput.value=location||'';
    setTimeout(()=>runSearch(termInput?.value||'',locationInput?.value||''),50);
  }));

  const params=new URLSearchParams(window.location.search);
  if(params.get('envio')==='recebido'){
    const community=document.getElementById('community-form');
    if(community){
      const notice=document.createElement('div');
      notice.style.cssText='margin:0 0 14px;padding:12px 14px;border-radius:12px;background:#e7f8e7;border:1px solid #9bd09b;color:#164b22;font-weight:800;line-height:1.4';
      notice.textContent='Recebemos seu envio. O conteúdo seguirá para análise editorial antes de qualquer publicação.';
      community.prepend(notice);
    }
  }

  async function hydrateFictionalTeenPortraits(){
    const cards=Array.from(document.querySelectorAll('#adolescentes .teen-card'));
    const portraits=[
      {file:'/gastronomia/media/paulo-jovem-ficticio.b64',alt:'Paulo, personagem jovem fictício da editoria de gastronomia'},
      {file:'/gastronomia/media/isabella-jovem-ficticia.b64',alt:'Isabella, personagem jovem fictícia da editoria de gastronomia'}
    ];
    await Promise.all(portraits.map(async(portrait,index)=>{
      const card=cards[index]; if(!card) return;
      const response=await fetch(portrait.file,{cache:'force-cache'});
      if(!response.ok) throw new Error(`Falha ao carregar ${portrait.file}`);
      const base64=(await response.text()).trim();
      const avatar=card.querySelector('.teen-avatar');
      if(!avatar||!base64) return;
      avatar.innerHTML=`<img src="data:image/webp;base64,${base64}" alt="${esc(portrait.alt)}" loading="lazy" decoding="async">`;
      avatar.classList.add('photo-avatar');
      if(!card.querySelector('.fictional-note')){
        const note=document.createElement('small');
        note.className='fictional-note';
        note.textContent='PERSONAGEM FICTÍCIO • imagem sintética, sem relação com pessoa real';
        card.querySelector('h3')?.insertAdjacentElement('afterend',note);
      }
    }));
  }

  function applyVibrantGastronomyTheme(){
    document.querySelectorAll('img[alt="Paulo Fayad"]').forEach(img=>{
      img.src='/studio-paulo-source.png';
      img.style.objectPosition='top center';
    });

    const style=document.createElement('style');
    style.id='voznews-gastronomia-vibrante';
    style.textContent=`
      :root{--tomato:#e53935;--orange:#ff7a00;--sun:#ffb703;--leaf:#2a9d55;--warm-bg:#fff8f1;--warm-card:#ffffff;--peach:#fff0e4;--rose:#ffe5e2;--ink:#3a211c;--soft-ink:#71554d;--warm-line:rgba(229,57,53,.20)}
      body{color:var(--ink)!important;background:linear-gradient(180deg,#fffaf6 0%,var(--warm-bg) 45%,#fff3e8 100%)!important}
      .header{background:rgba(255,252,248,.97)!important;border-bottom:4px solid var(--tomato)!important;box-shadow:0 8px 30px rgba(140,50,25,.10)!important}
      .nav a{color:var(--ink)!important;border-color:rgba(229,57,53,.22)!important;background:#fff!important}.nav a:hover{background:var(--tomato)!important;color:#fff!important;border-color:var(--tomato)!important}
      .hero:before{background:linear-gradient(90deg,rgba(105,22,12,.78),rgba(184,51,23,.34) 48%,rgba(255,122,0,.06)),url('https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=2000&q=92') center/cover!important;filter:saturate(1.25) brightness(1.08)}
      .hero:after{background:radial-gradient(circle at 76% 28%,rgba(255,183,3,.30),transparent 30%)!important}.hero{border-bottom:5px solid var(--orange)!important}
      .hero h1,.hero p{color:#fff!important;text-shadow:0 3px 18px rgba(88,24,8,.36)}.hero h1 span{color:#ffd166!important}.eyebrow{background:rgba(255,255,255,.92)!important;color:var(--tomato)!important;border-color:#fff!important}.chips span{background:rgba(255,255,255,.90)!important;color:#6c2519!important;border-color:rgba(255,255,255,.95)!important}.hero-actions a:first-child{background:linear-gradient(135deg,var(--tomato),var(--orange))!important;color:#fff!important}.hero-actions a:nth-child(2){background:#fff!important;color:var(--tomato)!important;border-color:#fff!important}
      .metrics{background:#fff!important;border-bottom:1px solid var(--warm-line)!important}.metric{background:linear-gradient(145deg,#fff,#fff3e7)!important;border-color:var(--warm-line)!important;box-shadow:0 10px 28px rgba(126,51,25,.08)}.metric strong{color:var(--tomato)!important}.metric span{color:var(--soft-ink)!important}
      .section.alt{background:linear-gradient(135deg,#fff0e4,#fff8ef)!important}.section h2{color:var(--ink)!important}.section-head p,.copy{color:var(--soft-ink)!important}.kicker{color:var(--tomato)!important}
      .editor-card,.search-card,.teen-card,.card,.analysis-card,.person-card,.event,.rank-card{background:var(--warm-card)!important;color:var(--ink)!important;border-color:var(--warm-line)!important;box-shadow:0 16px 42px rgba(133,55,27,.10)!important}
      .editor-card small,.label,.person strong,.person-card strong,.event b,.rank-card strong{color:var(--tomato)!important}.editor-card p,.teen-card p,.card p,.analysis-card blockquote,.person-card span,.event p,.rank-card span,.meta,.search-help,.search-status{color:var(--soft-ink)!important}.quote-chip,.comment-mini{background:#fff1e8!important;color:#6c372a!important;border-color:rgba(255,122,0,.20)!important}.comment-mini strong{color:var(--tomato)!important}
      .search-card{background:linear-gradient(135deg,#fff,#fff0e4)!important;border:2px solid rgba(229,57,53,.28)!important}.search-title span{color:var(--tomato)!important}.search-form input{border:2px solid #ffd0c8!important;color:var(--ink)!important;background:#fff!important}.search-form button{background:linear-gradient(135deg,var(--tomato),var(--orange))!important;color:#fff!important;border:0!important}.priority-note span{background:#fff!important;color:#7d3b2d!important;border-color:#ffd2c9!important}.result{background:#fff!important;color:var(--ink)!important;border-color:#ffd7cf!important;box-shadow:0 10px 24px rgba(128,48,24,.07)}.result p{color:var(--soft-ink)!important}.result small,.result a{color:var(--tomato)!important}.result.sponsored{background:#fff8df!important;border-color:var(--sun)!important}.badge.sponsor{background:var(--sun)!important;color:#6b3700!important}.badge.partner{background:#ffe8e1!important;color:#8b2d20!important}.badge.young{background:linear-gradient(135deg,#ff5678,#ff9f1c)!important;color:#fff!important}
      .teen-shell:before{background:radial-gradient(circle at 10% 10%,rgba(255,86,120,.14),transparent 28%),radial-gradient(circle at 90% 20%,rgba(255,159,28,.15),transparent 28%)!important}.teen-avatar{background:linear-gradient(135deg,#ff5678,var(--orange))!important}.teen-tags span{background:#fff0e6!important;color:#8a3a28!important}.fictional-note{color:#967066!important}
      .premium-ad{background:linear-gradient(135deg,#fff4e6,#ffe1d7)!important;color:var(--ink)!important;border:2px solid rgba(255,122,0,.25)!important}.ad-copy p{color:var(--soft-ink)!important}.ad-flag{background:var(--tomato)!important;color:#fff!important}.ad-facts span{background:#fff!important;color:#7a3828!important;border-color:#ffc9bd!important}
      .cta{border-color:rgba(229,57,53,.30)!important;color:var(--tomato)!important;background:#fff!important}.cta.primary{background:linear-gradient(135deg,var(--tomato),var(--orange))!important;color:#fff!important}.card-media{background:#ffe7dc!important}
      .cerrado-card{border-color:rgba(42,157,85,.28)!important}.cerrado-card:after{background:linear-gradient(180deg,transparent 28%,rgba(54,35,19,.86) 88%)!important}.cerrado-copy h3,.cerrado-copy p,.cerrado-copy small{color:#fff!important}.media-credit{color:#7b625a!important}
      .video-card,.photo-wall{background:#fff2e8!important;border-color:rgba(229,57,53,.20)!important}.video-card:after{background:var(--tomato)!important;color:#fff!important;border:0!important}.ticker{background:linear-gradient(90deg,var(--tomato),var(--orange),var(--sun))!important;border:0!important}.ticker-track span{color:#fff!important;text-shadow:0 1px 3px rgba(120,30,12,.24)}
      .community{background:linear-gradient(135deg,#ff5a45 0%,#ff8b24 50%,#ffd166 100%)!important}.community .section-head h2,.community .section-head p,.community .kicker{color:#fff!important}.community-pitch{background:rgba(255,255,255,.93)!important;color:var(--ink)!important;border-color:#fff!important}.community-pitch p{color:var(--soft-ink)!important}.challenge{background:#fff7ef!important;color:#7b3323!important;border-color:#ffd2c2!important}.submit-form{background:#fff!important;color:var(--ink)!important}.submit-form button{background:linear-gradient(135deg,var(--tomato),var(--orange))!important;color:#fff!important}.rank-card{background:#fff!important}
      .commercial{background:linear-gradient(135deg,#ffe7dc,#fff2cb)!important;color:var(--ink)!important;border-color:rgba(229,57,53,.24)!important}.commercial p{color:var(--soft-ink)!important}
      .footer{background:#b82722!important;border-top:6px solid var(--orange)!important;color:#fff!important}.footer p{color:#ffe8df!important}.footer-links a{color:#ffd166!important}
      .photo-avatar{background:#ffe7dc!important}
      @media(max-width:680px){.header{border-bottom-width:3px!important}.hero{min-height:600px!important}}
    `;
    document.head.appendChild(style);
  }

  function enableMotion(){
    const style=document.createElement('style');
    style.id='voznews-motion-runtime';
    style.textContent=`
      [data-reveal]{opacity:0;transform:translate3d(0,26px,0) scale(.985);transition:opacity .72s ease,transform .72s cubic-bezier(.2,.7,.2,1);transition-delay:var(--reveal-delay,0ms);will-change:opacity,transform}
      [data-reveal].is-visible{opacity:1;transform:translate3d(0,0,0) scale(1)}
      [data-parallax]{transform:translate3d(0,var(--parallax-y,0px),0);transition:transform .08s linear;will-change:transform}
      .card,.teen-card,.editor-card,.analysis-card,.event,.result,.rank-card{transition:transform .32s ease,box-shadow .32s ease,border-color .32s ease}
      .card:hover,.teen-card:hover,.editor-card:hover,.analysis-card:hover,.event:hover,.result:hover,.rank-card:hover{transform:translateY(-7px);box-shadow:0 24px 60px rgba(115,48,25,.18)!important;border-color:rgba(229,57,53,.42)!important}
      .photo-avatar{overflow:hidden;padding:0}.photo-avatar img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;transform:scale(1.03);transition:transform .55s ease}.teen-card:hover .photo-avatar img{transform:scale(1.11)}
      .search-form button,.cta,.submit-form button{position:relative;overflow:hidden;isolation:isolate}.search-form button:after,.cta.primary:after,.submit-form button:after{content:"";position:absolute;inset:-120% auto -120% -45%;width:34%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.52),transparent);transform:rotate(14deg);animation:vozShine 4.8s ease-in-out infinite;z-index:-1}@keyframes vozShine{0%,68%{left:-45%}88%,100%{left:125%}}
      @media(prefers-reduced-motion:reduce){[data-reveal],[data-reveal].is-visible,[data-parallax],.card,.teen-card,.editor-card,.analysis-card,.event,.result,.rank-card,.photo-avatar img{opacity:1!important;transform:none!important;transition:none!important;animation:none!important}.search-form button:after,.cta.primary:after,.submit-form button:after{display:none!important}}
    `;
    document.head.appendChild(style);
    const revealTargets=document.querySelectorAll('.section-head,.editor-card,.search-card,.card,.teen-card,.premium-ad,.cerrado-card,.motion-wall,.analysis-card,.person-card,.event,.community-pitch,.submit-form,.commercial');
    revealTargets.forEach((element,index)=>{element.setAttribute('data-reveal','');element.style.setProperty('--reveal-delay',`${Math.min((index%6)*55,275)}ms`)});
    const parallaxTargets=[document.querySelector('.hero-content'),document.querySelector('.community-pitch')].filter(Boolean);
    parallaxTargets.forEach(element=>element.setAttribute('data-parallax',''));
    const reducedMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reducedMotion){revealTargets.forEach(element=>element.classList.add('is-visible'));return}
    if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.12,rootMargin:'0px 0px -7% 0px'});revealTargets.forEach(element=>observer.observe(element))}else revealTargets.forEach(element=>element.classList.add('is-visible'));
    let ticking=false;
    const updateParallax=()=>{parallaxTargets.forEach(element=>{const rect=element.getBoundingClientRect();const centerDelta=(window.innerHeight/2)-(rect.top+rect.height/2);const offset=Math.max(-18,Math.min(18,centerDelta*.022));element.style.setProperty('--parallax-y',`${offset.toFixed(1)}px`)});ticking=false};
    const requestParallax=()=>{if(ticking)return;ticking=true;requestAnimationFrame(updateParallax)};
    window.addEventListener('scroll',requestParallax,{passive:true});window.addEventListener('resize',requestParallax,{passive:true});requestParallax();
  }

  if(!acceptanceCopy) return;
  applyVibrantGastronomyTheme();
  renderFeatured();
  if(results) results.innerHTML=sortedDirectory().slice(0,3).map(localCard).join('')+'<div class="search-status">Digite um nome, cozinha ou destino para pesquisar.</div>';
  enableMotion();
  hydrateFictionalTeenPortraits().catch(error=>console.warn('[gastronomia] personagens jovens:',error.message));
})();
