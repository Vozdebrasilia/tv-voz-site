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

    const garantirIframe=()=>{
      let frame=document.getElementById('voznews-email-frame');
      if(!frame){
        frame=document.createElement('iframe');
        frame.id='voznews-email-frame';
        frame.name='voznews-email-frame';
        frame.style.display='none';
        document.body.appendChild(frame);
      }
      return frame;
    };

    const enviarEmail=(form,titulo,status)=>{
      garantirIframe();
      const envio=document.createElement('form');
      envio.method='POST';
      envio.action=`https://formsubmit.co/${EMAIL}`;
      envio.target='voznews-email-frame';
      envio.style.display='none';

      const add=(name,value)=>{
        const i=document.createElement('input');
        i.type='hidden'; i.name=name; i.value=value;
        envio.appendChild(i);
      };

      add('_subject',assuntoDe(titulo));
      add('_template','table');
      add('_captcha','false');
      add('_next','https://www.voznewsbrasil.com.br/moveis-decoracao');
      add('origem','Voz News Móveis & Decoração');
      add('mensagem',textoForm(form,titulo));
      for(const [k,v] of new FormData(form).entries()) add(k,v);

      document.body.appendChild(envio);
      envio.submit();
      setTimeout(()=>envio.remove(),1500);
      if(status) status.textContent='Mensagem encaminhada para '+EMAIL+'.';
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
      form.onsubmit=(e)=>{
        e.preventDefault();
        status.textContent='Enviando...';
        enviarEmail(form,titulo,status);
        setTimeout(()=>abrirWhatsApp(form,titulo),250);
      };

      let email=form.querySelector('[data-email-direto]');
      if(!email){
        email=document.createElement('button');
        email.type='button';
        email.dataset.emailDireto='1';
        email.className='btn light full';
        email.textContent='ENVIAR SOMENTE POR E-MAIL';
        submit.insertAdjacentElement('afterend',email);
      }
      email.removeAttribute('href');
      email.textContent='ENVIAR SOMENTE POR E-MAIL';
      email.onclick=(e)=>{
        e.preventDefault();
        status.textContent='Enviando e-mail...';
        enviarEmail(form,titulo,status);
      };
    };

    preparar('formContato','Fale Conosco — Voz News Móveis & Decoração');
    preparar('formAnuncie','Proposta Comercial — Voz News Móveis & Decoração');
  }
})();
