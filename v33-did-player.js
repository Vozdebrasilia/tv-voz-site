(() => {
  'use strict';
  const studio=document.getElementById('tv-ao-vivo');
  const status=document.getElementById('studioStatus');
  const overlay=document.getElementById('enterLiveOverlay');
  if(!studio) return;

  studio.classList.remove('v33-media-ready');
  studio.querySelectorAll('.v33-presenter-video,.v33-did-video').forEach(el=>el.remove());
  const setStatus=t=>{if(status) status.textContent=t};
  const ids=['startLiveNews','enterLiveButton','nextHeadline','stopLiveNews'];
  const setDisabled=(id,value)=>{const b=document.getElementById(id);if(!b)return;b.disabled=value;b.setAttribute('aria-disabled',String(value));};

  const testMode=new URLSearchParams(location.search).get('v33test')==='1';
  if(!testMode){
    studio.classList.add('v33-static-presenters');
    ids.forEach(id=>setDisabled(id,true));
    overlay?.classList.remove('show');
    setStatus('Apresentadores em imagem real.');
    return;
  }

  studio.classList.remove('v33-static-presenters');
  const host=document.getElementById('idleDeijanete');
  const image=host?.querySelector('.studio-presenter-image');
  if(!host||!image) return;

  const video=document.createElement('video');
  video.className='v33-presenter-video';
  video.src='/api/v33-test-media?id=tlk_vDcHm8tttp6BlDfWUtWp0';
  video.preload='auto';
  video.playsInline=true;
  video.controls=false;
  video.disablePictureInPicture=true;
  Object.assign(video.style,{position:'absolute',inset:'0',width:'100%',height:'100%',objectFit:'contain',objectPosition:'center bottom',zIndex:'3',background:'transparent',display:'none'});
  host.appendChild(video);

  const reset=()=>{try{video.pause();video.currentTime=0}catch{};video.style.display='none';image.style.visibility='visible';setStatus('Pronto para iniciar.');};
  const start=()=>{
    overlay?.classList.remove('show');
    image.style.visibility='hidden';
    video.style.display='block';
    video.currentTime=0;
    setStatus('Dra. Deijanete Fayad no ar.');
    video.play().catch(()=>{reset();overlay?.classList.add('show');});
  };
  video.addEventListener('ended',()=>{image.style.visibility='visible';video.style.display='none';setStatus('Prévia concluída.');});
  video.addEventListener('error',()=>{reset();setStatus('Prévia temporariamente indisponível.');});

  setDisabled('startLiveNews',false);
  setDisabled('enterLiveButton',false);
  setDisabled('stopLiveNews',false);
  setDisabled('nextHeadline',true);
  document.getElementById('startLiveNews')?.addEventListener('click',start);
  document.getElementById('enterLiveButton')?.addEventListener('click',start);
  document.getElementById('stopLiveNews')?.addEventListener('click',reset);
  overlay?.classList.add('show');
  setStatus('Prévia controlada pronta.');
})();
