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
