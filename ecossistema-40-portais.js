(() => {
  const liveRoutes={
    'automoveis':'/mobilidade/',
    'casa':'/moveis-decoracao/',
    'gastronomia-negocios':'/gastronomia/'
  };

  const fallback={
    energia:'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1400&q=88',
    bancos:'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=88',
    aviacao:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=88',
    automoveis:'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=88',
    agro:'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1400&q=88',
    tecnologia:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=88',
    'saude-bem-estar':'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=88',
    farma:'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1400&q=88',
    turismo:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=88',
    imoveis:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=88',
    esg:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=88',
    logistica:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=88',
    poder:'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1400&q=88',
    justica:'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=88',
    seguranca:'https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&w=1400&q=88',
    educacao:'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=88',
    empreendedorismo:'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=88',
    cultura:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=88',
    esportes:'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1400&q=88',
    'ibj-acao-social':'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1400&q=88',
    fitness:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=88',
    casa:'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=88',
    drogarias:'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1400&q=88',
    beleza:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=88',
    computadores:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1400&q=88',
    fotografia:'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=88',
    'gastronomia-negocios':'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=88',
    adegas:'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1400&q=88',
    pet:'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1400&q=88',
    moda:'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=88',
    oticas:'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1400&q=88',
    odontologia:'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=88',
    reforma:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=88',
    varejo:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=88',
    hoteis:'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=88',
    cursos:'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=88',
    seguros:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=88',
    condominios:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=88',
    festas:'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=88',
    motos:'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=88'
  };

  async function resolveThemeImage(slug,img){
    const svgPath=`/assets-v23/portal-${slug}.svg`;
    try{
      const response=await fetch(svgPath,{cache:'force-cache'});
      if(!response.ok) throw new Error('svg');
      const text=await response.text();
      const doc=new DOMParser().parseFromString(text,'image/svg+xml');
      const node=doc.querySelector('image');
      const photo=node?.getAttribute('href')||node?.getAttributeNS('http://www.w3.org/1999/xlink','href');
      img.src=photo||fallback[slug]||svgPath;
    }catch(e){img.src=fallback[slug]||svgPath}
  }

  function install(){
    if(location.pathname.replace(/\/$/,'')!=='') return;
    const section=document.getElementById('ecossistema');
    if(!section)return;

    const followerStat=[...document.querySelectorAll('.eco-stat')].find(el=>/seguidores no Instagram/i.test(el.textContent||''));
    const followerCount=followerStat?.querySelector('.count-up');
    if(followerCount){followerCount.dataset.target='240';followerCount.textContent='240 mil+';}

    if(!document.getElementById('eco-strong-photo-style')){
      const st=document.createElement('style');st.id='eco-strong-photo-style';st.textContent=`
        #ecossistema .eco-portal{position:relative!important;overflow:hidden!important;background:linear-gradient(160deg,#07182c,#10263e)!important;border:1px solid rgba(212,175,55,.34)!important}
        #ecossistema .eco-portal-img{width:100%!important;height:190px!important;object-fit:cover!important;object-position:center!important;margin:0 0 14px!important;border-radius:0!important;background:#07182c!important;filter:saturate(1.18) contrast(1.06)!important;transition:transform .38s ease,filter .38s ease!important}
        #ecossistema .eco-portal:hover .eco-portal-img{transform:scale(1.055)!important;filter:saturate(1.32) contrast(1.1) brightness(1.05)!important}
        #ecossistema .eco-live-badge{position:absolute;z-index:5;right:12px;top:12px;padding:7px 10px;border-radius:999px;background:#ffd32a;color:#071526;font:1000 10px/1 Arial,sans-serif;letter-spacing:.6px;box-shadow:0 6px 18px rgba(0,0,0,.3),0 0 18px rgba(255,211,42,.3)}
        #ecossistema .eco-portal[data-live-site="true"]{border:2px solid #d4af37!important;box-shadow:0 18px 44px rgba(0,0,0,.3),0 0 22px rgba(212,175,55,.15)!important}
        @media(max-width:620px){#ecossistema .eco-portal-img{height:205px!important}}
      `;document.head.appendChild(st)
    }

    const cards=[...section.querySelectorAll('.eco-portal')];
    cards.forEach(card=>{
      const href=card.getAttribute('href')||'';
      const match=href.match(/portais\/([^/.]+)\.html/);
      const slug=match?.[1];
      if(!slug)return;
      const img=card.querySelector('.eco-portal-img');
      if(img){img.loading='lazy';img.referrerPolicy='no-referrer';resolveThemeImage(slug,img)}
      if(liveRoutes[slug]){
        card.href=liveRoutes[slug];
        card.removeAttribute('target');card.removeAttribute('rel');
        card.dataset.liveSite='true';
        if(!card.querySelector('.eco-live-badge')){const b=document.createElement('span');b.className='eco-live-badge';b.textContent='SITE ATIVO';card.appendChild(b)}
        const link=card.querySelector('.eco-link');if(link)link.textContent='Abrir site completo →';
      }
    });
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();