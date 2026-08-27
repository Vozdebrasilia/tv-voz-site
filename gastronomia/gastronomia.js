(() => {
  const directory = [
    {name:'Mané Mercado',city:'Brasília',country:'Brasil',cuisine:'Complexo gastronômico e experiências',address:'Arena BRB Mané Garrincha, Brasília',phone:'',url:'materias/mane-mercado.html',image:'https://mane.com.vc/_next/image?q=75&url=%2Fimages%2Fhero2.jpg&w=1920',note:'Destaque premium da Voz News: múltiplas cozinhas, variedade de experiências e forte apelo para grupos e famílias.',tier:'sponsored'},
    {name:'Vasto Restaurante',city:'Brasília',country:'Brasil',cuisine:'Carnes nobres, sushi e contemporânea',address:'SCN Q. 5, Loja 84L, Brasília Shopping, Asa Norte',phone:'(61) 99256-8873',url:'https://brasiliashopping.com.br/lojas/vasto-restaurante',image:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',note:'No acervo da TV Voz, Deijanete e Paulo registram ambiente elegante, serviço refinado e pratos de forte apelo visual.',tier:'editorial'},
    {name:'Coco Bambu',city:'Brasília',country:'Brasil',cuisine:'Frutos do mar e cozinha brasileira',address:'SCES Trecho 2, Ícone Parque, Conjunto 36, Asa Sul',phone:'(61) 3224-5585',url:'https://cocobambu.com/',image:'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=1200&q=85',note:'Pratos generosos, frutos do mar e apresentação marcante fazem da casa uma das referências lembradas da capital.',tier:'editorial'},
    {name:'Mangai',city:'Brasília',country:'Brasil',cuisine:'Brasileira e nordestina',address:'SCE Sul, s/n, Lote 2, Asa Sul, Brasília',phone:'(61) 3252-0156',url:'https://www.instagram.com/mangairestaurantes/',image:'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85',note:'Comida brasileira com alma nordestina, buffet farto e ambiente que transforma a refeição em experiência de memória e acolhimento.',tier:'editorial'},
    {name:'Piselli Brasília',city:'Brasília',country:'Brasil',cuisine:'Italiana',address:'Shopping Iguatemi, Piso Térreo, Lago Norte',phone:'(61) 99913-7191',url:'https://piselli.com.br/',image:'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85',note:'Cozinha italiana de alto padrão, carta de vinhos e atmosfera elegante para almoço executivo ou jantar especial.',tier:'editorial'},
    {name:'Rubaiyat Brasília',city:'Brasília',country:'Brasil',cuisine:'Carnes e gastronomia premium',address:'SCES Trecho 1, Brasília',phone:'(61) 3443-5000',url:'https://rubaiyat.com.br/',image:'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',note:'Cortes especiais, apresentação cuidadosa e ambiente de alto padrão colocam o endereço entre os destinos gastronômicos premium da cidade.',tier:'editorial'},
    {name:'Kubitschek Plaza Hotel',city:'Brasília',country:'Brasil',cuisine:'Hotel, gastronomia e eventos',address:'SHN Quadra 02 Bloco E, Setor Hoteleiro Norte',phone:'(61) 3319-3543',url:'https://plazabrasilia.com.br/',image:'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',note:'Espaço tradicional da capital para hospedagem, gastronomia, eventos e encontros institucionais.',tier:'editorial'},
    {name:'Pastelaria Viçosa',city:'Brasília',country:'Brasil',cuisine:'Pastelaria e comida popular',address:'Rodoviária do Plano Piloto, Brasília',phone:'',url:'materias/pastelaria-vicosa.html',image:'https://3.bp.blogspot.com/-KqQuhbEFDJw/VbwBueyx4yI/AAAAAAAANws/kSiQ0DYzROE/s1600/pastelaria-2.jpg',note:'Pastel, caldo de cana e a pressa da Rodoviária: um endereço popular que atravessa gerações e integra a memória afetiva da capital.',tier:'editorial'}
  ];

  const tierWeight = {sponsored: 0, partner: 1, editorial: 2};
  const normalize = value => (value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const esc = value => String(value || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const sortedDirectory = () => [...directory].sort((a,b) => (tierWeight[a.tier] ?? 9) - (tierWeight[b.tier] ?? 9));
  const featured = document.getElementById('featured-restaurants');
  const results = document.getElementById('search-results');
  const form = document.getElementById('restaurant-search');
  const termInput = document.getElementById('search-term');
  const locationInput = document.getElementById('search-location');

  function tierBadge(item){
    if(item.tier === 'sponsored') return '<span class="badge sponsor">⭐ PATROCINADO • PRIORIDADE</span>';
    if(item.tier === 'partner') return '<span class="badge partner">🤝 PARCEIRO VOZ NEWS</span>';
    return '<span class="badge partner">GUIA EDITORIAL</span>';
  }

  function renderFeatured(){
    if(!featured) return;
    featured.innerHTML = sortedDirectory().map(item => `
      <article class="card">
        <div class="card-media"><img loading="lazy" src="${esc(item.image)}" alt="${esc(item.name)}"/></div>
        <div class="card-body">
          ${tierBadge(item)}
          <span class="label">GUIA VOZ NEWS • BRASÍLIA</span>
          <h3>${esc(item.name)}</h3>
          <p>${esc(item.note)}</p>
          <div class="meta"><strong>${esc(item.cuisine)}</strong><br>${esc(item.address)}${item.phone ? `<br>${esc(item.phone)}` : ''}</div>
          <div class="comment-mini"><strong>Voz News:</strong> cada estabelecimento do guia recebe contexto editorial; anunciantes têm prioridade comercial e acesso direto ao conteúdo patrocinado.</div>
          <a class="cta ${item.tier === 'sponsored' ? 'primary' : ''}" href="${esc(item.url)}" ${/^https?:/.test(item.url) ? 'target="_blank" rel="noopener"' : ''}>${item.tier === 'sponsored' ? 'ABRIR ANÚNCIO / DESTAQUE' : item.name === 'Pastelaria Viçosa' ? 'LER MATÉRIA + AVALIAÇÃO' : 'CONHECER RESTAURANTE'}</a>
        </div>
      </article>`).join('');
  }

  function localMatches(term, location){
    const t = normalize(term); const l = normalize(location);
    return sortedDirectory().filter(item => {
      const hay = normalize([item.name,item.cuisine,item.city,item.country,item.address,item.note].join(' '));
      const locationHay = normalize([item.city,item.country,item.address].join(' '));
      return (!t || hay.includes(t)) && (!l || locationHay.includes(l) || l.includes(normalize(item.city)) || l.includes(normalize(item.country)));
    });
  }

  function localCard(item){
    const tierClass = item.tier === 'sponsored' ? ' sponsored' : '';
    const badge = item.tier === 'sponsored' ? '<span class="badge sponsor">⭐ PATROCINADO • PRIMEIRO</span>' : item.tier === 'partner' ? '<span class="badge partner">🤝 PARCEIRO</span>' : '<span class="badge partner">GUIA VOZ NEWS</span>';
    const action = item.tier === 'sponsored' ? 'ABRIR ANÚNCIO / DESTAQUE →' : 'VER RESTAURANTE →';
    return `<div class="result${tierClass}">${badge}<strong>${esc(item.name)}</strong><small>${esc(item.cuisine)}</small><p>${esc(item.address)}${item.phone ? `<br>${esc(item.phone)}` : ''}</p><a href="${esc(item.url)}" ${/^https?:/.test(item.url) ? 'target="_blank" rel="noopener"' : ''}>${action}</a></div>`;
  }

  function externalCard(item){
    const cuisine = item.cuisine || 'Restaurante';
    return `<div class="result"><span class="badge partner">📍 RESULTADO PÚBLICO</span><strong>${esc(item.name || 'Restaurante')}</strong><small>${esc(cuisine)}</small><p>${esc(item.address || 'Endereço não informado')}</p>${item.mapUrl ? `<a href="${esc(item.mapUrl)}" target="_blank" rel="noopener">ABRIR LOCALIZAÇÃO →</a>` : ''}</div>`;
  }

  async function runSearch(term, location){
    if(!results) return;
    const local = localMatches(term, location);
    results.innerHTML = local.map(localCard).join('') + '<div class="search-status">Ampliando a busca para restaurantes públicos da região…</div>';
    try{
      const url = `/api/restaurants?term=${encodeURIComponent(term || '')}&location=${encodeURIComponent(location || 'Brasília, DF, Brasil')}`;
      const response = await fetch(url, {headers:{'Accept':'application/json'}});
      const payload = await response.json();
      if(!response.ok) throw new Error(payload.error || 'Falha na busca');
      const external = Array.isArray(payload.results) ? payload.results : [];
      const known = new Set(local.map(item => normalize(item.name)));
      const fresh = external.filter(item => !known.has(normalize(item.name))).slice(0,18);
      const localHtml = local.length ? local.map(localCard).join('') : '';
      const externalHtml = fresh.map(externalCard).join('');
      results.innerHTML = localHtml + externalHtml || '<div class="search-status">Nenhum restaurante encontrado. Tente outro nome, cozinha ou localidade.</div>';
    }catch(error){
      const localHtml = local.map(localCard).join('');
      results.innerHTML = localHtml + `<div class="search-status">${local.length ? 'Mostrando o acervo Voz News. ' : ''}A busca mundial está temporariamente indisponível. Tente novamente em instantes.</div>`;
    }
  }

  if(form){
    form.addEventListener('submit', event => {
      event.preventDefault();
      runSearch(termInput.value, locationInput.value);
    });
  }

  document.querySelectorAll('[data-search]').forEach(link => link.addEventListener('click', () => {
    const [term,location] = (link.dataset.search || '').split('|');
    if(termInput) termInput.value = term || '';
    if(locationInput) locationInput.value = location || '';
    setTimeout(() => runSearch(termInput ? termInput.value : '', locationInput ? locationInput.value : ''), 50);
  }));

  const params = new URLSearchParams(window.location.search);
  if(params.get('envio') === 'recebido'){
    const community = document.getElementById('community-form');
    if(community){
      const notice = document.createElement('div');
      notice.style.cssText = 'margin:0 0 14px;padding:12px 14px;border-radius:12px;background:#e7f8e7;border:1px solid #9bd09b;color:#164b22;font-weight:800;line-height:1.4';
      notice.textContent = 'Recebemos seu envio. O conteúdo seguirá para análise editorial antes de qualquer publicação.';
      community.prepend(notice);
    }
  }

  renderFeatured();
  if(results) results.innerHTML = sortedDirectory().slice(0,3).map(localCard).join('') + '<div class="search-status">Digite um nome, cozinha ou destino para pesquisar.</div>';
})();
