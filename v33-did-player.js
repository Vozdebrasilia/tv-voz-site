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
 * VITRINE DE ENTREVISTAS — TERUO FUJIOKA + PAULO OCTÁVIO + CHAMADA COMERCIAL.
 * Teruo abre a editoria, Paulo Octávio ocupa o espaço livre da segunda linha
 * e a chamada comercial assume a antiga posição de Paulo Octávio.
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
    const pastelaria=[...grid.querySelectorAll('a.media-card')].find(card=>card.href&&card.href.includes('GIoOUiQZ4Ao'));

    if(pauloOctavio&&pastelaria){
      const antigaProximaPosicao=pauloOctavio.nextElementSibling;
      pastelaria.insertAdjacentElement('afterend',pauloOctavio);

      let chamada=grid.querySelector('[data-voznews-legado-cta="true"]');
      if(!chamada){
        chamada=document.createElement('a');
        chamada.className='media-card promo-card';
        chamada.dataset.voznewsLegadoCta='true';
        chamada.dataset.interest='Entrevista, história e legado';
        chamada.href='#contato';
        chamada.innerHTML=`<img alt="VOZ NEWS — sua história e seu legado" loading="lazy" src="./logo-voznews-oficial.png" style="background:linear-gradient(135deg,#071526,#12345b);object-fit:contain;padding:34px"/><div class="media-body"><span class="media-source">SUA HISTÓRIA NA VOZ NEWS</span><h3>SUA HISTÓRIA, SEU LEGADO VAI ESTAR AQUI. CHAME AGORA!</h3><p>Transforme sua trajetória em entrevista, conteúdo editorial e presença de autoridade na VOZ NEWS.</p><span class="real-link">Fale conosco →</span></div>`;
      }

      if(antigaProximaPosicao){
        grid.insertBefore(chamada,antigaProximaPosicao);
      }else{
        grid.appendChild(chamada);
      }
    }
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',atualizarVitrineDeEntrevistas,{once:true});
  }else{
    atualizarVitrineDeEntrevistas();
  }
})();

/*
 * EDITORIA POLÍTICA — CARD DE CHAMADA VOZ NEWS.
 * Preenche o sexto espaço da grade com uma chamada comercial para o Fale Conosco.
 */
(()=>{
  function preencherEspacoPolitica(){
    const grid=document.querySelector('#politica .media-grid');
    if(!grid||grid.querySelector('[data-voznews-politica-cta="true"]'))return;

    const card=document.createElement('a');
    card.className='media-card promo-card';
    card.dataset.voznewsPoliticaCta='true';
    card.dataset.interest='Publicidade, entrevistas e presença institucional';
    card.href='#contato';
    card.innerHTML=`
      <div style="min-height:210px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:20px;background:radial-gradient(circle at 50% 30%,rgba(212,175,55,.20),transparent 34%),linear-gradient(135deg,#071526,#12345b);border-bottom:1px solid rgba(212,175,55,.35)">
        <div aria-hidden="true" style="font-size:118px;line-height:.82;font-weight:1000;color:#d4af37;text-shadow:0 10px 30px rgba(0,0,0,.55)">?</div>
        <img alt="VOZ NEWS" src="./logo-voznews-oficial.png" style="width:170px;max-width:72%;height:auto;object-fit:contain;filter:drop-shadow(0 8px 20px rgba(0,0,0,.42))"/>
      </div>
      <div class="media-body">
        <span class="media-source">VOCÊ NA FRENTE</span>
        <h3>VOCÊ NA FRENTE</h3>
        <p>Sua voz, sua história e sua marca podem ocupar este espaço de destaque na VOZ NEWS.</p>
        <p style="margin-top:8px;font-weight:900;color:#fff">Contato VOZ NEWS</p>
        <span class="real-link">Fale conosco →</span>
      </div>`;
    grid.appendChild(card);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',preencherEspacoPolitica,{once:true});
  }else{
    preencherEspacoPolitica();
  }
})();

/*
 * EDITORIA INTERNACIONAL — CHAMADA PARA O PRÓXIMO ENTREVISTADO.
 * Preenche o último espaço livre da grade e leva o público ao Fale Conosco.
 */
(()=>{
  function preencherEspacoInternacional(){
    const grid=document.querySelector('#internacional .media-grid');
    if(!grid||grid.querySelector('[data-voznews-internacional-cta="true"]'))return;

    const card=document.createElement('a');
    card.className='media-card promo-card';
    card.dataset.voznewsInternacionalCta='true';
    card.dataset.interest='Sugestão de entrevista internacional';
    card.href='#contato';
    card.innerHTML=`
      <div style="min-height:210px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:20px;background:radial-gradient(circle at 50% 24%,rgba(212,175,55,.22),transparent 34%),linear-gradient(135deg,#071526,#12345b);border-bottom:1px solid rgba(212,175,55,.35)">
        <div aria-hidden="true" style="font-size:112px;line-height:.82;font-weight:1000;color:#d4af37;text-shadow:0 10px 30px rgba(0,0,0,.55)">?</div>
        <img alt="VOZ NEWS" src="./logo-voznews-oficial.png" style="width:170px;max-width:72%;height:auto;object-fit:contain;filter:drop-shadow(0 8px 20px rgba(0,0,0,.42))"/>
      </div>
      <div class="media-body">
        <span class="media-source">PRÓXIMA ENTREVISTA INTERNACIONAL</span>
        <h3>QUEM DEVE SER O PRÓXIMO CONVIDADO?</h3>
        <p>Sugira um organismo internacional, embaixada, embaixador ou embaixadora para a próxima entrevista da VOZ NEWS.</p>
        <span class="real-link">Deixe sua sugestão • Fale conosco →</span>
      </div>`;
    grid.appendChild(card);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',preencherEspacoInternacional,{once:true});
  }else{
    preencherEspacoInternacional();
  }
})();

/*
 * MARCAS E LIDERANÇAS — FÁBIO ZUCCARATTO + CHAMADA PARA PRÓXIMA ENTREVISTA.
 * Mantém a pessoa real do acervo, melhora o enquadramento e preserva os demais cards.
 */
(()=>{
  function atualizarEmpresas(){
    const grid=document.querySelector('#empresas .visual-grid');
    if(!grid)return;

    const cards=[...grid.querySelectorAll('a.visual-card')];
    const fabio=cards.find(card=>/F[ÁA]BIO\s+ZUCCARATTO/i.test(card.textContent||''));
    if(fabio){
      fabio.href='https://www.youtube.com/watch?v=aK34W2Ob6ms';
      fabio.target='_blank';
      fabio.rel='noopener';
      fabio.dataset.voznewsCanonCorrigido='true';
      fabio.style.setProperty('overflow','hidden','important');
      const img=fabio.querySelector('img');
      if(img){
        img.src='./fabio-paulo-canon-aprovada.jpg';
        img.alt='Paulo Fayad entrevista Fábio Zuccaratto Migotto, da Canon do Brasil';
        img.style.setProperty('display','block','important');
        img.style.setProperty('width','100%','important');
        img.style.setProperty('height','300px','important');
        img.style.setProperty('object-fit','cover','important');
        img.style.setProperty('object-position','62% 50%','important');
        img.style.setProperty('filter','brightness(1.10) contrast(1.10) saturate(1.05)','important');
        img.style.setProperty('image-rendering','auto','important');
        img.style.setProperty('transform','scale(1.03)','important');
        img.style.setProperty('transform-origin','62% 50%','important');
        img.onerror=()=>{img.onerror=null;img.src='https://img.youtube.com/vi/aK34W2Ob6ms/hqdefault.jpg';};
      }
      const h3=fabio.querySelector('h3');
      if(h3)h3.textContent='FÁBIO ZUCCARATTO MIGOTTO | CANON DO BRASIL';
      const p=fabio.querySelector('p');
      if(p)p.textContent='Paulo Fayad entrevista Fábio Zuccaratto Migotto sobre tecnologia, fotografia, cinema, broadcast, inovação e a atuação da Canon do Brasil.';
      const link=fabio.querySelector('.real-link');
      if(link)link.textContent='▶ Assistir entrevista →';
    }

    if(!grid.querySelector('[data-voznews-empresas-cta="true"]')){
      const chamada=document.createElement('a');
      chamada.className='visual-card promo-card';
      chamada.dataset.voznewsEmpresasCta='true';
      chamada.dataset.interest='Próxima entrevista empresarial';
      chamada.href='#contato';
      chamada.innerHTML=`
        <div style="min-height:330px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:28px;background:radial-gradient(circle at 50% 28%,rgba(212,175,55,.22),transparent 34%),linear-gradient(135deg,#071526,#12345b);border-bottom:1px solid rgba(212,175,55,.35)">
          <div aria-hidden="true" style="font-size:132px;line-height:.8;font-weight:1000;color:#d4af37;text-shadow:0 12px 34px rgba(0,0,0,.55)">?</div>
          <img alt="VOZ NEWS" src="./logo-voznews-oficial.png" style="width:190px;max-width:72%;height:auto;object-fit:contain;filter:drop-shadow(0 8px 20px rgba(0,0,0,.42))"/>
        </div>
        <div class="visual-body">
          <h3>QUEM SERÁ O PRÓXIMO ENTREVISTADO?</h3>
          <p>Sua empresa, sua liderança e sua história podem ocupar este espaço na VOZ NEWS.</p>
          <span class="real-link">Fale conosco →</span>
        </div>`;
      grid.appendChild(chamada);
    }
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',atualizarEmpresas,{once:true});
  }else{
    atualizarEmpresas();
  }
})();

/*
 * CINEMA & PRÉ-ESTREIAS — CHAMADA PARA O PRÓXIMO LANÇAMENTO.
 * Preenche o sexto espaço livre da grade sem alterar os cards existentes.
 */
(()=>{
  function preencherProximoLancamento(){
    const heading=[...document.querySelectorAll('h2')].find(h=>/Programação dos cinemas e oportunidades de cobertura/i.test(h.textContent||''));
    const bloco=heading&&heading.parentElement&&heading.parentElement.parentElement;
    const grid=bloco&&bloco.querySelector('.visual-grid');
    if(!grid||grid.querySelector('[data-voznews-cinema-cta="true"]'))return;

    const card=document.createElement('a');
    card.className='visual-card promo-card';
    card.dataset.voznewsCinemaCta='true';
    card.dataset.interest='Próximo lançamento, pré-estreia e cobertura de cinema';
    card.href='#contato';
    card.innerHTML=`
      <div style="min-height:230px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:24px;background:radial-gradient(circle at 50% 25%,rgba(212,175,55,.24),transparent 34%),linear-gradient(135deg,#071526,#12345b);border-bottom:1px solid rgba(212,175,55,.35)">
        <div aria-hidden="true" style="font-size:78px;line-height:1;font-weight:1000;color:#d4af37;text-shadow:0 10px 30px rgba(0,0,0,.55)">🎬</div>
        <img alt="VOZ NEWS" src="./logo-voznews-oficial.png" style="width:150px;max-width:68%;height:auto;object-fit:contain;filter:drop-shadow(0 8px 20px rgba(0,0,0,.42))"/>
      </div>
      <div class="visual-body">
        <h3>QUAL SERÁ O PRÓXIMO LANÇAMENTO?</h3>
        <p>Pré-estreia, lançamento, coletiva ou sessão especial: sua produção pode ganhar destaque e cobertura na VOZ NEWS.</p>
        <span class="real-link">Fale conosco →</span>
      </div>`;
    grid.appendChild(card);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',preencherProximoLancamento,{once:true});
  }else{
    preencherProximoLancamento();
  }
})();
