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

/*
 * VITRINE DE ENTREVISTAS — TERUO FUJIOKA + CHAMADA COMERCIAL.
 * Mantém o restante da editoria intacto e apenas reposiciona/insere os dois cards solicitados.
 */
(()=>{
  function atualizarVitrineDeEntrevistas(){
    const grid=document.querySelector('#noticias .media-grid');
    if(!grid)return;

    if(!grid.querySelector('[data-voznews-teruo="true"]')){
      const teruo=document.createElement('a');
      teruo.className='media-card';
      teruo.dataset.voznewsTeruo='true';
      teruo.href='https://www.youtube.com/watch?v=xIN7omCOUfU';
      teruo.target='_blank';
      teruo.rel='noopener';
      teruo.innerHTML=`<img alt="Teruo Fujioka em entrevista com Paulo Fayad" loading="lazy" src="https://img.youtube.com/vi/xIN7omCOUfU/hqdefault.jpg"/><div class="media-body"><span class="media-source">EMPREENDEDORISMO • HISTÓRIA • LEGADO</span><h3>TERUO FUJIOKA: EMPREENDEDORISMO, VISÃO E UMA HISTÓRIA DE SUCESSO</h3><p>Paulo Fayad entrevista o empresário Teruo Fujioka sobre trajetória, empreendedorismo, visão empresarial e a construção de um legado reconhecido no Centro-Oeste.</p><span class="real-link">▶ Assistir entrevista →</span></div>`;
      grid.insertBefore(teruo,grid.firstElementChild);
    }

    const pauloOctavio=[...grid.querySelectorAll('a.media-card')].find(card=>card.href&&card.href.includes('m8s4ajix3vA'));
    if(pauloOctavio&&!grid.querySelector('[data-voznews-legado-cta="true"]')){
      const chamada=document.createElement('a');
      chamada.className='media-card promo-card';
      chamada.dataset.voznewsLegadoCta='true';
      chamada.dataset.interest='Entrevista, história e legado';
      chamada.href='#contato';
      chamada.innerHTML=`<img alt="VOZ NEWS — sua história e seu legado" loading="lazy" src="./logo-voznews-oficial.png" style="background:linear-gradient(135deg,#071526,#12345b);object-fit:contain;padding:34px"/><div class="media-body"><span class="media-source">SUA HISTÓRIA NA VOZ NEWS</span><h3>SUA HISTÓRIA, SEU LEGADO VAI ESTAR AQUI. CHAME AGORA!</h3><p>Transforme sua trajetória em entrevista, conteúdo editorial e presença de autoridade na VOZ NEWS.</p><span class="real-link">Fale conosco →</span></div>`;
      pauloOctavio.insertAdjacentElement('afterend',chamada);
    }
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',atualizarVitrineDeEntrevistas,{once:true});
  }else{
    atualizarVitrineDeEntrevistas();
  }
})();
