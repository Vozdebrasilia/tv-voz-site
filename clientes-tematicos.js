(() => {
  const photos={
    'energia-solar':'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1400&q=88',
    'materiais-eletricos':'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1400&q=88',
    'automoveis-locadoras':'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=88',
    'imoveis-construcao':'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=88',
    'saude-clinicas':'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=88',
    'turismo-hoteis':'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=88',
    'restaurantes':'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=88',
    'pet-veterinaria':'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1400&q=88',
    'moda-beleza':'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=88',
    'oticas':'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1400&q=88',
    'cursos-educacao':'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=88',
    'nautica-motos':'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=88'
  };
  function install(){
    const section=document.getElementById('clientes'); if(!section)return;
    if(!document.getElementById('client-theme-style')){
      const style=document.createElement('style'); style.id='client-theme-style'; style.textContent=`#clientes .visual-card{position:relative;overflow:hidden}#clientes .visual-card>img{width:100%!important;height:270px!important;object-fit:cover!important;object-position:center!important;background:#071a2b!important}#clientes .client-theme-badge{position:absolute;left:18px;top:18px;z-index:4;display:flex;align-items:center;gap:8px;padding:8px 11px;border-radius:999px;background:rgba(5,24,44,.86);border:1px solid rgba(212,175,55,.7);color:#fff;font:900 11px Arial,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.28)}#clientes .client-theme-badge img{width:28px!important;height:28px!important;object-fit:contain!important;border-radius:50%}@media(max-width:620px){#clientes .visual-card>img{height:245px!important}.client-theme-badge{left:14px!important;top:14px!important}}`; document.head.appendChild(style);
    }
    section.querySelectorAll('.visual-card').forEach(card=>{
      const href=card.getAttribute('href')||''; const match=href.match(/clientes\/([^/.]+)\.html/); const key=match?.[1];
      const img=card.querySelector(':scope > img'); if(key&&photos[key]&&img){img.src=photos[key];img.loading='lazy';img.referrerPolicy='no-referrer';}
      if(!card.querySelector('.client-theme-badge')){const badge=document.createElement('span');badge.className='client-theme-badge';badge.innerHTML='<img src="/favicon-voznews.png" alt=""><span>VOZ NEWS</span>';card.appendChild(badge)}
    });
  }

  function installBannerArrow(attempt=0){
    if(location.pathname.replace(/\/$/,'')!=='') return;
    const banner=document.getElementById('banner-legado-40-anos');
    if(!banner){if(attempt<20)setTimeout(()=>installBannerArrow(attempt+1),150);return;}
    if(document.getElementById('seta-legado-40-anos')) return;
    if(!document.getElementById('seta-legado-style')){
      const style=document.createElement('style');
      style.id='seta-legado-style';
      style.textContent=`
        #banner-legado-40-anos{position:relative!important;overflow:visible!important}
        #seta-legado-40-anos{position:absolute;left:-118px;top:50%;transform:translateY(-50%);width:96px;height:96px;z-index:12;display:grid;place-items:center;pointer-events:none;filter:drop-shadow(0 0 16px rgba(255,215,0,.9))}
        #seta-legado-40-anos span{display:block;font-size:82px;line-height:1;color:#ffd700;text-shadow:0 0 12px rgba(255,215,0,.95),0 0 28px rgba(255,143,0,.75);animation:setaLegadoGiroPisca 1.15s ease-in-out infinite alternate}
        @keyframes setaLegadoGiroPisca{0%{opacity:.35;transform:translateX(-10px) rotate(-10deg) scale(.9)}45%{opacity:1;transform:translateX(6px) rotate(8deg) scale(1.12)}100%{opacity:.65;transform:translateX(0) rotate(-4deg) scale(1)}}
        @media(max-width:980px){#seta-legado-40-anos{left:-82px;width:70px;height:70px}#seta-legado-40-anos span{font-size:60px}}
        @media(max-width:760px){#seta-legado-40-anos{display:none!important}}
        @media(prefers-reduced-motion:reduce){#seta-legado-40-anos span{animation:none!important;opacity:1!important}}
      `;
      document.head.appendChild(style);
    }
    const arrow=document.createElement('div');
    arrow.id='seta-legado-40-anos';
    arrow.setAttribute('aria-hidden','true');
    arrow.innerHTML='<span>➜</span>';
    banner.appendChild(arrow);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{install();installBannerArrow()},{once:true});else{install();installBannerArrow()}
})();