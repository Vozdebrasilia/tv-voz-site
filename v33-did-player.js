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
  video.muted=false;
  video.volume=1;
  video.disablePictureInPicture=true;
  video.setAttribute('playsinline','');
  video.style.setProperty('position','absolute','important');
  video.style.setProperty('inset','0','important');
  video.style.setProperty('width','100%','important');
  video.style.setProperty('height','100%','important');
  video.style.setProperty('object-fit','contain','important');
  video.style.setProperty('object-position','center bottom','important');
  video.style.setProperty('z-index','3','important');
  video.style.setProperty('background','transparent','important');
  video.style.setProperty('pointer-events','none','important');
  video.style.setProperty('display','block','important');
  video.style.setProperty('opacity','0','important');
  video.style.setProperty('visibility','hidden','important');
  host.appendChild(video);

  const showImage=()=>{
    image.style.setProperty('visibility','visible','important');
    image.style.setProperty('opacity','1','important');
  };
  const showVideo=()=>{
    image.style.setProperty('visibility','hidden','important');
    video.style.setProperty('display','block','important');
    video.style.setProperty('opacity','1','important');
    video.style.setProperty('visibility','visible','important');
  };
  const hideVideo=()=>{
    video.style.setProperty('opacity','0','important');
    video.style.setProperty('visibility','hidden','important');
  };
  const reset=()=>{
    try{video.pause();video.currentTime=0}catch{}
    hideVideo();
    showImage();
    setStatus('Pronto para iniciar.');
  };
  const start=async event=>{
    event?.preventDefault?.();
    event?.stopImmediatePropagation?.();
    overlay?.classList.remove('show');
    try{
      if(video.readyState<2) video.load();
      video.currentTime=0;
      showVideo();
      setStatus('Dra. Deijanete Fayad no ar.');
      await video.play();
    }catch(e){
      reset();
      overlay?.classList.add('show');
      setStatus('Clique novamente para iniciar.');
    }
  };

  video.addEventListener('loadeddata',()=>setStatus('Prévia pronta para iniciar.'));
  video.addEventListener('ended',()=>{hideVideo();showImage();setStatus('Prévia concluída.');});
  video.addEventListener('error',()=>{reset();setStatus('Prévia temporariamente indisponível.');});

  setDisabled('startLiveNews',false);
  setDisabled('enterLiveButton',false);
  setDisabled('stopLiveNews',false);
  setDisabled('nextHeadline',true);
  document.getElementById('startLiveNews')?.addEventListener('click',start,true);
  document.getElementById('enterLiveButton')?.addEventListener('click',start,true);
  document.getElementById('stopLiveNews')?.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();reset();},true);
  overlay?.classList.add('show');
  setStatus('Prévia controlada pronta.');
})();
