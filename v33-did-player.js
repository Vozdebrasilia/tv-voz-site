(()=>{if(!document.getElementById('voznews-accessibilidade-runtime')){const s=document.createElement('script');s.id='voznews-accessibilidade-runtime';s.src='/voznews-accessibilidade.js?v=20260904-selos';s.async=false;document.head.appendChild(s)}})();

/*
 * ESTÚDIO VOZ NEWS TEMPORARIAMENTE FORA DO SITE PÚBLICO.
 * O layout, os assets e a implementação original foram preservados no histórico
 * do Git e registrados em arquivo-layouts/STUDIO_VOZNEWS_PRESERVADO.md.
 */
(()=>{
  function retirarStudioDaExibicao(){
    const studio=document.getElementById('tv-ao-vivo');
    if(!studio)return;
    studio.style.setProperty('display','none','important');
    studio.setAttribute('aria-hidden','true');
    document.documentElement.dataset.voznewsStudio='preservado-fora-do-ar';
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',retirarStudioDaExibicao,{once:true});
  }else{
    retirarStudioDaExibicao();
  }
})();
