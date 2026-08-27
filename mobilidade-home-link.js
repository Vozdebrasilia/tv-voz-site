(() => {
  function installMobilidadeLink(){
    const eco=document.getElementById('ecossistema');
    if(!eco||document.getElementById('voznews-mobilidade-feature')) return;
    const grid=eco.querySelector('.protected-eco-grid');
    if(!grid) return;
    const card=document.createElement('a');
    card.id='voznews-mobilidade-feature';
    card.href='/mobilidade/';
    card.innerHTML=`<div class="vmf-copy"><span>NOVA VERTICAL AGREGADORA</span><strong>VOZ NEWS MOBILIDADE</strong><p>Automóveis, motos, bikes, elétricos, locadoras, concessionárias, náutica e aviação reunidos em Terra, Água e Ar.</p><b>Abrir VOZ NEWS MOBILIDADE →</b></div><div class="vmf-media"><img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=84" alt="VOZ NEWS Mobilidade"/></div>`;
    const style=document.createElement('style');
    style.textContent=`#voznews-mobilidade-feature{display:grid;grid-template-columns:1.15fr .85fr;gap:0;margin:0 0 26px;border-radius:26px;overflow:hidden;border:2px solid #d4af37;background:linear-gradient(135deg,#0d3154,#071827);box-shadow:0 18px 45px rgba(0,0,0,.28)}#voznews-mobilidade-feature .vmf-copy{padding:28px}#voznews-mobilidade-feature span{display:block;color:#d4af37;font-size:12px;font-weight:900;letter-spacing:1.2px;margin-bottom:8px}#voznews-mobilidade-feature strong{display:block;font-size:clamp(28px,4vw,48px);line-height:1;color:#fff}#voznews-mobilidade-feature p{margin:13px 0 18px;color:#dce7f5;font-size:16px;line-height:1.5}#voznews-mobilidade-feature b{color:#d4af37}#voznews-mobilidade-feature .vmf-media{min-height:250px}#voznews-mobilidade-feature .vmf-media img{width:100%;height:100%;object-fit:cover}@media(max-width:680px){#voznews-mobilidade-feature{grid-template-columns:1fr}#voznews-mobilidade-feature .vmf-media{min-height:210px}}`;
    document.head.appendChild(style);
    grid.insertAdjacentElement('beforebegin',card);
    const menu=document.getElementById('siteMenu');
    if(menu&&!menu.querySelector('a[href="/mobilidade/"]')){const a=document.createElement('a');a.href='/mobilidade/';a.textContent='VOZ NEWS Mobilidade';menu.prepend(a)}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(installMobilidadeLink,300),{once:true});else setTimeout(installMobilidadeLink,300);
})();