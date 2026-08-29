(() => {
  const photos={
    'energia-solar':'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1400&q=88',
    'materiais-eletricos':'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1400&q=88',
    'automoveis-locadoras':'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=88',
    'imoveis-construcao':'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=88',
    'saude-clinicas':'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=88',
    'turismo-hoteis':'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=88',
    'restaurantes':'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=88',
    'pet-veterinaria':'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1400&q=88',
    'moda-beleza':'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=88',
    'oticas':'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1400&q=88',
    'cursos-educacao':'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=88',
    'nautica-motos':'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=88'
  };
  function install(){
    const section=document.getElementById('clientes'); if(!section)return;
    if(!document.getElementById('client-theme-style')){
      const style=document.createElement('style'); style.id='client-theme-style'; style.textContent=`#clientes .visual-card{position:relative;overflow:hidden}#clientes .visual-card>img{width:100%!important;height:270px!important;object-fit:cover!important;object-position:center!important;background:#071a2b!important}#clientes .client-theme-badge{position:absolute;left:18px;top:18px;z-index:4;display:flex;align-items:center;gap:8px;padding:8px 11px;border-radius:999px;background:rgba(5,24,44,.86);border:1px solid rgba(212,175,55,.7);color:#fff;font:900 11px Arial,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.28)}#clientes .client-theme-badge img{width:28px!important;height:28px!important;object-fit:contain!important;border-radius:50%}@media(max-width:620px){#clientes .visual-card>img{height:245px!important}.client-theme-badge{left:14px!important;top:14px!important}}`; document.head.appendChild(style);
    }
    section.querySelectorAll('.visual-card').forEach(card=>{
      const href=card.getAttribute('href')||''; const match=href.match(/clientes\/([^/.]+)\.html/); const key=match?.[1];
      const img=card.querySelector(':scope > img'); if(key&&photos[key]&&img){img.src=photos[key];img.loading='lazy';img.referrerPolicy='no-referrer';}
      if(!card.querySelector('.client-theme-badge')){const badge=document.createElement('span');badge.className='client-theme-badge';badge.innerHTML='<img src="/favicon-voznews.png" alt=""><span>VOZ NEWS</span>';card.appendChild(badge)}
    });
  }

  function installBannerArrow(attempt=0){
    if(location.pathname.replace(/\/$/,'')!=='') return;
    const banner=document.getElementById('banner-legado-40-anos');
    if(!banner){if(attempt<30)setTimeout(()=>installBannerArrow(attempt+1),120);return;}

    const antiga=document.getElementById('seta-legado-40-anos');
    if(antiga) antiga.remove();

    if(!document.getElementById('seta-legado-neon-style')){
      const style=document.createElement('style');
      style.id='seta-legado-neon-style';
      style.textContent=`
        #seta-legado-40-anos{
          min-height:330px!important;position:relative!important;display:flex!important;align-items:center!important;justify-content:center!important;
          overflow:visible!important;background:radial-gradient(circle at 50% 50%,rgba(23,0,43,.78),rgba(0,0,0,.96) 72%)!important;
          border:2px solid rgba(255,255,255,.12)!important;border-radius:28px!important;perspective:900px!important;isolation:isolate!important
        }
        #seta-legado-40-anos:before{
          content:"";position:absolute;inset:12px;border-radius:22px;border:4px solid #ff2fd1;
          box-shadow:0 0 7px #fff,0 0 16px #ff2fd1,0 0 34px #ff2fd1,0 0 58px #7b2cff,inset 0 0 24px rgba(0,238,255,.32);
          animation:vegasFrame .72s steps(2,end) infinite
        }
        #seta-legado-40-anos:after{
          content:"";position:absolute;inset:22px;border-radius:18px;border:2px dashed #00f7ff;
          box-shadow:0 0 12px #00f7ff,inset 0 0 15px #00f7ff;animation:vegasDash 1.1s linear infinite
        }
        .vegas-neon{position:relative;z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;transform-style:preserve-3d;animation:vegasTilt 1.55s ease-in-out infinite alternate}
        .vegas-neon .vegas-kicker{font:1000 13px/1 Arial,sans-serif;letter-spacing:2px;color:#fff;text-shadow:0 0 5px #fff,0 0 10px #00eaff,0 0 20px #00eaff,0 0 38px #0077ff;animation:vegasBlink .62s steps(2,end) infinite}
        .vegas-arrow{
          display:block;font-size:136px;line-height:.8;font-weight:1000;color:#fff200;-webkit-text-stroke:3px #fff;
          text-shadow:8px 10px 0 #6514a8,12px 15px 0 rgba(0,0,0,.72),0 0 7px #fff,0 0 16px #fff200,0 0 34px #ff8a00,0 0 58px #ff2b9b,0 0 82px #00f7ff;
          filter:drop-shadow(0 0 18px #ff2bd6);transform-origin:center;animation:vegasArrow .82s cubic-bezier(.2,.8,.2,1) infinite
        }
        .vegas-neon strong{
          display:block;padding:10px 18px;border-radius:999px;font:1000 16px/1 Arial,sans-serif;letter-spacing:1.5px;color:#fff;
          background:#2b003c;border:2px solid #ffea00;text-shadow:0 0 7px #fff,0 0 15px #ff2bd6,0 0 26px #00eaff;
          box-shadow:0 0 8px #fff200,0 0 20px #ff2bd6,0 0 38px #00eaff,inset 0 0 16px rgba(255,43,214,.55);animation:vegasLabel .9s ease-in-out infinite alternate
        }
        .vegas-bulbs{position:absolute;inset:3px;z-index:2;pointer-events:none}
        .vegas-bulbs i{position:absolute;width:12px;height:12px;border-radius:50%;background:#fff;box-shadow:0 0 5px #fff,0 0 13px currentColor,0 0 24px currentColor;animation:vegasBulb .75s steps(2,end) infinite}
        .vegas-bulbs i:nth-child(1){left:7%;top:8%;color:#ff2bd6}.vegas-bulbs i:nth-child(2){left:28%;top:5%;color:#00f7ff;animation-delay:.12s}.vegas-bulbs i:nth-child(3){left:50%;top:4%;color:#fff200;animation-delay:.24s}.vegas-bulbs i:nth-child(4){right:28%;top:5%;color:#ff5a00;animation-delay:.36s}.vegas-bulbs i:nth-child(5){right:7%;top:8%;color:#7b2cff;animation-delay:.48s}.vegas-bulbs i:nth-child(6){right:4%;top:44%;color:#00f7ff;animation-delay:.18s}.vegas-bulbs i:nth-child(7){right:7%;bottom:8%;color:#ff2bd6;animation-delay:.3s}.vegas-bulbs i:nth-child(8){right:32%;bottom:5%;color:#fff200;animation-delay:.42s}.vegas-bulbs i:nth-child(9){left:32%;bottom:5%;color:#00f7ff;animation-delay:.54s}.vegas-bulbs i:nth-child(10){left:7%;bottom:8%;color:#ff5a00;animation-delay:.66s}.vegas-bulbs i:nth-child(11){left:4%;top:44%;color:#7b2cff;animation-delay:.27s}.vegas-bulbs i:nth-child(12){left:50%;bottom:4%;color:#ff2bd6;animation-delay:.39s}
        @keyframes vegasFrame{0%,100%{border-color:#ff2fd1;filter:hue-rotate(0deg);opacity:1}50%{border-color:#00f7ff;filter:hue-rotate(120deg);opacity:.72}}
        @keyframes vegasDash{to{transform:rotate(360deg);filter:hue-rotate(360deg)}}
        @keyframes vegasBlink{0%,42%{opacity:1}43%,58%{opacity:.18}59%,100%{opacity:1}}
        @keyframes vegasTilt{0%{transform:rotateY(-18deg) rotateX(5deg) translateZ(4px)}100%{transform:rotateY(18deg) rotateX(-4deg) translateZ(18px)}}
        @keyframes vegasArrow{0%{transform:translateX(18px) rotateZ(0deg) rotateY(-10deg) scale(.92);filter:hue-rotate(0deg) drop-shadow(0 0 18px #ff2bd6)}45%{transform:translateX(-13px) rotateZ(-8deg) rotateY(16deg) scale(1.12);filter:hue-rotate(110deg) drop-shadow(0 0 30px #00f7ff)}70%{transform:translateX(-3px) rotateZ(5deg) rotateY(-12deg) scale(1.04);filter:hue-rotate(220deg) drop-shadow(0 0 26px #fff200)}100%{transform:translateX(18px) rotateZ(0deg) rotateY(-10deg) scale(.92);filter:hue-rotate(360deg) drop-shadow(0 0 18px #ff2bd6)}}
        @keyframes vegasLabel{0%{transform:scale(.96);filter:hue-rotate(0deg)}100%{transform:scale(1.06);filter:hue-rotate(140deg)}}
        @keyframes vegasBulb{0%,100%{opacity:1;transform:scale(1.35)}50%{opacity:.15;transform:scale(.7)}}
        @media(max-width:980px){#seta-legado-40-anos{min-height:240px!important}.vegas-arrow{font-size:96px}.vegas-neon strong{font-size:12px}.vegas-neon .vegas-kicker{font-size:10px}}
        @media(max-width:760px){#seta-legado-40-anos{min-height:210px!important}.vegas-arrow{font-size:82px}}
      `;
      document.head.appendChild(style);
    }

    const arrow=document.createElement('div');
    arrow.id='seta-legado-40-anos';
    arrow.setAttribute('aria-label','Letreiro de neon apontando para o espaço reservado para empresas');
    arrow.innerHTML='<div class="vegas-bulbs"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="vegas-neon"><span class="vegas-kicker">★ DESTAQUE ★</span><span class="vegas-arrow">⬅</span><strong>SEU ESPAÇO AQUI</strong></div>';
    banner.insertAdjacentElement('afterend',arrow);
  }

  function installIBJHome(attempt=0){
    if(location.pathname.replace(/\/$/,'')!=='') return;
    const section=document.getElementById('sustentabilidade');
    if(!section){if(attempt<30)setTimeout(()=>installIBJHome(attempt+1),120);return;}
    const cards=[...section.querySelectorAll('.visual-grid .visual-card')];
    if(cards.length<6)return;
    const IBJ='https://www.institutobraziljust.org/';
    const setCard=(card,{href,img,alt,title,brand,body,link})=>{
      if(!card)return;
      card.href=href;card.target='_blank';card.rel='noopener';
      let picture=card.querySelector(':scope > img');
      const frame=card.querySelector('.deijanete-card-photo');
      if(frame){frame.innerHTML=`<img alt="${alt}" loading="lazy" src="${img}" style="width:100%;height:330px;object-fit:cover;object-position:center 18%;border-radius:0;background:#07182e"/>`;picture=frame.querySelector('img')}
      else if(picture){picture.src=img;picture.alt=alt;picture.loading='lazy';picture.style.objectFit='cover';picture.style.objectPosition='center';picture.style.background='#07182e'}
      const bodyEl=card.querySelector('.visual-body');
      if(bodyEl)bodyEl.innerHTML=`<span class="brand-mark">${brand}</span><h3>${title}</h3><p>${body}</p><div class="contact-meta"><strong>Site oficial:</strong> institutobraziljust.org</div><span class="real-link">${link} →</span>`;
    };
    setCard(cards[0],{href:IBJ,img:'./studio-deijanete-source.png',alt:'Dra. Deijanete Fayad — Instituto Brazil Just',brand:'IBJ',title:'Dra. Deijanete Fayad | Instituto Brazil Just',body:'A presidente do Instituto Brazil Just em destaque na frente dos projetos sociais, cidadania, inclusão e desenvolvimento humano do Instituto.',link:'Conhecer o IBJ'});
    cards[1].href='https://www.youtube.com/watch?v=njhX5yXo9B0';cards[1].target='_blank';cards[1].rel='noopener';
    setCard(cards[2],{href:IBJ,img:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=86',alt:'Floresta preservada',brand:'FLORESTAS',title:'Preservação de florestas e consciência ambiental',body:'Educação ambiental, proteção da natureza e práticas sustentáveis fazem parte da agenda de impacto social. Preservar florestas é proteger recursos, comunidades e o futuro.',link:'Conhecer projetos'});
    setCard(cards[3],{href:IBJ,img:'https://images.unsplash.com/photo-1576765608866-5b51046452be?auto=format&fit=crop&w=1200&q=86',alt:'Acolhimento e atenção à pessoa idosa',brand:'IDOSOS',title:'Acolhimento e apoio à pessoa idosa',body:'Ações sociais voltadas à pessoa idosa fortalecem vínculos, convivência, dignidade e cuidado. O espaço passa a usar uma imagem humana e relacionada ao tema.',link:'Ver ações sociais'});
    setCard(cards[4],{href:IBJ,img:'https://www.institutobraziljust.org/strips/strip5.jpg',alt:'Ação do Instituto Brazil Just com crianças',brand:'CRIANÇAS',title:'Crianças, esporte e inclusão',body:'Imagem real de ação social publicada pelo próprio Instituto Brazil Just, reunindo crianças, famílias, doações e apoio comunitário.',link:'Conhecer ações com crianças'});
    setCard(cards[5],{href:IBJ,img:'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=86',alt:'Inclusão social e apoio comunitário',brand:'INCLUSÃO',title:'Impacto social que transforma vidas',body:'Inclusão, esporte, educação e acesso a oportunidades aproximam parceiros de projetos com resultado humano real e compromisso comunitário.',link:'Apoiar o IBJ'});
    if(!document.getElementById('ibj-home-fix-style')){
      const st=document.createElement('style');st.id='ibj-home-fix-style';st.textContent='#sustentabilidade .visual-card>img,#sustentabilidade .deijanete-card-photo img{width:100%!important;height:330px!important;object-fit:cover!important;background:#07182e!important}#sustentabilidade .deijanete-card-photo{padding:0!important;background:#07182e!important}#sustentabilidade .deijanete-card-photo img{object-position:center 18%!important}@media(max-width:760px){#sustentabilidade .visual-card>img,#sustentabilidade .deijanete-card-photo img{height:260px!important}}';document.head.appendChild(st)
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{install();installBannerArrow();installIBJHome()},{once:true});else{install();installBannerArrow();installIBJHome()}
})();