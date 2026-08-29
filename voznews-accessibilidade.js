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

    const enviarEmail=async(form,titulo,status)=>{
      const payload={
        _subject: assuntoDe(titulo),
        _template: 'table',
        _captcha: 'false',
        origem: 'Voz News Móveis & Decoração',
        mensagem: textoForm(form,titulo)
      };
      for(const [k,v] of new FormData(form).entries()) payload[k]=v;
      try{
        const r=await fetch(`https://formsubmit.co/ajax/${EMAIL}`,{
          method:'POST',
          headers:{'Content-Type':'application/json','Accept':'application/json'},
          body:JSON.stringify(payload)
        });
        if(!r.ok) throw new Error('Falha no envio');
        if(status) status.textContent='E-mail encaminhado para '+EMAIL+'.';
        return true;
      }catch(err){
        if(status) status.textContent='Não foi possível confirmar o e-mail agora. Tente novamente.';
        return false;
      }
    };

    const abrirWhatsApp=(form,titulo)=>{
      const texto=textoForm(form,titulo);
      location.href=`whatsapp://send?phone=${WHATSAPP}&text=${encodeURIComponent(texto)}`;
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

      submit.textContent='ENVIAR PELO WHATSAPP + E-MAIL';
      submit.onclick=null;
      form.onsubmit=async(e)=>{
        e.preventDefault();
        status.textContent='Enviando e-mail e abrindo o WhatsApp...';
        enviarEmail(form,titulo,status);
        setTimeout(()=>abrirWhatsApp(form,titulo),120);
      };

      let email=form.querySelector('[data-email-direto]');
      if(!email){
        email=document.createElement('button');
        email.type='button';
        email.dataset.emailDireto='1';
        email.className='btn light full';
        email.textContent='ENVIAR SOMENTE POR E-MAIL';
        email.addEventListener('click',async()=>{
          status.textContent='Enviando e-mail...';
          await enviarEmail(form,titulo,status);
        });
        submit.insertAdjacentElement('afterend',email);
      }else{
        email.removeAttribute('href');
        email.textContent='ENVIAR SOMENTE POR E-MAIL';
        email.onclick=async(e)=>{
          e.preventDefault();
          status.textContent='Enviando e-mail...';
          await enviarEmail(form,titulo,status);
        };
      }
    };

    preparar('formContato','Fale Conosco — Voz News Móveis & Decoração');
    preparar('formAnuncie','Proposta Comercial — Voz News Móveis & Decoração');
  }
})();
