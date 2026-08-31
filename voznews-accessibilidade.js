(()=>{const load=(src,id)=>{if(document.getElementById(id))return;const s=document.createElement('script');s.id=id;s.src=src;s.async=false;document.head.appendChild(s)};
load('/voznews-accessibilidade-original.js','voznews-accessibilidade-original');
const path=location.pathname.replace(/\/$/,'');
if(path!=='')return;
const stats=document.querySelector('.eco-stats');
if(!stats||document.getElementById('voznews-awards-grid'))return;
const items=[
{title:'TV Voz de Brasília – 40 anos',img:'https://voz-central-ai.lovable.app/__l5e/assets-v1/0647affc-2a0a-41b9-a99c-62b7694c2c8f/logo-voz-de-brasilia-40anos-oficial.png',text:'Quatro décadas construindo autoridade, confiança, credibilidade e visibilidade. O selo celebra a trajetória iniciada dos 40 anos da TV Voz de Brasília e reconhece uma história marcada por pressão, comunicação e relacionamento com o público.'},
{title:'Anuário Brasileiro – 25 anos',img:'https://voz-central-ai.lovable.app/__l5e/assets-v1/718bbc6c-e710-4032-9735-b7cd77554411/card-02.png',text:'Vinte e cinco anos de confiança em uma marca editorial que atravessa gerações. Esta edição marca o enncerramento da série regular do Anuário Brasileiro de Economia, Turismo e Meio Ambiente.'},
{title:'Instituto Brazil Just – 25 anos',img:'https://voz-central-ai.lovable.app/__l5e/assets-v1/87f1a239-d457-42ea-8147-e10a2a02bc0b/card-03.png',text:'Um reconhecimento à atuação humanitária do Instituto Brazil Just, que acolhe pessoas com carinho, atenção e dignidade, levando amor, cuidado e provisão a comunidades e indivíduos em situações nas quais a prensa do Estado não alcança planejamente.'},
{title:'TV Voz de Brasília Filmes',img:'https://voz-central-ai.lovable.app/__l5e/assets-v1/022b86dc-cc31-44b2-9a4b-5ee701a9d8fb/card-04.png',text:'O caçula do ecossistema nasceu para transformar histórias reais em memória audiovisual. O selo representa vídeos, trajetórias e acontecimentos retratados em filme a partir da experiência verídica de seus participantes.'},
{title:'Troféu Top of Millenium – 10ª edição',img:'https://voz-central-ai.lovable.app/__l5e/assets-v1/99f00955-8e50-436a-b1aa-f97ea3703719/card-05.png',text:'Em sua 10ª edição, o Troféu Top of Millenium reconhece lideranças, empresas e pessoas que se destacam no Brasil por sua contribuição, excelência, protagonismo e por trajetórias singulares capazes de deixar de legado.'},
{title:'Marca de 1.000+ Entrevistas',img:'https://voz-central-ai.lovable.app/__l5e/assets-v1/fc050c9e-28c2-47d1-acea-c6d380417822/card-06.png',text:'Reconhece uma marca histórica de mais de mil entrevistas realizadas, registrando ideias, trajetórias e experiências de personalidades, empresários, autoridades e protagonistas de diferentes setores.'},
{title:'Selo Cobertura Nacional e Internacional',img:'https://voz-central-ai.lovable.app/__l5e/assets-v1/2da9ca7f-52ca-4b43-b698-308ab6dc0398/card-07.png',text:'Destinada a iniciativas, personalidades e organizações cuja atuação ultrapassa fronteiras locais, culturais, institucionais e mercadológicas. Representa presença, aliança e capacidade de gerar visibilidade em diferentes territórios.'},
{title:'Selo Conexão Global',img:'https://voz-central-ai.lovable.app/__l5e/assets-v1/4a346d3a-5ba4-494c-a9bd-a9aae7110d17/selo-voz-global.png',text:'Reconhece quem promove pontes entre países, culturas, instituições e mercados. Simboliza diplomacia, intercâmbio, desenvolvimento, cooperação e relacionamento internacional.'},
{title:'Selo Excelência Editorial',img:'https://voz-central-ai.lovable.app/__l5e/assets-v1/e2356eb3-97b6-4fe6-bd2f-3e7f1db81bd1/selo-excelencia-editorial.png',text:'Destinado a conteúdos e projetos que demonstram qualidade, responsabilidade, consistência editorial e compromisso com uma comunicação ética e relevante.'},
{title:'Selo Impacto Social',img:'https://voz-central-ai.lovable.app/__l5e/assets-v1/430ff732-6d37-4a60-a6d3-ac9add4aaf20/selo-impacto-social.png',text:'Reconhece projetos, instituições e pessoas que produzem transformação concreta na vida de comunidades, ampliando oportunidades, dignidade, cuidado e inclusão.'},
{title:'Selo Parceiro Estratégico',img:'https://voz-central-ai.lovable.app/__l5e/assets-v1/0a3acf88-03c0-42aa-baa3-bd5aa7d3c2b8/selo-parceiro-estrategico.png',text:'Reconhece empresas, instituições e lideranças que constroem relações duradouras e geram resultados por meio de confiança, cooperação e visão compartilhada.'}
];
const grid=document.createElement('section');
grid.id='voznews-awards-grid';
grid.setAttribute('aria-label','Marcas institucionais, premiações e selos');
grid.innerHTML=items.map((item,i)=>`<a href="#voznews-award-${i+1}" class="voznews-award-card" data-award-index="${i}" aria-label="Saiba mais sobre ${item.title}"><span class="voznews-award-img"><img src="${item.img}" alt="${item.title}" loading="lazy"></span><strong>${item.title}</strong><small>Saiba mais</small></a>`).join('');
stats.insertAdjacentElement('afterend',grid);
const modal=document.createElement('div');
modal.id='voznews-award-modal';
modal.setAttribute('aria-hidden','true');
modal.innerHTML='<div class="voznews-award-dialog" role="dialog" aria-modal="true" aria-labelledby="voznews-award-title"><button type="button" class="voznews-award-close" aria-label="Fechar">✕</button><img class="voznews-award-modal-img" alt=""><div><h3 id="voznews-award-title"></h3><p id="voznews-award-text"></p></div></div>';
document.body.appendChild(modal);
const open=i=>{const item=items[i];if(!item)return;modal.querySelector('.voznews-award-modal-img').src=item.img;modal.querySelector('.voznews-award-modal-img').alt=item.title;modal.querySelector('#voznews-award-title').textContent=item.title;modal.querySelector('#voznews-award-text').textContent=item.text;modal.classList.add('open');modal.setAttribute('aria-hidden','false');modal.querySelector('.voznews-award-close').focus()};
const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')};
grid.addEventListener('click',e=>{const a=e.target.closest('.voznews-award-card');if(!a)return;e.preventDefault();open(Number(a.dataset.awardIndex))});
modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('.voznews-award-close'))close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))close()});
})();
