(()=>{
  const PREPARE='/api/studio-live-prepare';
  const STATE='/api/studio-live-state';
  const POLL_MS=2500;
  let live=false,session=0;

  function init(){
    const studio=document.getElementById('tv-ao-vivo');
    if(!studio||document.getElementById('voznews-live-toggle'))return !!studio;

    const style=document.createElement('style');
    style.id='voznews-studio-live-style';
    style.textContent=`
.vn-live-layer{position:absolute;inset:0;z-index:4;pointer-events:none;overflow:hidden}
.vn-live-slot{position:absolute;top:7%;bottom:10.4%;width:48%;overflow:hidden;opacity:1;transition:transform .45s ease,opacity .35s ease;transform-style:preserve-3d}
.vn-live-presenter-deijanete{left:1%}.vn-live-presenter-paulo{right:1%}
.vn-live-slot[data-state="camera"]{transform:translate3d(0,0,0) rotateY(0deg) scale(1)}
.vn-live-presenter-deijanete[data-state="partner"]{transform:translate3d(1.2%,0,0) perspective(900px) rotateY(-3deg) scale(.995)}
.vn-live-presenter-paulo[data-state="partner"]{transform:translate3d(-1.2%,0,0) perspective(900px) rotateY(3deg) scale(.995)}
.vn-live-slot[data-state="transition"]{opacity:.78;transform:scale(.995)}
.vn-live-slot video{width:100%;height:100%;object-fit:contain;object-position:center bottom;opacity:0;transition:opacity .28s ease;filter:drop-shadow(0 10px 18px rgba(0,0,0,.22))}
.vn-live-slot video.vn-live-active{opacity:1}
#voznews-live-toggle{position:absolute;z-index:72;right:14px;top:14px;border:1px solid rgba(255,255,255,.38);border-radius:999px;padding:9px 14px;background:rgba(5,19,43,.88);color:#fff;font:900 clamp(9px,.9vw,13px)/1 system-ui,-apple-system,sans-serif;letter-spacing:.25px;box-shadow:0 7px 22px rgba(0,0,0,.30);cursor:pointer;backdrop-filter:blur(8px)}
#voznews-live-toggle:hover{background:rgba(137,14,28,.94)}
#voznews-live-toggle[aria-pressed="true"]{background:rgba(179,17,34,.94)}
#voznews-live-status{position:absolute;z-index:71;right:14px;top:54px;max-width:46%;padding:6px 10px;border-radius:999px;background:rgba(4,20,43,.78);color:#fff;font:800 clamp(8px,.74vw,11px)/1.25 system-ui,-apple-system,sans-serif;opacity:0;transform:translateY(-3px);transition:opacity .2s ease,transform .2s ease;pointer-events:none}
#voznews-live-status.vn-live-visible{opacity:1;transform:translateY(0)}
@media(max-width:760px){#voznews-live-toggle{right:8px;top:8px;padding:7px 10px}#voznews-live-status{right:8px;top:43px;max-width:70%}.vn-live-slot{top:6%;bottom:10.4%;width:50%}.vn-live-presenter-deijanete{left:0}.vn-live-presenter-paulo{right:0}}
`;
    document.head.appendChild(style);

    const layer=document.createElement('div');
    layer.className='vn-live-layer';
    layer.id='voznews-live-layer';
    layer.setAttribute('aria-hidden','true');
    layer.innerHTML=`<div class="vn-live-slot vn-live-presenter-deijanete" data-state="idle"><video id="voznews-live-deijanete" playsinline preload="metadata"></video></div><div class="vn-live-slot vn-live-presenter-paulo" data-state="idle"><video id="voznews-live-paulo" playsinline preload="metadata"></video></div>`;

    const button=document.createElement('button');
    button.id='voznews-live-toggle';
    button.type='button';
    button.textContent='🔴 AO VIVO / OUVIR AGORA';
    button.setAttribute('aria-pressed','false');

    const status=document.createElement('div');
    status.id='voznews-live-status';
    status.setAttribute('role','status');
    status.setAttribute('aria-live','polite');

    studio.appendChild(layer);studio.appendChild(button);studio.appendChild(status);
    button.addEventListener('click',()=>live?stopLive():startLive());
    return true;
  }

  function el(id){return document.getElementById(id)}
  function setStatus(text,visible=true){const s=el('voznews-live-status');if(!s)return;s.textContent=text||'';s.classList.toggle('vn-live-visible',!!visible&&!!text)}
  function slot(name){return document.querySelector(`.vn-live-presenter-${name}`)}
  function video(name){return el(`voznews-live-${name}`)}
  function clearVideo(v){if(!v)return;try{v.pause()}catch(e){}v.classList.remove('vn-live-active');v.muted=true;v.removeAttribute('src');try{v.load()}catch(e){}}

  function resetToBaseline(message){
    for(const name of ['deijanete','paulo']){clearVideo(video(name));const s=slot(name);if(s)s.dataset.state='idle'}
    if(message)setStatus(message,true);else setStatus('',false);
  }

  function stopLive(){
    live=false;session++;
    resetToBaseline('AO VIVO pausado');
    const b=el('voznews-live-toggle');if(b){b.textContent='🔴 AO VIVO / OUVIR AGORA';b.setAttribute('aria-pressed','false')}
    setTimeout(()=>{if(!live)setStatus('',false)},1800);
  }

  async function json(url,options={}){
    const r=await fetch(url,{cache:'no-store',...options,headers:{accept:'application/json',...(options.headers||{})}});
    const data=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(data.error||data.status||`http_${r.status}`);
    return data;
  }

  async function prepareBlock(run){
    setStatus('Preparando o próximo bloco…',true);
    const p=await json(PREPARE,{method:'POST'});
    if(!p.token)throw new Error('missing_token');
    for(let i=0;i<120&&live&&run===session;i++){
      const state=await json(`${STATE}?token=${encodeURIComponent(p.token)}`);
      if(state.status==='ready'&&state.block)return state.block;
      if(state.status==='unavailable')throw new Error('unavailable');
      await new Promise(resolve=>setTimeout(resolve,POLL_MS));
    }
    throw new Error('timeout');
  }

  async function playTurn(turn,run){
    if(!live||run!==session)return;
    const speaker=turn.speaker==='paulo'?'paulo':'deijanete';
    const listener=speaker==='paulo'?'deijanete':'paulo';
    const sv=video(speaker),lv=video(listener),ss=slot(speaker),ls=slot(listener);
    if(!sv||!ss||!ls||!turn.url)throw new Error('invalid_turn');
    if(lv){lv.pause();lv.classList.remove('vn-live-active');lv.muted=true}
    ss.dataset.state='transition';ls.dataset.state='transition';
    await new Promise(resolve=>setTimeout(resolve,120));
    ss.dataset.state=turn.mode==='partner'?'partner':'camera';
    ls.dataset.state=turn.mode==='partner'?'camera':'partner';
    sv.src=turn.url;sv.muted=false;sv.volume=1;sv.classList.add('vn-live-active');
    setStatus(`${speaker==='deijanete'?'Deijanete':'Paulo'} • AO VIVO`,true);
    await new Promise((resolve,reject)=>{
      let done=false;
      const finish=()=>{if(done)return;done=true;cleanup();resolve()};
      const fail=()=>{if(done)return;done=true;cleanup();reject(new Error('playback_error'))};
      const cleanup=()=>{sv.removeEventListener('ended',finish);sv.removeEventListener('error',fail)};
      sv.addEventListener('ended',finish,{once:true});sv.addEventListener('error',fail,{once:true});
      const promise=sv.play();if(promise&&promise.catch)promise.catch(fail);
    });
    sv.classList.remove('vn-live-active');sv.muted=true;ss.dataset.state='transition';ls.dataset.state='transition';
  }

  async function playBlock(block,run){
    const turns=Array.isArray(block&&block.turns)?block.turns:[];
    if(!turns.length)throw new Error('empty_block');
    for(const turn of turns){if(!live||run!==session)return;await playTurn(turn,run)}
    resetToBaseline();
  }

  async function startLive(){
    if(live)return;
    live=true;const run=++session;
    const b=el('voznews-live-toggle');if(b){b.textContent='■ PARAR AO VIVO';b.setAttribute('aria-pressed','true')}
    try{
      while(live&&run===session){const block=await prepareBlock(run);if(!live||run!==session)return;await playBlock(block,run)}
    }catch(e){
      console.error('VOZ NEWS AO VIVO:',e);
      live=false;resetToBaseline('AO VIVO temporariamente indisponível');
      if(b){b.textContent='🔴 AO VIVO / OUVIR AGORA';b.setAttribute('aria-pressed','false')}
    }
  }

  if(!init()){document.addEventListener('DOMContentLoaded',init,{once:true});setTimeout(init,1300)}
})();
