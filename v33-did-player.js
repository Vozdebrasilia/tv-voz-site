(() => {
  const playlist=[
    {presenter:'paulo',src:'./assets/v33-original/01-paulo-ola.mp4'},
    {presenter:'deijanete',src:'./assets/v33-original/02-deijanete-ola.mp4'}
  ];
  const deijanete=document.getElementById('idleDeijanete');
  const paulo=document.getElementById('idlePaulo');
  const status=document.getElementById('studioStatus');
  const overlay=document.getElementById('enterLiveOverlay');
  const startButton=document.getElementById('startLiveNews');
  const enterButton=document.getElementById('enterLiveButton');
  const didLoading=document.getElementById('didLoading');
  const studio=document.getElementById('tv-ao-vivo');
  if(!studio)return;

  const visualCss=document.createElement('style');
  visualCss.id='voznews-approved-studio';
  visualCss.textContent=`
    #tv-ao-vivo{background:#071426!important}
    #tv-ao-vivo .studio-bg{position:absolute!important;inset:0!important;background:#071426!important;background-image:none!important;background-size:cover!important;background-position:center center!important;background-repeat:no-repeat!important;opacity:1!important;filter:none!important;z-index:1!important}
    #tv-ao-vivo .studio-bg:before,#tv-ao-vivo .studio-bg:after,#tv-ao-vivo .studio-lights,#tv-ao-vivo .studio-screen,#tv-ao-vivo .studio-presenters,#tv-ao-vivo .desk,#tv-ao-vivo .anchor-stage{display:none!important}
    #tv-ao-vivo .live-badge,#tv-ao-vivo .studio-topline,#tv-ao-vivo .studio-buttons,#tv-ao-vivo .news-control,#tv-ao-vivo .ticker,#tv-ao-vivo .studio-status,#tv-ao-vivo .enter-live-overlay{position:relative;z-index:20}
    #tv-ao-vivo .v33-did-video{position:absolute!important;width:1px!important;height:1px!important;left:-9999px!important;top:-9999px!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important}
    @media(max-width:760px){#tv-ao-vivo .studio-bg{background-size:cover!important;background-position:center center!important}}
  `;
  document.head.appendChild(visualCss);

  Promise.all([0,1,2,3,4].map(i=>fetch(`./assets/studio-v35/part${i}.txt?v=35`).then(r=>{if(!r.ok)throw new Error('studio');return r.text()})))
    .then(parts=>{const bg=studio.querySelector('.studio-bg');if(bg)bg.style.setProperty('background-image',`url("data:image/jpeg;base64,${parts.join('')}")`,'important')})
    .catch(()=>{});

  if(!deijanete||!paulo)return;
  deijanete.querySelectorAll('.v33-did-video').forEach(v=>v.remove());
  paulo.querySelectorAll('.v33-did-video').forEach(v=>v.remove());
  if(startButton)startButton.textContent='▶ INICIAR JORNAL AO VIVO';
  if(enterButton)enterButton.textContent='▶ ENTRAR NO JORNAL AO VIVO';
  const overlayText=overlay?.querySelector('span');
  if(overlayText)overlayText.textContent='Clique uma vez para iniciar a apresentação.';
  if(didLoading)didLoading.style.display='none';
  [startButton,enterButton,document.getElementById('nextHeadline'),document.getElementById('stopLiveNews')].forEach(b=>{if(b){b.hidden=false;b.disabled=false;b.removeAttribute('aria-disabled');b.style.display=''}});

  function createVideo(host,item,i){const v=document.createElement('video');v.id=`v33DidClip${i+1}`;v.className='v33-did-video';v.playsInline=true;v.preload='auto';v.controls=false;v.muted=false;v.disablePictureInPicture=true;v.setAttribute('playsinline','');v.src=item.src;host.appendChild(v);try{v.load()}catch(e){}return v}
  const videos=playlist.map((item,i)=>createVideo(item.presenter==='deijanete'?deijanete:paulo,item,i));
  let running=false,index=0,timer=null;
  const pause=(v,rewind=true)=>{try{v.pause();if(rewind)v.currentTime=0}catch(e){}};
  function reset(){if(timer){clearTimeout(timer);timer=null}videos.forEach(v=>pause(v))}
  function finish(){running=false;reset();if(status)status.textContent='Apresentação concluída.'}
  function play(){if(!running)return;if(index>=playlist.length){finish();return}const item=playlist[index],v=videos[index];reset();running=true;if(status)status.textContent=item.presenter==='deijanete'?'Dra. Deijanete Fayad no ar.':'Paulo Fayad no ar.';const go=()=>{if(!running)return;const p=v.play();if(p&&p.catch)p.catch(()=>{running=false;reset();if(status)status.textContent='Clique em ENTRAR NO JORNAL AO VIVO para liberar o áudio.';overlay?.classList.add('show')})};v.onended=()=>{timer=setTimeout(()=>{index++;play()},100)};v.onerror=()=>{running=false;reset();if(status)status.textContent='Apresentação temporariamente indisponível.'};try{v.currentTime=0}catch(e){};if(v.readyState>=3)go();else{v.addEventListener('canplay',go,{once:true});try{v.load()}catch(e){}}}
  function start(){reset();running=true;index=0;overlay?.classList.remove('show');play()}
  function stop(){running=false;reset();if(status)status.textContent='Apresentação pausada.'}
  function next(){if(!running){start();return}reset();running=true;index++;if(index>=playlist.length){finish();return}play()}
  window.startV33DidSequence=start;window.stopV33DidSequence=stop;
  function intercept(id,fn){const el=document.getElementById(id);if(!el)return;el.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();fn()},true)}
  intercept('startLiveNews',start);intercept('enterLiveButton',start);intercept('stopLiveNews',stop);intercept('nextHeadline',next);
})();