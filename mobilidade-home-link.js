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

  function installSeal40Animation(){
    if(location.pathname.replace(/\/$/,'')!=='') return;
    const seal=document.querySelector('.seal-box');
    const img=seal?.querySelector('.seal-img');
    if(!seal||!img) return;
    seal.classList.add('seal-40-animated');
    if(document.getElementById('seal-40-animation-style')) return;
    const style=document.createElement('style');
    style.id='seal-40-animation-style';
    style.textContent=`
      .seal-40-animated{perspective:900px;transform-style:preserve-3d;position:relative}
      .seal-40-animated .seal-img{transform-style:preserve-3d;transform-origin:50% 50%;will-change:transform,filter;animation:seal3dFloat 3.4s ease-in-out infinite;filter:drop-shadow(0 18px 18px rgba(0,0,0,.38)) drop-shadow(0 0 20px rgba(212,175,55,.42))}
      .seal-40-animated .seal-text{transform-style:preserve-3d;animation:sealTextFloat 2.25s ease-in-out infinite alternate}
      .seal-40-animated .seal-text strong{display:inline-block;transform-origin:center;animation:seal40Pulse 1.35s cubic-bezier(.2,.8,.2,1) infinite;text-shadow:0 2px 0 #8d6a08,0 5px 10px rgba(0,0,0,.4),0 0 14px rgba(255,215,0,.45)}
      .seal-40-animated::after{content:"";position:absolute;left:50%;top:50%;width:220px;height:220px;border-radius:50%;transform:translate(-50%,-50%) translateZ(-30px);background:radial-gradient(circle,rgba(255,215,0,.2),rgba(105,184,255,.08) 45%,transparent 70%);filter:blur(8px);animation:sealAura 1.8s ease-in-out infinite alternate;pointer-events:none}
      @keyframes seal3dFloat{0%{transform:rotateY(-14deg) rotateX(5deg) translateY(0) scale(1)}25%{transform:rotateY(9deg) rotateX(-3deg) translateY(-9px) scale(1.035)}50%{transform:rotateY(16deg) rotateX(4deg) translateY(-2px) scale(1.02)}75%{transform:rotateY(-8deg) rotateX(-4deg) translateY(-10px) scale(1.04)}100%{transform:rotateY(-14deg) rotateX(5deg) translateY(0) scale(1)}}
      @keyframes seal40Pulse{0%,100%{transform:translateZ(0) scale(1)}35%{transform:translateZ(28px) scale(1.12)}55%{transform:translateZ(8px) scale(.98)}75%{transform:translateZ(18px) scale(1.07)}}
      @keyframes sealTextFloat{0%{transform:rotateY(-8deg) translateY(2px)}100%{transform:rotateY(8deg) translateY(-6px)}}
      @keyframes sealAura{0%{opacity:.35;transform:translate(-50%,-50%) scale(.88)}100%{opacity:1;transform:translate(-50%,-50%) scale(1.16)}}
      @media(max-width:760px){.seal-40-animated .seal-img{animation-duration:4s}.seal-40-animated::after{width:160px;height:160px}}
    `;
    document.head.appendChild(style);
  }

  const start=()=>{setTimeout(installMobilidadeLink,300);setTimeout(installSeal40Animation,120)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();