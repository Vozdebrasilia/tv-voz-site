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

    const preparar=(formId,titulo)=>{
      const form=document.getElementById(formId);
      if(!form) return;
      const submit=form.querySelector('button[type="submit"]');
      if(!submit) return;

      submit.textContent='ENVIAR PELO WHATSAPP';
      submit.onclick=null;
      form.onsubmit=(e)=>{
        e.preventDefault();
        const texto=textoForm(form,titulo);
        window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`,'_blank','noopener');
      };

      if(!form.querySelector('[data-email-direto]')){
        const email=document.createElement('a');
        email.href='#';
        email.dataset.emailDireto='1';
        email.className='btn light full';
        email.textContent='ENVIAR POR E-MAIL';
        email.addEventListener('click',(e)=>{
          e.preventDefault();
          const texto=textoForm(form,titulo);
          const assunto=titulo.includes('Proposta')?'Proposta comercial — Voz News Móveis & Decoração':'Contato — Voz News Móveis & Decoração';
          location.href=`mailto:${EMAIL}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(texto)}`;
        });
        submit.insertAdjacentElement('afterend',email);
      }
    };

    preparar('formContato','Fale Conosco — Voz News Móveis & Decoração');
    preparar('formAnuncie','Proposta Comercial — Voz News Móveis & Decoração');
  }
})();
