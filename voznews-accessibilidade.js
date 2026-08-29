(() => {
  const load=(src,id)=>{
    if(document.getElementById(id)) return;
    const s=document.createElement('script');
    s.id=id;
    s.src=src;
    s.async=false;
    document.head.appendChild(s);
  };
  load('/voznews-accessibilidade-core.js','voznews-accessibilidade-core');
  load('/ecossistema-40-portais.js','voznews-ecossistema-40-portais');
  load('/clientes-tematicos.js','voznews-clientes-tematicos');
  load('/mobilidade-home-link.js','voznews-mobilidade-home-link');

  if(location.pathname.replace(/\/$/,'')==='/moveis-decoracao'){
    const WHATSAPP='5561999812341';
    const EMAIL='paulofayad@gmail.com';
    const google=(q)=>`https://www.google.com/search?q=${encodeURIComponent(q)}`;
    const abrir=(url)=>window.open(url,'_blank','noopener');

    const linksOficiais={
      'CORETO':'https://coreto.com.br/',
      'BONTEMPO':'https://www.bontempo.com.br/site/lojas',
      'FIBRA':'https://www.sistemafibra.org.br/',
      'SINDIMAM-DF':'https://sindimam.org.br/',
      'ABIMÓVEL':'https://abimovel.com/',
      'ABIMAD':'https://abimad.com.br/',
      'SENAI':'https://www.sistemafibra.org.br/senai/',
      'IEL':'https://www.sistemafibra.org.br/iel/',
      'SENAI & IEL':'https://www.sistemafibra.org.br/',
      'APEXBRASIL':'https://apexbrasil.com.br/',
      'CASACOR':'https://casacor.abril.com.br/',
      'MOVELSUL':'https://www.movelsul.com.br/',
      'CASA PARK':'https://casapark.com.br/',
      'ARTEFACTO':'https://artefacto.com.br/lojas/',
      'FLORENSE BRASÍLIA':'https://www.florense.com/es/franquicias/brasilia',
      'MAINLINE':'https://casapark.com.br/loja/sierra-by-mainline/',
      'BRETON BRASÍLIA':'https://www.breton.co/',
      'TOK & STOK BRASÍLIA':'https://www.tokstok.com.br/'
    };

    document.querySelectorAll('a').forEach((a)=>{
      const texto=(a.textContent||'').trim().toUpperCase();
      if(texto.includes('CONHEÇA A CORETO')){
        a.href=linksOficiais.CORETO;
        a.target='_blank';
        a.rel='noopener';
      }
    });

    const tornarClicavel=(el,url)=>{
      if(!el) return;
      el.dataset.voznewsLink='1';
      el.setAttribute('role','link');
      el.setAttribute('tabindex','0');
      el.style.cursor='pointer';
      el.onclick=(e)=>{ if(!e.target.closest('a,button,input,select,textarea')) abrir(url); };
      el.onkeydown=(e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); abrir(url); } };
    };

    const editoriaDestino={
      'MÓVEIS CORPORATIVOS':'https://coreto.com.br/',
      'MÓVEIS PLANEJADOS':'https://www.bontempo.com.br/site/lojas',
      'ALTA DECORAÇÃO':'https://casapark.com.br/',
      'DESIGN':'https://casapark.com.br/',
      'ARQUITETURA':'https://casapark.com.br/',
      'INTERIORES':'https://artefacto.com.br/lojas/',
      'INDÚSTRIA MOVELEIRA':'https://sindimam.org.br/',
      'ECONOMIA CRIATIVA':'https://www.sistemafibra.org.br/',
      'TENDÊNCIAS':'https://www.bontempo.com.br/site/lojas',
      'SUSTENTABILIDADE':'https://coreto.com.br/'
    };

    document.querySelectorAll('.editoria').forEach((el)=>{
      const nome=(el.querySelector('strong')?.textContent || '').trim().toUpperCase();
      tornarClicavel(el,editoriaDestino[nome] || 'https://casapark.com.br/');
    });

    document.querySelectorAll('.card').forEach((el)=>{
      if(el.closest('.coreto')) return;
      const nome=(el.querySelector('h3')?.textContent || '').trim().toUpperCase();
      const destino=linksOficiais[nome] || (nome.includes('PLANEJ') ? linksOficiais.BONTEMPO : nome.includes('CORPORAT') ? linksOficiais.CORETO : 'https://casapark.com.br/');
      tornarClicavel(el,destino);
    });

    const marquees=document.querySelectorAll('.marquee');
    marquees.forEach((marquee)=>{
      ['CASA PARK'].forEach((nome)=>{
        if(![...marquee.querySelectorAll('.brand-pill')].some(x=>(x.textContent||'').trim().toUpperCase()===nome)){
          const p=document.createElement('span'); p.className='brand-pill'; p.textContent=nome; marquee.appendChild(p);
        }
      });
    });

    document.querySelectorAll('.brand-pill').forEach((el)=>{
      const nome=(el.textContent||'').trim().toUpperCase();
      tornarClicavel(el,linksOficiais[nome] || 'https://casapark.com.br/');
    });

    const pesquisa=document.getElementById('pesquisa');
    if(pesquisa){
      const searchbox=pesquisa.querySelector('.searchbox');
      if(searchbox && !pesquisa.querySelector('[data-busca-web]')){
        const webBtn=document.createElement('button');
        webBtn.type='button'; webBtn.dataset.buscaWeb='1'; webBtn.className='btn gold'; webBtn.style.marginTop='12px';
        webBtn.textContent='PESQUISAR EMPRESA OU MÓVEL NO DF';
        webBtn.onclick=()=>{
          const input=(searchbox.querySelector('input')?.value||'').trim().toLowerCase();
          const cat=(searchbox.querySelectorAll('select')[1]?.value||'').toLowerCase();
          let destino='https://casapark.com.br/';
          const termo=input+' '+cat;
          if(termo.includes('corporat')) destino=linksOficiais.CORETO;
          else if(termo.includes('planejad')) destino=linksOficiais.BONTEMPO;
          else if(termo.includes('alta')||termo.includes('decora')||termo.includes('design')) destino='https://casapark.com.br/';
          abrir(destino);
        };
        searchbox.insertAdjacentElement('afterend',webBtn);
      }

      const antigo=pesquisa.querySelector('[data-lojas-df]'); if(antigo) antigo.remove();
      const antigoTitulo=pesquisa.querySelector('[data-lojas-df="title"]'); if(antigoTitulo) antigoTitulo.remove();
      const wrap=document.createElement('div');
      wrap.dataset.lojasDf='1';
      wrap.style.cssText='margin-top:22px;display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px';
      const lojas=[
        ['CASA PARK','https://casapark.com.br/'],
        ['CORETO','https://coreto.com.br/'],
        ['BONTEMPO BRASÍLIA','https://www.bontempo.com.br/site/lojas'],
        ['FLORENSE BRASÍLIA','https://www.florense.com/es/franquicias/brasilia'],
        ['ARTEFACTO','https://artefacto.com.br/lojas/'],
        ['MAINLINE','https://casapark.com.br/loja/sierra-by-mainline/'],
        ['BRETON BRASÍLIA','https://www.breton.co/'],
        ['TOK & STOK BRASÍLIA','https://www.tokstok.com.br/']
      ];
      lojas.forEach(([nome,url])=>{
        const a=document.createElement('a'); a.href=url; a.target='_blank'; a.rel='noopener'; a.className='result';
        a.style.cssText='display:block;text-decoration:none;cursor:pointer';
        a.innerHTML=`<strong>${nome}</strong><small>Abrir site oficial ↗</small>`; wrap.appendChild(a);
      });
      const titulo=document.createElement('div'); titulo.dataset.lojasDf='title';
      titulo.style.cssText='margin-top:26px;font-size:13px;font-weight:900;letter-spacing:.8px;color:#fff';
      titulo.textContent='ACESSO RÁPIDO — MÓVEIS E DECORAÇÃO NO DISTRITO FEDERAL';
      const webBtn=pesquisa.querySelector('[data-busca-web]');
      if(webBtn){ webBtn.insertAdjacentElement('afterend',titulo); titulo.insertAdjacentElement('afterend',wrap); }

      document.querySelectorAll('.result').forEach((el)=>{
        if(el.tagName==='A') return;
        const nome=(el.querySelector('strong')?.textContent || '').trim().toUpperCase();
        const destino=linksOficiais[nome] || (nome.includes('SENAI') ? linksOficiais['SENAI & IEL'] : null);
        if(destino) tornarClicavel(el,destino);
      });
    }

    const textoForm=(form,titulo)=>{
      const d=new FormData(form); const linhas=[titulo,''];
      for(const [k,v] of d.entries()) linhas.push(`${k.toUpperCase()}: ${v}`);
      return linhas.join('\n');
    };
    const assuntoDe=(titulo)=>titulo.includes('Proposta')?'Proposta comercial — Voz News Móveis & Decoração':'Contato — Voz News Móveis & Decoração';
    const urlWhatsApp=(form,titulo)=>`https://web.whatsapp.com/send/?phone=${WHATSAPP}&text=${encodeURIComponent(textoForm(form,titulo))}&type=phone_number&app_absent=0`;
    const urlGmail=(form,titulo)=>`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(assuntoDe(titulo))}&body=${encodeURIComponent(textoForm(form,titulo))}`;
    const preparar=(formId,titulo)=>{
      const form=document.getElementById(formId); if(!form) return;
      const submit=form.querySelector('button[type="submit"]'); if(!submit) return;
      let status=form.querySelector('[data-envio-status]');
      if(!status){ status=document.createElement('div'); status.dataset.envioStatus='1'; status.className='full'; status.style.cssText='font-size:13px;font-weight:700;color:#49657d;margin-top:2px'; submit.insertAdjacentElement('beforebegin',status); }
      submit.textContent='ABRIR WHATSAPP + E-MAIL'; submit.onclick=null;
      form.onsubmit=(e)=>{ e.preventDefault(); status.textContent='Abrindo WhatsApp e e-mail com a mensagem preenchida...'; window.open(urlGmail(form,titulo),'_blank','noopener'); window.location.href=urlWhatsApp(form,titulo); };
      let email=form.querySelector('[data-email-direto]');
      if(!email){ email=document.createElement('button'); email.type='button'; email.dataset.emailDireto='1'; email.className='btn light full'; submit.insertAdjacentElement('afterend',email); }
      email.removeAttribute('href'); email.textContent='ABRIR E-MAIL PRONTO PARA ENVIAR';
      email.onclick=(e)=>{ e.preventDefault(); status.textContent='Abrindo o Gmail com destinatário e mensagem preenchidos...'; window.open(urlGmail(form,titulo),'_blank','noopener'); };
    };
    preparar('formContato','Fale Conosco — Voz News Móveis & Decoração');
    preparar('formAnuncie','Proposta Comercial — Voz News Móveis & Decoração');
  }
})();
