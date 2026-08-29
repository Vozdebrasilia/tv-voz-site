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

    document.querySelectorAll('a').forEach((a)=>{
      const texto=(a.textContent||'').trim().toUpperCase();
      const href=a.getAttribute('href')||'';
      if(texto.includes('CONHEÇA A CORETO') || (href.includes('google.com') && href.toLowerCase().includes('coreto'))){
        a.href='https://coreto.com.br/';
        a.target='_blank';
        a.rel='noopener';
      }
    });

    const tornarClicavel=(el,url)=>{
      if(!el || el.dataset.voznewsLink==='1') return;
      el.dataset.voznewsLink='1';
      el.setAttribute('role','link');
      el.setAttribute('tabindex','0');
      el.style.cursor='pointer';
      el.addEventListener('click',(e)=>{
        if(e.target.closest('a,button,input,select,textarea')) return;
        abrir(url);
      });
      el.addEventListener('keydown',(e)=>{
        if(e.key==='Enter' || e.key===' '){ e.preventDefault(); abrir(url); }
      });
    };

    document.querySelectorAll('.editoria').forEach((el)=>{
      const nome=(el.querySelector('strong')?.textContent || el.textContent || '').trim();
      tornarClicavel(el,google(`${nome} móveis decoração Brasília DF lojas empresas`));
    });

    document.querySelectorAll('.card').forEach((el)=>{
      if(el.closest('.coreto')) return;
      const nome=(el.querySelector('h3')?.textContent || el.textContent || '').trim();
      tornarClicavel(el,google(`${nome} Brasília DF móveis decoração`));
    });

    const linksMarcas={
      'CORETO':'https://coreto.com.br/',
      'BONTEMPO':'https://www.bontempo.com.br/site/lojas',
      'FIBRA':google('FIBRA móveis decoração Brasília DF'),
      'SINDIMAM-DF':google('SINDIMAM DF móveis'),
      'ABIMÓVEL':'https://abimovel.com/',
      'ABIMAD':'https://abimad.com.br/',
      'CASACOR':'https://casacor.abril.com.br/',
      'MOVELSUL':'https://www.movelsul.com.br/',
      'SENAI':'https://www.portaldaindustria.com.br/senai/',
      'IEL':'https://www.portaldaindustria.com.br/iel/',
      'APEXBRASIL':'https://apexbrasil.com.br/',
      'CASA PARK':'https://casapark.com.br/',
      'PARK DESIGN':google('Park Design Shopping Brasília móveis decoração')
    };

    const marquees=document.querySelectorAll('.marquee');
    marquees.forEach((marquee)=>{
      ['CASA PARK','PARK DESIGN'].forEach((nome)=>{
        if(![...marquee.querySelectorAll('.brand-pill')].some(x=>(x.textContent||'').trim().toUpperCase()===nome)){
          const p=document.createElement('span');
          p.className='brand-pill';
          p.textContent=nome;
          marquee.appendChild(p);
        }
      });
    });

    document.querySelectorAll('.brand-pill').forEach((el)=>{
      const nome=(el.textContent||'').trim().toUpperCase();
      tornarClicavel(el,linksMarcas[nome] || google(`${nome} Brasília DF móveis decoração`));
    });

    const pesquisa=document.getElementById('pesquisa');
    if(pesquisa){
      const searchbox=pesquisa.querySelector('.searchbox');
      if(searchbox && !pesquisa.querySelector('[data-busca-web]')){
        const webBtn=document.createElement('button');
        webBtn.type='button';
        webBtn.dataset.buscaWeb='1';
        webBtn.className='btn gold';
        webBtn.style.marginTop='12px';
        webBtn.textContent='PESQUISAR EMPRESA OU MÓVEL NO DF';
        webBtn.onclick=()=>{
          const input=searchbox.querySelector('input');
          const selects=[...searchbox.querySelectorAll('select')].map(s=>s.value).filter(Boolean);
          const termo=((input?.value||'').trim() || 'móveis decoração')+' '+selects.join(' ')+' Brasília DF';
          abrir(google(termo));
        };
        searchbox.insertAdjacentElement('afterend',webBtn);
      }

      if(!pesquisa.querySelector('[data-lojas-df]')){
        const wrap=document.createElement('div');
        wrap.dataset.lojasDf='1';
        wrap.style.cssText='margin-top:22px;display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px';
        const lojas=[
          ['CASA PARK','https://casapark.com.br/'],
          ['PARK DESIGN',google('Park Design Shopping Brasília móveis decoração')],
          ['CORETO','https://coreto.com.br/'],
          ['BONTEMPO BRASÍLIA','https://www.bontempo.com.br/site/lojas'],
          ['FLORENSE BRASÍLIA','https://www.florense.com/es/franquicias/brasilia'],
          ['ARTEFACTO','https://artefacto.com.br/lojas/'],
          ['MAINLINE','https://casapark.com.br/loja/sierra-by-mainline/'],
          ['BRETON BRASÍLIA',google('Breton Brasília móveis decoração')],
          ['LÍDER INTERIORES',google('Líder Interiores Brasília DF')],
          ['TOK & STOK BRASÍLIA',google('Tok Stok Brasília DF móveis decoração')]
        ];
        lojas.forEach(([nome,url])=>{
          const a=document.createElement('a');
          a.href=url;
          a.target='_blank';
          a.rel='noopener';
          a.className='result';
          a.style.cssText='display:block;text-decoration:none;cursor:pointer';
          a.innerHTML=`<strong>${nome}</strong><small>Abrir loja, polo ou pesquisa relacionada ↗</small>`;
          wrap.appendChild(a);
        });
        const titulo=document.createElement('div');
        titulo.dataset.lojasDf='title';
        titulo.style.cssText='margin-top:26px;font-size:13px;font-weight:900;letter-spacing:.8px;color:#fff';
        titulo.textContent='ACESSO RÁPIDO — MÓVEIS E DECORAÇÃO NO DISTRITO FEDERAL';
        const webBtn=pesquisa.querySelector('[data-busca-web]');
        if(webBtn){
          webBtn.insertAdjacentElement('afterend',titulo);
          titulo.insertAdjacentElement('afterend',wrap);
        } else {
          pesquisa.appendChild(titulo);
          pesquisa.appendChild(wrap);
        }
      }
    }

    document.querySelectorAll('.result').forEach((el)=>{
      if(el.tagName==='A') return;
      const nome=(el.querySelector('strong')?.textContent || el.textContent || '').trim();
      tornarClicavel(el,google(`${nome} Brasília DF móveis decoração`));
    });

    const textoForm=(form,titulo)=>{
      const d=new FormData(form);
      const linhas=[titulo,''];
      for(const [k,v] of d.entries()) linhas.push(`${k.toUpperCase()}: ${v}`);
      return linhas.join('\n');
    };

    const assuntoDe=(titulo)=>titulo.includes('Proposta')
      ? 'Proposta comercial — Voz News Móveis & Decoração'
      : 'Contato — Voz News Móveis & Decoração';

    const urlWhatsApp=(form,titulo)=>{
      const texto=textoForm(form,titulo);
      return `https://web.whatsapp.com/send/?phone=${WHATSAPP}&text=${encodeURIComponent(texto)}&type=phone_number&app_absent=0`;
    };

    const urlGmail=(form,titulo)=>{
      const assunto=assuntoDe(titulo);
      const corpo=textoForm(form,titulo);
      return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    };

    const preparar=(formId,titulo)=>{
      const form=document.getElementById(formId);
      if(!form) return;
      const submit=form.querySelector('button[type="submit"]');
      if(!submit) return;

      let status=form.querySelector('[data-envio-status]');
      if(!status){
        status=document.createElement('div');
        status.dataset.envioStatus='1';
        status.className='full';
        status.style.cssText='font-size:13px;font-weight:700;color:#49657d;margin-top:2px';
        submit.insertAdjacentElement('beforebegin',status);
      }

      submit.textContent='ABRIR WHATSAPP + E-MAIL';
      submit.onclick=null;
      form.onsubmit=(e)=>{
        e.preventDefault();
        status.textContent='Abrindo WhatsApp e e-mail com a mensagem preenchida...';
        window.open(urlGmail(form,titulo),'_blank','noopener');
        window.location.href=urlWhatsApp(form,titulo);
      };

      let email=form.querySelector('[data-email-direto]');
      if(!email){
        email=document.createElement('button');
        email.type='button';
        email.dataset.emailDireto='1';
        email.className='btn light full';
        submit.insertAdjacentElement('afterend',email);
      }
      email.removeAttribute('href');
      email.textContent='ABRIR E-MAIL PRONTO PARA ENVIAR';
      email.onclick=(e)=>{
        e.preventDefault();
        status.textContent='Abrindo o Gmail com destinatário e mensagem preenchidos...';
        window.open(urlGmail(form,titulo),'_blank','noopener');
      };
    };

    preparar('formContato','Fale Conosco — Voz News Móveis & Decoração');
    preparar('formAnuncie','Proposta Comercial — Voz News Móveis & Decoração');
  }
})();
