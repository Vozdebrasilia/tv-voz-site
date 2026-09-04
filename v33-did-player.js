(() => {
  const playlist = [
    { presenter:'paulo', src:'./assets/v33-original/01-paulo-ola.mp4' },
    { presenter:'deijanete', src:'./assets/v33-original/02-deijanete-ola.mp4' }
  ];
  const deijanete=document.getElementById('idleDeijanete');
  const paulo=document.getElementById('idlePaulo');
  const status=document.getElementById('studioStatus');
  const overlay=document.getElementById('enterLiveOverlay');
  const startButton=document.getElementById('startLiveNews');
  const enterButton=document.getElementById('enterLiveButton');
  const didLoading=document.getElementById('didLoading');
  if(!deijanete||!paulo)return;

  document.getElementById('v33-presenter-fix')?.remove();
  deijanete.querySelectorAll('.v33-did-video').forEach(v=>v.remove());
  paulo.querySelectorAll('.v33-did-video').forEach(v=>v.remove());
  if(startButton)startButton.textContent='▶ INICIAR JORNAL AO VIVO';
  if(enterButton)enterButton.textContent='▶ ENTRAR NO JORNAL AO VIVO';
  const overlayText=overlay?.querySelector('span');
  if(overlayText)overlayText.textContent='Clique uma vez para iniciar a apresentação.';
  if(didLoading)didLoading.style.display='none';
  [startButton,enterButton,document.getElementById('nextHeadline'),document.getElementById('stopLiveNews')].forEach(b=>{if(b){b.hidden=false;b.disabled=false;b.removeAttribute('aria-disabled');b.style.display='';}});

  const css=document.createElement('style');
  css.id='v33-presenter-fix';
  css.textContent=`
    #tv-ao-vivo .did-loading{display:none!important}
    #tv-ao-vivo .studio-presenters{position:absolute!important;inset:0!important;overflow:hidden!important;pointer-events:none!important}
    #tv-ao-vivo .studio-presenter{position:absolute!important;top:18%!important;width:30%!important;height:63%!important;display:block!important;overflow:visible!important;opacity:1!important;visibility:visible!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;filter:none!important}
    #tv-ao-vivo .idle-deijanete{left:16%!important}
    #tv-ao-vivo .idle-paulo{left:54%!important}
    #tv-ao-vivo .studio-presenter-image,#tv-ao-vivo .idle-avatar-body{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center bottom!important;display:block!important;opacity:1!important;visibility:visible!important;background:transparent!important;border:0!important;border-radius:0!important;filter:none!important;z-index:9!important;will-change:transform!important}
    #tv-ao-vivo .v33-did-video{position:absolute!important;width:1px!important;height:1px!important;left:-9999px!important;top:-9999px!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important}
    #tv-ao-vivo .idle-avatar.v33-did-active .idle-avatar-body{opacity:1!important;visibility:visible!important;animation:v33Speak 1.35s ease-in-out infinite!important;transform-origin:50% 78%!important}
    #tv-ao-vivo .idle-avatar.v33-listening .idle-avatar-body{animation:v33Listen 3.1s ease-in-out infinite!important;transform-origin:50% 78%!important}
    #tv-ao-vivo .instant-mouth,#tv-ao-vivo .avatar-eyelids,#tv-ao-vivo .deijanete-live-blazer{display:none!important}
    @keyframes v33Speak{0%,100%{transform:translate3d(0,0,0) scale(1)}35%{transform:translate3d(0,-1.5px,0) scale(1.004)}70%{transform:translate3d(1px,-.5px,0) scale(1.002)}}
    @keyframes v33Listen{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(0,-1px,0) scale(1.002)}}
    @media(max-width:760px){
      #tv-ao-vivo .studio-presenter{top:19%!important;width:35%!important;height:59%!important}
      #tv-ao-vivo .idle-deijanete{left:11%!important}
      #tv-ao-vivo .idle-paulo{left:54%!important}
    }
  `;
  document.head.appendChild(css);

  function createVideo(host,item,i){
    const v=document.createElement('video');
    v.id=`v33DidClip${i+1}`;v.className='v33-did-video';v.playsInline=true;v.preload='auto';v.controls=false;v.muted=false;v.disablePictureInPicture=true;v.setAttribute('playsinline','');v.src=item.src;host.appendChild(v);try{v.load()}catch(e){}return v;
  }
  const videos=playlist.map((item,i)=>createVideo(item.presenter==='deijanete'?deijanete:paulo,item,i));
  let running=false,index=0,timer=null;
  const clearState=h=>h.classList.remove('v33-did-active','v33-listening','active-speaker','instant-speaking','listening-avatar');
  const pause=(v,rewind=true)=>{try{v.pause();if(rewind)v.currentTime=0}catch(e){}};
  function reset(){if(timer){clearTimeout(timer);timer=null}videos.forEach(v=>pause(v));clearState(deijanete);clearState(paulo)}
  function finish(){running=false;reset();if(status)status.textContent='Apresentação concluída.'}
  function play(){
    if(!running)return;if(index>=playlist.length){finish();return}
    const item=playlist[index],active=item.presenter==='deijanete'?deijanete:paulo,inactive=item.presenter==='deijanete'?paulo:deijanete,v=videos[index];
    reset();running=true;active.classList.add('v33-did-active','active-speaker');inactive.classList.add('v33-listening');
    if(status)status.textContent=item.presenter==='deijanete'?'Dra. Deijanete Fayad no ar.':'Paulo Fayad no ar.';
    const go=()=>{if(!running)return;const p=v.play();if(p&&p.catch)p.catch(()=>{running=false;reset();if(status)status.textContent='Clique em ENTRAR NO JORNAL AO VIVO para liberar o áudio.';overlay?.classList.add('show')})};
    v.onended=()=>{clearState(active);timer=setTimeout(()=>{index++;play()},100)};
    v.onerror=()=>{running=false;reset();if(status)status.textContent='Apresentação temporariamente indisponível.'};
    try{v.currentTime=0}catch(e){};if(v.readyState>=3)go();else{v.addEventListener('canplay',go,{once:true});try{v.load()}catch(e){}}
  }
  function start(){reset();running=true;index=0;overlay?.classList.remove('show');play()}
  function stop(){running=false;reset();if(status)status.textContent='Apresentação pausada.'}
  function next(){if(!running){start();return}reset();running=true;index++;if(index>=playlist.length){finish();return}play()}
  window.startV33DidSequence=start;window.stopV33DidSequence=stop;
  function intercept(id,fn){const el=document.getElementById(id);if(!el)return;el.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();fn()},true)}
  intercept('startLiveNews',start);intercept('enterLiveButton',start);intercept('stopLiveNews',stop);intercept('nextHeadline',next);
})();