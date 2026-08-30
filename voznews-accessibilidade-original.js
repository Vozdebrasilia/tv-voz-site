(() => {
  const load=(src,id)=>{if(document.getElementById(id))return;const s=document.createElement('script');s.id=id;s.src=src;s.async=false;document.head.appendChild(s)};
  load('/voznews-accessibilidade-core.js','voznews-accessibilidade-core');
  load('/ecossistema-40-portais.js','voznews-ecossistema-40-portais');
  load('/clientes-tematicos.js','voznews-clientes-tematicos');
  load('/mobilidade-home-link.js','voznews-mobilidade-home-link');

  const path=location.pathname.replace(/\/$/,'');

  if(path===''){
    const titulo=[...document.querySelectorAll('h3')].find(h=>(h.textContent||'').toUpperCase().includes('PAULO OCTÁVIO:'));
    const card=titulo?.closest('.media-card');
    if(card){
      let banner=document.getElementById('banner-legado-40-anos');
      if(!banner){
        banner=document.createElement('article');
        banner.id='banner-legado-40-anos';
        banner.className='media-card promo-card';
        banner.innerHTML=`<div class="media-body" style="min-height:100%;display:flex;flex-direction:column;justify-content:center;background:linear-gradient(135deg,rgba(212,175,55,.18),rgba(18,52,91,.62));border-radius:inherit"><span class="media-source">40 ANOS • SUA HISTÓRIA NA VOZ</span><h3>ESPAÇO RESERVADO PARA SUA EMPRESA, SUA HISTÓRIA E SEU LEGADO</h3><p>Faça parte das mais de 1.000 participações que marcaram os 40 anos da Voz de Brasília. Sua empresa pode ocupar este espaço com entrevista, história, trajetória e posicionamento institucional.</p><div class="interview-links" style="margin-top:18px"><a href="#contato" data-interest="Participar dos 40 anos da Voz de Brasília">QUERO PARTICIPAR / ANUNCIE AGORA →</a></div></div>`;
        card.insertAdjacentElement('afterend',banner);
      }
      if(!document.getElementById('seta-legado-40-anos')){
        const seta=document.createElement('div');
        seta.id='seta-legado-40-anos';
        seta.setAttribute('aria-label','Seta apontando para o espaço reservado para empresas');
        seta.innerHTML='<div class="seta-legado-icone">⬅</div><strong>OLHE ESTE ESPAÇO</strong>';
        banner.insertAdjacentElement('afterend',seta);
      }
      if(!document.getElementById('seta-legado-style')){
        const style=document.createElement('style');
        style.id='seta-legado-style';
        style.textContent=`
          #seta-legado-40-anos{min-height:330px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:transparent;border:0;color:#ffd83d;text-align:center;overflow:visible}
          #seta-legado-40-anos strong{font-size:15px;letter-spacing:1.2px;color:#ffd83d;text-shadow:0 0 12px rgba(255,216,61,.65)}
          .seta-legado-icone{font-size:118px;line-height:1;filter:drop-shadow(0 0 14px rgba(255,216,61,.9));animation:setaLegadoAnim 1.15s ease-in-out infinite}
          @keyframes setaLegadoAnim{0%{opacity:.25;transform:rotate(-16deg) scale(.88)}35%{opacity:1;transform:rotate(10deg) scale(1.08)}70%{opacity:.55;transform:rotate(-8deg) scale(.96)}100%{opacity:1;transform:rotate(0deg) scale(1.04)}}
          @media(max-width:900px){#seta-legado-40-anos{min-height:180px}.seta-legado-icone{font-size:86px}}
          @media(prefers-reduced-motion:reduce){.seta-legado-icone{animation:none!important}}
        `;
        document.head.appendChild(style);
      }
    }
  }

  if(path!=='/moveis-decoracao') return;

  const WHATSAPP='5561999812341';
  const EMAIL='paulofayad@gmail.com';
  const abrir=url=>window.open(url,'_blank','noopener');

  const oficiais={
    'CORETO':'https://coreto.com.br/',
    'CORETO MÓVEIS CORPORATIVOS':'https://coreto.com.br/',
    'BONTEMPO':'https://www.bontempo.com.br/site/lojas',
    'BONTEMPO BRASÍLIA':'https://www.bontempo.com.br/site/lojas',
    'FIBRA':'https://www.sistemafibra.org.br/',
    'SINDIMAM-DF':'https://sindimam.org.br/',
    'ABIMÓVEL':'https://abimovel.com/',
    'ABIMAD':'https://abimad.com.br/',
    'SENAI':'https://www.sistemafibra.org.br/senai/',
    'IEL':'https://www.sistemafibra.org.br/iel/',
    'SENAI & IEL':'https://www.sistemafibra.org.br/',
    'APEXBRASIL':'https://apexbrasil.com.br/',
    'CASACOR':'https://casacor.abril.com.br/pt-BR/mostras/brasilia',
    'MOVELSUL':'https://www.movelsul.com.br/',
    'CASA PARK':'https://casapark.com.br/',
    'ARTEFACTO':'https://artefacto.com.br/lojas/',
    'FLORENSE BRASÍLIA':'https://www.florense.com/es/franquicias/brasilia',
    'MAINLINE':'https://casapark.com.br/loja/sierra-by-mainline/',
    'BRETON BRASÍLIA':'https://www.breton.co/',
    'TOK & STOK BRASÍLIA':'https://www.tokstok.com.br/'
  };

  const editorias={
    'MÓVEIS CORPORATIVOS':oficiais.CORETO,
    'MÓVEIS PLANEJADOS':oficiais.BONTEMPO,
    'ALTA DECORAÇÃO':oficiais['CASA PARK'],
    'DESIGN':oficiais['CASA PARK'],
    'ARQUITETURA':oficiais['CASA PARK'],
    'INTERIORES':oficiais.ARTEFACTO,
    'INDÚSTRIA MOVELEIRA':oficiais['SINDIMAM-DF'],
    'ECONOMIA CRIATIVA':oficiais.FIBRA,
    'TENDÊNCIAS':oficiais.BONTEMPO,
    'SUSTENTABILIDADE':oficiais.CORETO
  };

  const normal=s=>(s||'').replace(/\s+/g,' ').trim().toUpperCase();
  const destinoTexto=txt=>{
    const t=normal(txt);
    for(const [nome,url] of Object.entries(oficiais)) if(t===nome||t.startsWith(nome+' ')||t.includes(' '+nome+' ')||t.endsWith(' '+nome)) return url;
    for(const [nome,url] of Object.entries(editorias)) if(t.includes(nome)) return url;
    if(t.includes('CORPORAT')) return oficiais.CORETO;
    if(t.includes('PLANEJ')) return oficiais.BONTEMPO;
    if(t.includes('ALTA DECORA')||t.includes('DESIGN')||t.includes('ARQUITET')) return oficiais['CASA PARK'];
    if(t.includes('INTERIO')) return oficiais.ARTEFACTO;
    return null;
  };

  if(!document.getElementById('casacor-abertura')){
    const hero=document.querySelector('.hero');
    if(hero){
      const sec=document.createElement('section');sec.id='casacor-abertura';sec.style.cssText='background:#fff;border-bottom:1px solid #dfe7ee;padding:26px 0';
      sec.innerHTML=`<div class="container" style="display:grid;grid-template-columns:minmax(0,1.35fr) minmax(320px,.65fr);gap:0;overflow:hidden;border-radius:30px;border:1px solid #dce5ec;box-shadow:0 18px 45px rgba(41,69,94,.14);background:#fff"><a href="${oficiais.CASACOR}" target="_blank" rel="noopener" style="display:block;min-height:420px;background:url('https://midias.correiobraziliense.com.br/_midias/jpg/2026/08/11/675x450/1_whatsapp-image-2026-08-11-at-12-45-00-67387900.jpeg') center/cover no-repeat" aria-label="Ambiente da CASACOR Brasília 2026"></a><div style="padding:38px;display:flex;flex-direction:column;justify-content:center"><span style="display:inline-flex;width:max-content;padding:8px 12px;border-radius:999px;background:#fff6dc;color:#8a6111;border:1px solid #ecd59a;font-size:11px;font-weight:900;letter-spacing:1px">DESTAQUE NA ABERTURA</span><h2 style="font-size:clamp(34px,4.2vw,56px);line-height:1.02;color:#0d3152;margin:16px 0 10px">34ª CASACOR Brasília 2026</h2><p style="font-size:18px;line-height:1.5;color:#607488;margin:0 0 14px"><strong style="color:#0d3152">Tema: “Mente e Coração”</strong><br>Arquitetura, interiores, design e mobiliário em ambientes que mostram as principais tendências do morar.</p><p style="font-size:17px;line-height:1.5;color:#607488;margin:0 0 20px"><strong style="color:#0d3152">Quando:</strong> 12 de agosto a 12 de outubro de 2026<br><strong style="color:#0d3152">Onde:</strong> Casa do Candango — SGAS 603, Brasília</p><a href="${oficiais.CASACOR}" target="_blank" rel="noopener" class="btn gold" style="width:max-content">ABRIR PÁGINA OFICIAL DA CASACOR ↗</a><small style="margin-top:12px;color:#7a8d9e">Foto: ambiente da CASACOR Brasília 2026 — Edgard Cesar/Divulgação.</small></div></div>`;
      hero.insertAdjacentElement('beforebegin',sec);
      const st=document.createElement('style');st.textContent='@media(max-width:800px){#casacor-abertura .container{grid-template-columns:1fr!important}#casacor-abertura .container>a{min-height:300px!important}}';document.head.appendChild(st);
    }
  }

  const clicavel=(el,url)=>{if(!el||!url)return;el.dataset.voznewsDestino=url;el.setAttribute('role','link');el.setAttribute('tabindex','0');el.style.cursor='pointer'};

  document.querySelectorAll('a').forEach(a=>{
    const t=normal(a.textContent);const d=destinoTexto(t);
    if(d && (a.href.includes('google.')||t.includes('CONHEÇA A CORETO'))){a.href=d;a.target='_blank';a.rel='noopener'}
  });

  document.querySelectorAll('.editoria').forEach(el=>clicavel(el,destinoTexto(el.textContent)));
  document.querySelectorAll('.brand-pill').forEach(el=>clicavel(el,destinoTexto(el.textContent)||oficiais['CASA PARK']));
  document.querySelectorAll('.card').forEach(el=>{if(!el.closest('.coreto'))clicavel(el,destinoTexto(el.textContent)||oficiais['CASA PARK'])});
  document.querySelectorAll('.result').forEach(el=>{const d=destinoTexto(el.textContent);if(d)clicavel(el,d)});

  document.addEventListener('click',e=>{
    const alvo=e.target.closest('.result,.editoria,.brand-pill,.card,a');
    if(!alvo) return;
    let d=alvo.dataset.voznewsDestino||destinoTexto(alvo.textContent);
    if(alvo.tagName==='A' && !alvo.href.includes('google.')) return;
    if(!d) return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();abrir(d);
  },true);

  document.addEventListener('keydown',e=>{
    if(e.key!=='Enter'&&e.key!==' ')return;const alvo=e.target.closest('[data-voznews-destino]');if(!alvo)return;e.preventDefault();abrir(alvo.dataset.voznewsDestino)
  },true);

  const pesquisa=document.getElementById('pesquisa');
  if(pesquisa){
    const searchbox=pesquisa.querySelector('.searchbox');
    const escolher=()=>{
      const input=(searchbox?.querySelector('input')?.value||'').trim();
      const sels=[...(searchbox?.querySelectorAll('select')||[])].map(s=>s.value).join(' ');
      return destinoTexto(input+' '+sels)||oficiais['CASA PARK'];
    };
    if(searchbox){
      searchbox.querySelectorAll('button').forEach(btn=>{btn.onclick=e=>{e.preventDefault();abrir(escolher())}});
      const form=searchbox.closest('form');if(form)form.onsubmit=e=>{e.preventDefault();abrir(escolher())};
      let webBtn=pesquisa.querySelector('[data-busca-web]');
      if(!webBtn){webBtn=document.createElement('button');webBtn.type='button';webBtn.dataset.buscaWeb='1';webBtn.className='btn gold';webBtn.style.marginTop='12px';webBtn.textContent='PESQUISAR EMPRESA OU MÓVEL NO DF';searchbox.insertAdjacentElement('afterend',webBtn)}
      webBtn.onclick=()=>abrir(escolher());
    }

    pesquisa.querySelectorAll('[data-lojas-df],[data-lojas-df="title"]').forEach(x=>x.remove());
    const titulo=document.createElement('div');titulo.dataset.lojasDf='title';titulo.style.cssText='margin-top:26px;font-size:13px;font-weight:900;letter-spacing:.8px;color:#fff';titulo.textContent='ACESSO RÁPIDO — MÓVEIS E DECORAÇÃO NO DISTRITO FEDERAL';
    const wrap=document.createElement('div');wrap.dataset.lojasDf='1';wrap.style.cssText='margin-top:22px;display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px';
    [['CASA PARK',oficiais['CASA PARK']],['CORETO',oficiais.CORETO],['BONTEMPO BRASÍLIA',oficiais['BONTEMPO BRASÍLIA']],['FLORENSE BRASÍLIA',oficiais['FLORENSE BRASÍLIA']],['ARTEFACTO',oficiais.ARTEFACTO],['MAINLINE',oficiais.MAINLINE],['BRETON BRASÍLIA',oficiais['BRETON BRASÍLIA']],['TOK & STOK BRASÍLIA',oficiais['TOK & STOK BRASÍLIA']]].forEach(([nome,url])=>{const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener';a.className='result';a.style.cssText='display:block;text-decoration:none;cursor:pointer';a.innerHTML=`<strong>${nome}</strong><small>Abrir site oficial ↗</small>`;wrap.appendChild(a)});
    const webBtn=pesquisa.querySelector('[data-busca-web]');if(webBtn){webBtn.insertAdjacentElement('afterend',titulo);titulo.insertAdjacentElement('afterend',wrap)}
  }

  const textoForm=(form,titulo)=>{const d=new FormData(form),linhas=[titulo,''];for(const [k,v] of d.entries())linhas.push(`${k.toUpperCase()}: ${v}`);return linhas.join('\n')};
  const assunto=t=>t.includes('Proposta')?'Proposta comercial — Voz News Móveis & Decoração':'Contato — Voz News Móveis & Decoração';
  const urlW=(f,t)=>`https://web.whatsapp.com/send/?phone=${WHATSAPP}&text=${encodeURIComponent(textoForm(f,t))}&type=phone_number&app_absent=0`;
  const urlG=(f,t)=>`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(assunto(t))}&body=${encodeURIComponent(textoForm(f,t))}`;
  const preparar=(id,titulo)=>{const form=document.getElementById(id);if(!form)return;const submit=form.querySelector('button[type="submit"]');if(!submit)return;let status=form.querySelector('[data-envio-status]');if(!status){status=document.createElement('div');status.dataset.envioStatus='1';status.className='full';status.style.cssText='font-size:13px;font-weight:700;color:#49657d;margin-top:2px';submit.insertAdjacentElement('beforebegin',status)}submit.textContent='ABRIR WHATSAPP + E-MAIL';form.onsubmit=e=>{e.preventDefault();status.textContent='Abrindo WhatsApp e e-mail com a mensagem preenchida...';window.open(urlG(form,titulo),'_blank','noopener');window.location.href=urlW(form,titulo)};let email=form.querySelector('[data-email-direto]');if(!email){email=document.createElement('button');email.type='button';email.dataset.emailDireto='1';email.className='btn light full';submit.insertAdjacentElement('afterend',email)}email.textContent='ABRIR E-MAIL PRONTO PARA ENVIAR';email.onclick=e=>{e.preventDefault();status.textContent='Abrindo o Gmail com destinatário e mensagem preenchidos...';window.open(urlG(form,titulo),'_blank','noopener')}};
  preparar('formContato','Fale Conosco — Voz News Móveis & Decoração');
  preparar('formAnuncie','Proposta Comercial — Voz News Móveis & Decoração');
})();