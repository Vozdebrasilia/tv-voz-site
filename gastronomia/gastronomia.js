(() => {
  const API_URL = '/api/restaurants';
  const CATALOG_URL = '/gastronomia/data/restaurants.json';
  const acceptanceCopy = 'Sabores de Brasília e do Cerrado';
  const editorialLegacy = ['Rubaiyat Brasília','Kubitschek Plaza Hotel','Pastelaria Viçosa'];
  const tierWeight = {sponsored:0,partner:1,editorial:2,public:3};
  const featured = document.getElementById('featured-restaurants');
  const results = document.getElementById('search-results');
  const form = document.getElementById('restaurant-search');
  const termInput = document.getElementById('search-term');
  const locationInput = document.getElementById('search-location');
  let catalogPromise;

  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
  const esc = value => String(value || '').replace(/[&<>"']/g,ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function loadCatalog(){
    if(!catalogPromise){
      catalogPromise = fetch(CATALOG_URL,{cache:'force-cache'})
        .then(response => { if(!response.ok) throw new Error('Catálogo Voz News indisponível'); return response.json(); })
        .then(data => Array.isArray(data) ? data : []);
    }
    return catalogPromise;
  }

  function localMatches(catalog,term,location){
    const t=normalize(term), l=normalize(location);
    return catalog.filter(item=>{
      const loc=normalize([item.city,item.state,item.country].filter(Boolean).join(' '));
      const city=normalize(item.city), state=normalize(item.state), country=normalize(item.country);
      const locationOk=!l || loc.includes(l) || (city && l.includes(city)) || (state && l.includes(state)) || (country && l.includes(country));
      const hay=normalize([item.name,item.cuisine,item.category,item.profile,...(Array.isArray(item.tags)?item.tags:[])].join(' '));
      return locationOk && (!t || hay.includes(t));
    }).sort((a,b)=>{
      const tier=(tierWeight[a.tier]??9)-(tierWeight[b.tier]??9);
      if(tier) return tier;
      const featuredOrder=Number(Boolean(b.featured))-Number(Boolean(a.featured));
      if(featuredOrder) return featuredOrder;
      return String(a.name).localeCompare(String(b.name),'pt-BR');
    });
  }

  function badgeFor(item){
    if(item.tier==='sponsored') return '<span class="badge sponsor">⭐ PATROCINADO • PRIMEIRO</span>';
    if(item.tier==='partner') return '<span class="badge partner">🤝 PARCEIRO VOZ NEWS</span>';
    if(item.source==='public' || item.tier==='public') return '<span class="badge public-badge">📍 RESULTADO PÚBLICO</span>';
    return '<span class="badge partner">🍽️ SELEÇÃO VOZ NEWS</span>';
  }

  function resultCard(item){
    const href=item.url || item.mapUrl || '';
    const place=[item.city,item.state,item.country].filter(Boolean).join(', ');
    const address=item.address || place || 'Localização disponível no mapa';
    const tierClass=item.tier==='sponsored'?' sponsored':'';
    const action=item.tier==='sponsored'?'ABRIR DESTAQUE →':item.source==='public'?'ABRIR LOCALIZAÇÃO →':'VER NO MAPA →';
    return `<article class="result${tierClass}">${badgeFor(item)}<strong>${esc(item.name||'Restaurante')}</strong><small>${esc(item.cuisine||item.category||'Gastronomia')}</small><p>${esc(address)}</p>${item.priceBand?`<div class="guide-meta">FAIXA ${esc(item.priceBand)}</div>`:''}${href?`<a href="${esc(href)}" target="_blank" rel="noopener">${action}</a>`:''}</article>`;
  }

  function renderResults(items,statusText=''){
    if(!results) return;
    const body=items.slice(0,30).map(resultCard).join('');
    const status=statusText?`<div class="search-status">${esc(statusText)}</div>`:'';
    results.innerHTML=body+status || '<div class="search-status">Nenhum restaurante encontrado. Tente outro nome, cozinha ou destino.</div>';
  }

  function mergeUnique(primary,secondary){
    const seen=new Set();
    return [...primary,...secondary].filter(item=>{
      const key=normalize(item.name);
      if(!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  async function runSearch(term,location){
    if(!results) return;
    const targetLocation=location || 'Brasília, DF, Brasil';
    results.innerHTML='<div class="search-status"><b>GUIA VOZ NEWS:</b> pesquisando no índice próprio…</div>';
    let own=[];
    try{
      const catalog=await loadCatalog();
      own=localMatches(catalog,term,targetLocation);
      renderResults(own, own.length ? 'Resultados do índice Voz News carregados. Ampliando a busca pública…' : 'Ampliando a busca pública…');
    }catch(error){
      results.innerHTML='<div class="search-status">Consultando a busca pública…</div>';
    }

    try{
      const url=`${API_URL}?term=${encodeURIComponent(term||'')}&location=${encodeURIComponent(targetLocation)}`;
      const response=await fetch(url,{headers:{Accept:'application/json'}});
      const payload=await response.json();
      if(!response.ok) throw new Error(payload.error||'Falha na busca');
      const apiResults=Array.isArray(payload.results)?payload.results:[];
      const merged=mergeUnique(own,apiResults);
      const externalStatus=payload.externalStatus || 'ok';
      const status=externalStatus==='degraded'
        ? `Guia Voz News ativo com ${payload.ownCount||own.length} resultado(s) próprio(s). A fonte pública está momentaneamente limitada.`
        : `${merged.length} resultado(s) encontrados • índice Voz News + cobertura pública.`;
      renderResults(merged,status);
    }catch(error){
      renderResults(own,own.length?'Guia Voz News ativo. A complementação pública está temporariamente indisponível.':'A busca pública está temporariamente indisponível. Tente outro destino.');
    }
  }

  function imageFor(item,index){
    const key=normalize([item.cuisine,item.category].join(' '));
    if(key.includes('ital')) return 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85';
    if(key.includes('japon') || key.includes('sushi')) return 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=85';
    if(key.includes('carne') || key.includes('parrilla')) return 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85';
    if(key.includes('fruto') || key.includes('peixe')) return 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85';
    const images=['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85'];
    return images[index%images.length];
  }

  async function renderFeatured(){
    if(!featured) return;
    try{
      const catalog=await loadCatalog();
      const items=localMatches(catalog,'','Brasília, DF, Brasil').filter(item=>item.featured || item.tier==='sponsored').slice(0,9);
      featured.innerHTML=items.map((item,index)=>`<article class="card"><div class="card-media"><img loading="lazy" src="${imageFor(item,index)}" alt="${esc(item.name)}"/></div><div class="card-body">${badgeFor(item)}<span class="label">GUIA VOZ NEWS • BRASÍLIA</span><h3>${esc(item.name)}</h3><p>${esc(item.profile||'Descubra este endereço no Guia Voz News Gastronomia.')}</p><div class="meta"><strong>${esc(item.cuisine)}</strong><br>${esc([item.city,item.state].filter(Boolean).join(' • '))}</div><a class="cta ${item.tier==='sponsored'?'primary':''}" href="${esc(item.url)}" target="_blank" rel="noopener">${item.tier==='sponsored'?'ABRIR DESTAQUE':'LOCALIZAR RESTAURANTE'}</a></div></article>`).join('');
    }catch(error){
      featured.innerHTML='<div class="search-status">O guia de Brasília será carregado pela busca acima.</div>';
    }
  }

  function injectGuideControls(){
    const searchCard=document.querySelector('.search-card');
    if(!searchCard || document.getElementById('voznews-destinations')) return;
    const box=document.createElement('div');
    box.id='voznews-destinations';
    box.className='guide-discovery';
    box.innerHTML=`
      <div class="guide-criteria"><b>GUIA VOZ NEWS</b><span>COZINHA</span><span>EXPERIÊNCIA</span><span>FAIXA DE PREÇO</span><span>LOCALIZAÇÃO</span></div>
      <div class="destination-group"><strong>DESTINOS NO BRASIL</strong><div class="destination-buttons">
        ${['Brasília, DF, Brasil','São Paulo, SP, Brasil','Rio de Janeiro, RJ, Brasil','Belo Horizonte, MG, Brasil','Salvador, BA, Brasil','Recife, PE, Brasil','Fortaleza, CE, Brasil','Curitiba, PR, Brasil','Porto Alegre, RS, Brasil','Goiânia, GO, Brasil','Florianópolis, SC, Brasil','Belém, PA, Brasil','Manaus, AM, Brasil'].map(v=>`<button type="button" data-search-location="${esc(v)}">${esc(v.split(',')[0])}</button>`).join('')}
      </div></div>
      <div class="destination-group"><strong>DESTINOS NO MUNDO</strong><div class="destination-buttons">
        ${['Nova York, Estados Unidos','Miami, Estados Unidos','Paris, França','Lisboa, Portugal','Roma, Itália','Londres, Reino Unido','Madri, Espanha','Barcelona, Espanha','Buenos Aires, Argentina','Santiago, Chile','Cidade do México, México','Tóquio, Japão','Dubai, Emirados Árabes Unidos','Bangkok, Tailândia'].map(v=>`<button type="button" data-search-location="${esc(v)}">${esc(v.split(',')[0])}</button>`).join('')}
      </div></div>
      <div class="destination-group"><strong>BUSCAR POR ESTILO</strong><div class="destination-buttons cuisine-buttons">
        ${['italiana','sushi','carnes','regional','alta gastronomia','tradicional','frutos do mar'].map(v=>`<button type="button" data-search-term="${esc(v)}">${esc(v.toUpperCase())}</button>`).join('')}
      </div></div>`;
    const priority=searchCard.querySelector('.priority-note');
    (priority||searchCard).insertAdjacentElement('afterend',box);

    box.querySelectorAll('[data-search-location]').forEach(button=>button.addEventListener('click',()=>{
      if(locationInput) locationInput.value=button.dataset.searchLocation;
      runSearch(termInput?.value||'',button.dataset.searchLocation);
      document.getElementById('buscar')?.scrollIntoView({behavior:'smooth',block:'start'});
    }));
    box.querySelectorAll('[data-search-term]').forEach(button=>button.addEventListener('click',()=>{
      if(termInput) termInput.value=button.dataset.searchTerm;
      runSearch(button.dataset.searchTerm,locationInput?.value||'Brasília, DF, Brasil');
    }));
  }

  function injectRenataAuthority(){
    const personalidades=document.getElementById('personalidades');
    if(!personalidades || document.getElementById('renata-autoridade')) return;
    const section=document.createElement('section');
    section.id='renata-autoridade';
    section.className='section authority-section';
    section.innerHTML=`<div class="container"><div class="authority-card"><img src="https://images.metroimg.com/2019/07/12111836/250619-HB-Perfil-da-chef-Renata-La-Porta4.jpg" alt="Renata La Porta"/><div><span class="authority-kicker">REFERÊNCIA EDITORIAL • BRASÍLIA</span><h2>Renata La Porta</h2><h3>Autoridade em Gastronomia e Eventos</h3><p>À frente de uma trajetória ligada à gastronomia de eventos desde 1998, Renata La Porta reúne cozinha, hospitalidade, apresentação e logística em celebrações de diferentes formatos. Em 2026, o Renata La Porta Buffet foi vencedor da categoria <b>Bufê de Festa</b> no <b>Encontro Gastrô Brasília 2026</b>.</p><div class="authority-points"><span>GASTRONOMIA</span><span>EVENTOS</span><span>HOSPITALIDADE</span><span>EXPERIÊNCIA</span></div><a class="cta primary" href="/gastronomia/materias/renata-la-porta.html">LER PERFIL E ANÁLISE →</a></div></div></div>`;
    personalidades.parentNode.insertBefore(section,personalidades);
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
      :root{--tomato:#e53935;--orange:#ff7a00;--sun:#ffb703;--leaf:#2a9d55;--warm-bg:#fff8f1;--warm-card:#fff;--ink:#3a211c;--soft-ink:#71554d;--warm-line:rgba(229,57,53,.20)}
      body{color:var(--ink)!important;background:linear-gradient(180deg,#fffaf6 0%,var(--warm-bg) 46%,#fff2e5 100%)!important}.header{background:rgba(255,252,248,.97)!important;border-bottom:4px solid var(--tomato)!important;box-shadow:0 8px 30px rgba(140,50,25,.10)!important}.nav a{color:var(--ink)!important;background:#fff!important;border-color:rgba(229,57,53,.22)!important}.nav a:hover{background:var(--tomato)!important;color:#fff!important}.hero:before{background:linear-gradient(90deg,rgba(105,22,12,.72),rgba(184,51,23,.25) 48%,rgba(255,122,0,.04)),url('https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=2000&q=92') center/cover!important;filter:saturate(1.25) brightness(1.10)}.hero{border-bottom:5px solid var(--orange)!important}.hero h1,.hero p{color:#fff!important;text-shadow:0 3px 18px rgba(88,24,8,.32)}.hero h1 span{color:#ffd166!important}.eyebrow{background:#fff!important;color:var(--tomato)!important;border-color:#fff!important}.chips span{background:rgba(255,255,255,.92)!important;color:#6c2519!important}.hero-actions a:first-child,.search-form button,.cta.primary,.submit-form button{background:linear-gradient(135deg,var(--tomato),var(--orange))!important;color:#fff!important;border:0!important}.hero-actions a:nth-child(2){background:#fff!important;color:var(--tomato)!important}.metrics{background:#fff!important}.metric{background:linear-gradient(145deg,#fff,#fff3e7)!important;border-color:var(--warm-line)!important}.metric strong,.kicker,.label,.editor-card small,.person strong,.person-card strong,.event b,.rank-card strong{color:var(--tomato)!important}.metric span,.section-head p,.copy,.editor-card p,.teen-card p,.card p,.analysis-card blockquote,.person-card span,.event p,.rank-card span,.meta,.search-help,.search-status{color:var(--soft-ink)!important}.section.alt{background:linear-gradient(135deg,#fff0e4,#fff8ef)!important}.section h2{color:var(--ink)!important}.editor-card,.search-card,.teen-card,.card,.analysis-card,.person-card,.event,.rank-card{background:#fff!important;color:var(--ink)!important;border-color:var(--warm-line)!important;box-shadow:0 16px 42px rgba(133,55,27,.10)!important}.search-card{background:linear-gradient(135deg,#fff,#fff0e4)!important;border:2px solid rgba(229,57,53,.28)!important}.search-form input{border:2px solid #ffd0c8!important;background:#fff!important;color:var(--ink)!important}.priority-note span,.teen-tags span{background:#fff!important;color:#7d3b2d!important;border-color:#ffd2c9!important}.result{background:#fff!important;color:var(--ink)!important;border-color:#ffd7cf!important;box-shadow:0 10px 24px rgba(128,48,24,.07)}.result p{color:var(--soft-ink)!important}.result small,.result a{color:var(--tomato)!important}.result.sponsored{background:#fff8df!important;border-color:var(--sun)!important}.badge.sponsor{background:var(--sun)!important;color:#6b3700!important}.badge.partner{background:#ffe8e1!important;color:#8b2d20!important}.public-badge{background:#eaf6ff!important;color:#17608a!important}.comment-mini,.quote-chip{background:#fff1e8!important;color:#6c372a!important;border-color:rgba(255,122,0,.20)!important}.premium-ad{background:linear-gradient(135deg,#fff4e6,#ffe1d7)!important;color:var(--ink)!important}.ad-copy p{color:var(--soft-ink)!important}.ticker{background:linear-gradient(90deg,var(--tomato),var(--orange),var(--sun))!important;border:0!important}.ticker-track span{color:#fff!important}.community{background:linear-gradient(135deg,#ff5a45 0%,#ff8b24 50%,#ffd166 100%)!important}.community .section-head h2,.community .section-head p,.community .kicker{color:#fff!important}.community-pitch,.submit-form{background:#fff!important;color:var(--ink)!important}.commercial{background:linear-gradient(135deg,#ffe7dc,#fff2cb)!important;color:var(--ink)!important}.commercial p{color:var(--soft-ink)!important}.footer{background:#b82722!important;border-top:6px solid var(--orange)!important;color:#fff!important}.footer p{color:#ffe8df!important}.footer-links a{color:#ffd166!important}
      .guide-discovery{margin-top:22px;padding:20px;border-radius:22px;background:#fff;border:1px solid #ffd4ca;box-shadow:0 12px 30px rgba(120,45,20,.08)}.guide-criteria{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:18px}.guide-criteria b{color:var(--tomato);margin-right:8px}.guide-criteria span{font-size:10px;font-weight:900;padding:7px 10px;border-radius:999px;background:#fff0e8;color:#713425}.destination-group{margin-top:14px}.destination-group>strong{display:block;color:var(--ink);font-size:12px;margin-bottom:8px}.destination-buttons{display:flex;gap:7px;flex-wrap:wrap}.destination-buttons button{border:1px solid #ffc6b8;background:#fff9f5;color:#743323;padding:8px 11px;border-radius:999px;font-weight:900;font-size:10px;cursor:pointer}.destination-buttons button:hover{background:var(--tomato);color:#fff;border-color:var(--tomato)}.guide-meta{margin-top:8px;font-size:10px;font-weight:900;color:#7a4c3f}.authority-section{background:linear-gradient(135deg,#fff5eb,#ffe0d5)!important}.authority-card{display:grid;grid-template-columns:minmax(260px,.8fr) 1.2fr;gap:30px;align-items:center;padding:30px;border-radius:32px;background:#fff;border:2px solid rgba(229,57,53,.18);box-shadow:0 24px 60px rgba(133,55,27,.12)}.authority-card img{width:100%;height:430px;object-fit:cover;border-radius:24px}.authority-kicker{font-size:11px;font-weight:900;letter-spacing:1.4px;color:var(--tomato)}.authority-card h2{font-size:clamp(42px,6vw,72px);margin:8px 0 2px}.authority-card h3{font-size:25px;color:var(--orange);margin:0 0 16px}.authority-card p{color:var(--soft-ink);font-size:17px;line-height:1.6}.authority-points{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0}.authority-points span{padding:8px 10px;border-radius:999px;background:#fff0e8;color:#7a3828;font-size:10px;font-weight:900}.photo-avatar{overflow:hidden;padding:0;background:#ffe7dc!important}.photo-avatar img{width:100%;height:100%;object-fit:cover}.fictional-note{display:block;margin:3px 0 8px;color:#967066;font-size:9px;font-weight:900;letter-spacing:.65px}.card,.result,.destination-buttons button{transition:transform .25s ease,box-shadow .25s ease}.card:hover,.result:hover{transform:translateY(-6px);box-shadow:0 22px 52px rgba(125,48,23,.16)!important}@media(max-width:800px){.authority-card{grid-template-columns:1fr}.authority-card img{height:340px}}`;
    document.head.appendChild(style);
  }

  function enableMotion(){
    const style=document.createElement('style');
    style.id='voznews-motion-runtime';
    style.textContent=`[data-reveal]{opacity:0;transform:translate3d(0,24px,0);transition:opacity .68s ease,transform .68s ease;transition-delay:var(--reveal-delay,0ms)}[data-reveal].is-visible{opacity:1;transform:none}[data-parallax]{transform:translate3d(0,var(--parallax-y,0px),0);will-change:transform}@media(prefers-reduced-motion:reduce){[data-reveal],[data-reveal].is-visible,[data-parallax]{opacity:1!important;transform:none!important;transition:none!important;animation:none!important}}`;
    document.head.appendChild(style);
    const revealTargets=document.querySelectorAll('.section-head,.editor-card,.search-card,.card,.teen-card,.premium-ad,.cerrado-card,.motion-wall,.analysis-card,.person-card,.event,.community-pitch,.submit-form,.commercial,.authority-card');
    revealTargets.forEach((element,index)=>{element.setAttribute('data-reveal','');element.style.setProperty('--reveal-delay',`${Math.min((index%6)*55,275)}ms`)});
    const parallaxTargets=[document.querySelector('.hero-content'),document.querySelector('.community-pitch')].filter(Boolean);
    parallaxTargets.forEach(element=>element.setAttribute('data-parallax',''));
    const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced){revealTargets.forEach(element=>element.classList.add('is-visible'));return;}
    if('IntersectionObserver' in window){
      const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -6% 0px'});
      revealTargets.forEach(element=>observer.observe(element));
    }else revealTargets.forEach(element=>element.classList.add('is-visible'));
    let ticking=false;
    const update=()=>{parallaxTargets.forEach(element=>{const rect=element.getBoundingClientRect();const delta=(window.innerHeight/2)-(rect.top+rect.height/2);element.style.setProperty('--parallax-y',`${Math.max(-16,Math.min(16,delta*.02)).toFixed(1)}px`)});ticking=false};
    const request=()=>{if(ticking)return;ticking=true;requestAnimationFrame(update)};
    window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request,{passive:true});request();
  }

  if(!acceptanceCopy || !editorialLegacy.length) return;
  applyVibrantGastronomyTheme();
  injectGuideControls();
  injectRenataAuthority();
  renderFeatured();
  runSearch('',locationInput?.value||'Brasília, DF, Brasil');
  hydrateFictionalTeenPortraits().catch(error=>console.warn('[gastronomia] personagens jovens:',error.message));
  enableMotion();
})();
