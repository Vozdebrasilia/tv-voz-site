/* Campanha oficial DETRAN-DF | PI 385481 | 20–26/10/2026 */
(function(){
  const now=new Date();
  const day=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
  if(day<'2026-10-20'||day>'2026-10-26')return;
  const show=()=>{
    if(document.getElementById('ibj-detran-385481'))return;
    const container=document.createElement('aside');
    container.id='ibj-detran-385481';
    container.setAttribute('aria-label','Publicidade institucional DETRAN-DF');
    container.style.cssText='position:relative;z-index:30;background:#fff;text-align:center;padding:10px 8px;border-bottom:1px solid #e5e7eb;box-sizing:border-box;width:100%';
    container.innerHTML='<a href="https://youtu.be/2i33OO9AKuU" target="_blank" rel="noopener noreferrer" aria-label="Campanha Segurança do Motociclista DETRAN-DF"><img src="https://cdn.creativeclaw.co/u/d4de7256/images/1a3c8e5c-0711-49ce-a657-3e28aa020de9.gif" width="728" height="90" alt="DETRAN-DF — Segurança do Motociclista 2026" style="width:min(100%,728px);height:auto;display:block;margin:0 auto" /></a>';
    document.body.insertBefore(container,document.body.firstChild);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',show,{once:true});else show();
})();