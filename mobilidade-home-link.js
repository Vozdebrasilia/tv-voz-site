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

  function installInspireCardAnimation(){
    if(location.pathname.replace(/\/$/,'')!=='') return;
    const title=[...document.querySelectorAll('h3')].find(h=>(h.textContent||'').trim().toLowerCase()==='qual voz te inspira?');
    const card=title?.closest('.suggestion-card');
    if(!card) return;
    card.classList.add('inspire-card-animated');
    if(!card.querySelector('.inspire-orbit')){
      const orbit=document.createElement('div');
      orbit.className='inspire-orbit';
      orbit.setAttribute('aria-hidden','true');
      orbit.innerHTML='<i>✦</i><i>✦</i><i>✦</i><i>✦</i><i>✦</i><i>✦</i>';
      card.appendChild(orbit);
    }
    if(document.getElementById('inspire-card-animation-style')) return;
    const style=document.createElement('style');
    style.id='inspire-card-animation-style';
    style.textContent=`
      .inspire-card-animated{position:relative!important;overflow:hidden!important;isolation:isolate!important;transform-style:preserve-3d!important;perspective:900px!important;background:linear-gradient(135deg,#071b52 0%,#0e3d86 42%,#3b176f 100%)!important;border:1px solid rgba(124,221,255,.72)!important;box-shadow:0 18px 45px rgba(0,0,0,.35),0 0 28px rgba(52,187,255,.16),inset 0 0 45px rgba(121,82,255,.12)!important;animation:inspireFloat 4.2s ease-in-out infinite!important}
      .inspire-card-animated::before{content:"";position:absolute;inset:-45%;z-index:0;background:conic-gradient(from 0deg,transparent 0 16%,rgba(0,229,255,.42) 22%,transparent 30% 47%,rgba(255,215,0,.35) 55%,transparent 64% 79%,rgba(222,72,255,.38) 86%,transparent 94%);animation:inspireSweep 8s linear infinite;filter:blur(8px)}
      .inspire-card-animated::after{content:"“";position:absolute;right:12px;top:-28px;z-index:1;font:900 170px/1 Georgia,serif;color:rgba(255,255,255,.08);text-shadow:0 0 24px rgba(93,210,255,.32);animation:inspireQuote 3.2s ease-in-out infinite alternate}
      .inspire-card-animated .media-body{position:relative;z-index:3;transform-style:preserve-3d;animation:inspireBody 3.4s ease-in-out infinite alternate}
      .inspire-card-animated .media-source{display:inline-flex!important;width:max-content;padding:7px 10px;border-radius:999px;background:rgba(255,215,0,.14);border:1px solid rgba(255,215,0,.6);color:#ffe36b!important;box-shadow:0 0 14px rgba(255,215,0,.16);animation:inspireBadge 1.8s ease-in-out infinite alternate}
      .inspire-card-animated h3{position:relative;display:inline-block;color:#fff!important;text-shadow:0 3px 0 rgba(0,0,0,.18),0 0 18px rgba(111,212,255,.55);animation:inspireTitle 2.25s ease-in-out infinite}
      .inspire-card-animated h3::after{content:"";position:absolute;left:0;bottom:-8px;width:0;height:3px;border-radius:999px;background:linear-gradient(90deg,#ffe45c,#5ad7ff,#d56cff);box-shadow:0 0 14px rgba(90,215,255,.8);animation:inspireUnderline 2.3s ease-in-out infinite}
      .inspire-card-animated p{animation:inspireCopy 3s ease-in-out infinite alternate}
      .inspire-card-animated .real-link{display:inline-flex!important;width:max-content;position:relative;overflow:hidden;margin-top:4px;padding:11px 16px!important;border-radius:999px;background:linear-gradient(90deg,#ffd52e,#ffb000)!important;color:#10203a!important;box-shadow:0 8px 22px rgba(255,190,0,.24),0 0 18px rgba(255,215,0,.18);animation:inspireButton 1.4s ease-in-out infinite alternate}
      .inspire-card-animated .real-link::after{content:"";position:absolute;top:-20%;left:-45%;width:32%;height:140%;transform:skewX(-20deg);background:linear-gradient(90deg,transparent,rgba(255,255,255,.85),transparent);animation:inspireShine 2.4s ease-in-out infinite}
      .inspire-orbit{position:absolute;inset:0;z-index:2;pointer-events:none}
      .inspire-orbit i{position:absolute;font-style:normal;color:#fff7a6;text-shadow:0 0 8px #fff,0 0 16px #6fe8ff;opacity:.25;animation:inspireStar 2.1s ease-in-out infinite}
      .inspire-orbit i:nth-child(1){left:7%;top:12%;font-size:18px}.inspire-orbit i:nth-child(2){right:10%;top:18%;font-size:13px;animation-delay:.3s}.inspire-orbit i:nth-child(3){left:16%;bottom:13%;font-size:12px;animation-delay:.6s}.inspire-orbit i:nth-child(4){right:14%;bottom:18%;font-size:20px;animation-delay:.9s}.inspire-orbit i:nth-child(5){left:48%;top:8%;font-size:10px;animation-delay:1.2s}.inspire-orbit i:nth-child(6){right:38%;bottom:8%;font-size:11px;animation-delay:1.5s}
      @keyframes inspireFloat{0%,100%{transform:translateY(0) rotateX(0deg)}50%{transform:translateY(-7px) rotateX(1.2deg)}}
      @keyframes inspireSweep{to{transform:rotate(360deg)}}
      @keyframes inspireQuote{0%{transform:translateY(0) rotate(-4deg);opacity:.5}100%{transform:translateY(12px) rotate(4deg);opacity:1}}
      @keyframes inspireBody{0%{transform:translateZ(0)}100%{transform:translateZ(18px)}}
      @keyframes inspireBadge{0%{transform:translateY(0);box-shadow:0 0 8px rgba(255,215,0,.12)}100%{transform:translateY(-3px);box-shadow:0 0 18px rgba(255,215,0,.35)}}
      @keyframes inspireTitle{0%,100%{transform:scale(1);letter-spacing:0}45%{transform:scale(1.035);letter-spacing:.2px}60%{transform:scale(1.01)}}
      @keyframes inspireUnderline{0%,15%{width:0;opacity:.2}50%,80%{width:100%;opacity:1}100%{width:22%;opacity:.45}}
      @keyframes inspireCopy{0%{transform:translateY(2px);opacity:.82}100%{transform:translateY(-2px);opacity:1}}
      @keyframes inspireButton{0%{transform:scale(1);box-shadow:0 8px 22px rgba(255,190,0,.2)}100%{transform:scale(1.055);box-shadow:0 10px 26px rgba(255,190,0,.34),0 0 22px rgba(255,215,0,.22)}}
      @keyframes inspireShine{0%,58%{left:-45%}78%,100%{left:120%}}
      @keyframes inspireStar{0%,100%{opacity:.18;transform:scale(.65) rotate(0deg)}50%{opacity:1;transform:scale(1.35) rotate(45deg)}}
      @media(max-width:760px){.inspire-card-animated{animation-duration:5s!important}.inspire-card-animated::after{font-size:120px}.inspire-orbit i:nth-child(n+5){display:none}}
    `;
    document.head.appendChild(style);
  }

  const start=()=>{setTimeout(installMobilidadeLink,300);setTimeout(installSeal40Animation,120);setTimeout(installInspireCardAnimation,180)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();