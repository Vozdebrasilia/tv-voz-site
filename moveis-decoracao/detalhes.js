(function(){
  'use strict';

  const fonte = (url, rotulo='Fonte oficial') => ({url, rotulo});
  const sugestao = (entidade, foco) => [
    `É uma satisfação acompanhar iniciativas que ampliam a visibilidade de ${foco}. A comunicação clara e acessível aproxima empresas, profissionais, entidades e consumidores, ajudando a transformar informação setorial em oportunidade de desenvolvimento.`,
    `A atuação da ${entidade} está ligada ao fortalecimento de um ambiente produtivo mais competitivo, inovador e sustentável. Dar espaço a projetos, boas práticas, formação profissional, design e empreendedorismo contribui para que o setor seja melhor compreendido e reconhecido pela sociedade.`,
    `Nesse contexto, a iniciativa conduzida pelo jornalista Paulo Fayad com o VOZ NEWS Móveis & Decoração merece destaque pela proposta simples, visual e direta. Um canal organizado por temas facilita a navegação, valoriza as instituições e cria uma ponte objetiva entre quem produz, quem representa e quem procura soluções no mercado.`,
    `A beleza da proposta está justamente em tornar o conteúdo setorial fácil de encontrar e de compartilhar, sem perder a seriedade editorial. Essa combinação de simplicidade, informação e visibilidade pode ampliar conexões e abrir novas possibilidades de relacionamento para toda a cadeia de móveis, arquitetura, design e decoração.`
  ];

  const detalhes = {
    'coreto': {
      tipo:'Empresa', titulo:'CORETO Móveis Corporativos', subtitulo:'55 anos de atuação em ambientes corporativos',
      corpo:[
        'A CORETO atua há mais de meio século no desenvolvimento de ambientes corporativos, combinando consultoria, ergonomia, design e funcionalidade para empresas, arquitetos e instituições.',
        'A empresa trabalha com soluções personalizadas e representa marcas reconhecidas do mobiliário e dos revestimentos corporativos, entre elas Herman Miller/MillerKnoll, Alberflex, Interface e DivDesign.'
      ],
      contato:'Alameda Ricardo Paranhos, 236 – Setor Marista, Goiânia/GO – CEP 74180-050 • (62) 3224-4511 • (62) 99975-3287 • contato@coreto.com.br',
      links:[fonte('https://coreto.com.br/','Site oficial')]
    },
    'bontempo': {
      tipo:'Empresa', titulo:'Bontempo Móveis Planejados', subtitulo:'Design brasileiro, indústria e personalização',
      corpo:[
        'Fundada em 1978 pelos irmãos Rosmar, Rudimar e Rudinei Stedile, a Bontempo nasceu de uma tradição familiar ligada à fabricação de móveis e consolidou-se no mercado brasileiro de planejados e interiores.',
        'A marca mantém parque fabril em São Marcos (RS), com mais de 40 mil m², e rede de franquias no Brasil e no exterior. Em Brasília, a loja oficial atende projetos residenciais e corporativos.'
      ],
      contato:'Brasília: SIA Trecho 2, Zona Industrial (Guará), Brasília/DF – CEP 71200-028 • (61) 3972-2393 • brasilia@bontempo.com.br',
      links:[fonte('https://www.bontempo.com.br/','Site oficial'),fonte('https://www.bontempo.com.br/site/a-bontempo/nossa-historia','História da marca')]
    },
    'fibra': {
      tipo:'Entidade', titulo:'FIBRA — Federação das Indústrias do Distrito Federal', subtitulo:'Presidente: Jamal Jorge Bittar',
      foto:'https://live.staticflickr.com/65535/53037704782_68fdc11026.jpg', fotoAlt:'Jamal Jorge Bittar, presidente da Fibra',
      corpo:[
        'A FIBRA representa os interesses da indústria do Distrito Federal e atua em agendas de competitividade, inovação, sustentabilidade, desenvolvimento econômico e articulação institucional.',
        'A diretoria 2022–2028 é presidida por Jamal Jorge Bittar, empresário do setor metalomecânico e presidente do Sistema Fibra.'
      ],
      contato:'SIA Trecho 3/4, Lote 225, Ed. Sede FIBRA, Brasília/DF – CEP 71200-030 • SAC (61) 4042-6565',
      mensagem:sugestao('FIBRA','a indústria e as cadeias produtivas do Distrito Federal'),
      links:[fonte('https://www.sistemafibra.org.br/fibra/institucional/diretoria','Diretoria oficial'),fonte('https://sistemafibra.org.br/fibra/institucional/contatos','Contatos')]
    },
    'sindimam': {
      tipo:'Entidade', titulo:'SINDIMAM-DF', subtitulo:'Presidente: Rosana Aparecida Silva Souza Aguiar',
      foto:'https://www.sistemafibra.org.br/fibra/images/categorias/noticias/2025/06-Junho/_RosanaSouzaAguiar-presidentedoSindimamDF-30.5.2025_.jpg', fotoAlt:'Rosana Aparecida Silva Souza Aguiar, presidente do Sindimam-DF',
      corpo:[
        'Fundado em 20 de fevereiro de 1986, o Sindicato das Indústrias da Madeira e do Mobiliário do Distrito Federal representa empresas do segmento e trabalha por qualificação, inovação, acompanhamento legislativo e fortalecimento da indústria local.',
        'Rosana Aparecida Silva Souza Aguiar foi reeleita para a presidência e conduz a entidade no mandato 2025–2028.'
      ],
      contato:'SIA Trecho 2, Lote 1125, Ed. SESI, Brasília/DF • (61) 3234-3863 • (61) 98179-6909 • sindimam@sindimam.org.br',
      mensagem:sugestao('SINDIMAM-DF','a indústria da madeira e do mobiliário do Distrito Federal'),
      links:[fonte('https://sindimam.org.br/contatos/','Site e contatos'),fonte('https://www.sistemafibra.org.br/fibra/institucional/sala-de-imprensa/noticias/2624-rosana-souza-aguiar-seguira-na-presidencia-do-sindimam-df-ate-2028','Presidência 2025–2028')]
    },
    'abimovel': {
      tipo:'Entidade', titulo:'ABIMÓVEL', subtitulo:'Presidente: Irineu Munhoz',
      foto:'https://abimovel.com/wp-content/uploads/2025/07/irineu-munhoz-1024x1024.jpg', fotoAlt:'Irineu Munhoz, presidente da ABIMÓVEL',
      corpo:[
        'A Associação Brasileira das Indústrias do Mobiliário atua há quase cinco décadas na defesa e no desenvolvimento da cadeia moveleira nacional, com programas de competitividade, design, sustentabilidade, normalização, inovação e internacionalização.',
        'Irineu Munhoz preside a diretoria atual. Fundador da Caemmun, também presidiu o Sindicato das Indústrias de Móveis de Arapongas e integra a liderança industrial do Paraná.'
      ],
      contato:'Contato institucional: +55 (11) 3817-8711 • abimovel@abimovel.com',
      mensagem:sugestao('ABIMÓVEL','a indústria brasileira do mobiliário e sua presença nacional e internacional'),
      links:[fonte('https://abimovel.com/capa/diretoria/','Diretoria oficial'),fonte('https://abimovel.com/transparencia/','Contato institucional')]
    },
    'abimad': {
      tipo:'Entidade', titulo:'ABIMAD', subtitulo:'Presidente: Paulo Mourão',
      foto:'https://www.abimad.com.br/repositorio/imagens/noticias/2026/20260526g5t9a0/imagem11.jpg', fotoAlt:'Paulo Mourão, presidente da ABIMAD',
      corpo:[
        'A Associação Brasileira das Indústrias de Móveis de Alta Decoração foi fundada em 2003 e reúne empresas voltadas ao mobiliário e aos acessórios de alta decoração, promovendo negócios, design e internacionalização.',
        'Paulo Mourão foi reconduzido à presidência para o biênio 2026–2028. Empresário do setor moveleiro, também assumiu em 2026 a presidência da Associação Comercial do Paraná.'
      ],
      contato:'Rua Geraldo Flausino Gomes, 42, Conj. 112 – Cidade Monções, São Paulo/SP • +55 (11) 5505-1214 • abimad@abimad.com.br',
      mensagem:sugestao('ABIMAD','a alta decoração, o design e os negócios do mobiliário brasileiro'),
      links:[fonte('https://www.abimad.com.br/institucional/contato','Diretoria e contato'),fonte('https://www.abimad.com.br/noticia/abimad_reelege_diretoria_e_inicia_novo_bienio_com_foco_na_continuidade_e_no_fortalecimento_do_setor','Gestão 2026–2028')]
    },
    'senai-iel': {
      tipo:'Entidade', titulo:'SENAI-DF & IEL-DF — Sistema Fibra', subtitulo:'Presidente do Sistema Fibra: Jamal Jorge Bittar',
      foto:'https://live.staticflickr.com/65535/53037704782_68fdc11026.jpg', fotoAlt:'Jamal Jorge Bittar, presidente do Sistema Fibra',
      corpo:[
        'No Distrito Federal, SENAI e IEL integram o Sistema Fibra. O SENAI atua na educação profissional, tecnologia e inovação; o IEL conecta indústria, talentos, estágio, desenvolvimento de carreiras e formação executiva.',
        'Jamal Jorge Bittar preside o Sistema Fibra e o Conselho Regional do SENAI-DF, dentro da estrutura institucional que reúne FIBRA, SESI, SENAI e IEL-DF.'
      ],
      contato:'SAC Sistema Fibra: (61) 4042-6565 • SENAI SIA: SIA Trecho 2, Lote 1.125, Brasília/DF • IEL-DF: SCN Quadra 1, Bloco E, 14º andar, Ed. Central Park, Brasília/DF',
      mensagem:sugestao('SENAI-DF e IEL-DF','a formação profissional, a inovação e a conexão entre indústria e talentos'),
      links:[fonte('https://sistemafibra.org.br/fibra/institucional/contatos','Contatos Sistema Fibra'),fonte('https://www.sistemafibra.org.br/senai/transparencia/informacoes-de-dirigentes-e-empregados/relacao-de-dirigentes','Dirigentes SENAI-DF')]
    },
    'apexbrasil': {
      tipo:'Entidade', titulo:'ApexBrasil', subtitulo:'Presidente: Laudemir Müller',
      foto:'https://s2-valor.glbimg.com/VdkDRkZh_KvI6FhKWv3LY71gvbE%3D/0x0%3A6916x4697/984x0/smart/filters%3Astrip_icc%28%29/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2026/d/p/PokYbwR0A2Wcd87uLYPA/olho-1.jpeg', fotoAlt:'Laudemir Müller, presidente da ApexBrasil',
      corpo:[
        'A Agência Brasileira de Promoção de Exportações e Investimentos promove produtos e serviços brasileiros no exterior e atua na atração de investimentos estrangeiros para setores estratégicos da economia.',
        'Laudemir Müller assumiu a presidência da ApexBrasil em 2026. A Agência mantém projetos com entidades do setor moveleiro, incluindo ações de internacionalização e promoção comercial.'
      ],
      contato:'SGAS 903, Lote 80, Asa Sul, Brasília/DF – CEP 70390-030 • +55 (61) 2027-0202 • +55 (61) 2027-0203 • apexbrasil@apexbrasil.com.br',
      mensagem:sugestao('ApexBrasil','a internacionalização, o design brasileiro e a inserção de empresas em novos mercados'),
      links:[fonte('https://apexbrasil.com.br/memoria','Memória institucional e presidência'),fonte('https://apexbrasil.com.br/','Site oficial')]
    },
    'casacor': {
      tipo:'Feira & evento', titulo:'CASACOR Brasília 2026', subtitulo:'Arquitetura, interiores, paisagismo e design',
      corpo:[
        'A 34ª edição da CASACOR Brasília acontece na Casa do Candango, na Asa Sul, reunindo ambientes de arquitetura, design de interiores, arte e paisagismo.',
        'A temporada de 2026 vai de 12 de agosto a 12 de outubro e reforça a conexão entre Brasília, Cerrado, sustentabilidade, acessibilidade e novas formas de morar.'
      ],
      contato:'Casa do Candango – SGAS 603, Conjunto A, Brasília/DF • 12 de agosto a 12 de outubro de 2026',
      links:[fonte('https://casacor.abril.com.br/pt-BR/mostras/brasilia','Página oficial da mostra')]
    },
    'movelsul': {
      tipo:'Feira & evento', titulo:'Movelsul Brasil', subtitulo:'25ª edição realizada em Bento Gonçalves (RS)',
      corpo:[
        'A Movelsul Brasil é uma das principais plataformas de negócios da cadeia moveleira latino-americana. A 25ª edição foi realizada de 17 a 20 de agosto de 2026 no Parque de Eventos de Bento Gonçalves.',
        'A edição reuniu 300 marcas expositoras de mais de 80 cidades e recebeu 17.238 visitantes, com participação internacional e forte agenda de negócios e exportação.'
      ],
      contato:'Parque de Eventos de Bento Gonçalves – Alameda Fenavinho, 481, Bento Gonçalves/RS',
      links:[fonte('https://www.movelsul.com.br/','Site oficial'),fonte('https://www.movelsul.com.br/imprensa/noticias/quatro-continentes-buscaram-negocios-e-conexoes-na-25a-movelsul-brasil/','Balanço da edição 2026')]
    },
    'materia-corporativos': {
      tipo:'Matéria', titulo:'Escritórios mudam e mobiliário acompanha novas formas de trabalhar', subtitulo:'Móveis corporativos',
      corpo:['Ambientes de trabalho mais flexíveis exigem mobiliário capaz de acompanhar diferentes tarefas, perfis e tempos de permanência. Ergonomia, acústica, mobilidade e conforto deixam de ser detalhes e passam a integrar o planejamento do espaço.','A tendência é combinar mesas, estações compartilhadas, salas de colaboração e áreas de concentração com soluções modulares. O resultado é um escritório que responde melhor às mudanças de equipe e de rotina.','Para fornecedores e arquitetos, esse movimento amplia o valor da consultoria: a escolha do móvel passa a ser parte de uma estratégia de produtividade, saúde ocupacional e experiência do usuário.']
    },
    'materia-planejados': {
      tipo:'Matéria', titulo:'Planejados combinam aproveitamento de espaço e personalização', subtitulo:'Móveis planejados',
      corpo:['Os móveis planejados avançam com soluções milimétricas para cozinhas, dormitórios, áreas sociais e home offices, integrando armazenamento, circulação e estética.','Ferragens, iluminação, automação e variedade de acabamentos aumentam a possibilidade de personalização e tornam o projeto mais aderente ao estilo de vida de cada família.','O diferencial está menos na quantidade de peças e mais na capacidade de resolver o espaço com precisão, acabamento e durabilidade.']
    },
    'materia-casacor': {
      tipo:'Matéria', titulo:'Brasília mantém protagonismo em arquitetura e interiores', subtitulo:'CASACOR Brasília',
      corpo:['A capital federal mantém uma cena relevante de arquitetura e interiores, apoiada por profissionais, mostras, fornecedores e uma identidade urbana singular.','A CASACOR Brasília 2026, realizada na Casa do Candango, funciona como vitrine para novas leituras do morar, do design e da paisagem, aproximando criação autoral e mercado.','A mostra também amplia a visibilidade de marcas e profissionais locais, reforçando a conexão de Brasília com tendências nacionais.'],
      links:[fonte('https://casacor.abril.com.br/pt-BR/mostras/brasilia','CASACOR Brasília')]
    },
    'materia-industria': {
      tipo:'Matéria', titulo:'Cadeia moveleira reúne indústria, comércio, design e exportação', subtitulo:'Indústria moveleira',
      corpo:['O setor de móveis conecta fabricantes, fornecedores de madeira e componentes, tecnologia, logística, varejo, arquitetos e designers. Essa diversidade exige articulação entre empresas e entidades.','Competitividade depende de produtividade, qualificação, inovação, sustentabilidade e acesso a mercados. Iniciativas de internacionalização também ajudam a posicionar o mobiliário brasileiro no exterior.','Entidades como ABIMÓVEL, SINDIMAM-DF, FIBRA, ABIMAD e ApexBrasil aparecem em diferentes etapas desse ecossistema.']
    },
    'materia-sustentabilidade': {
      tipo:'Matéria', titulo:'Madeira, rastreabilidade e circularidade ganham espaço no design', subtitulo:'Sustentabilidade',
      corpo:['A origem dos materiais, a eficiência produtiva e a gestão de resíduos ganharam relevância na indústria e na especificação de interiores.','Madeira certificada, reaproveitamento, redução de perdas, durabilidade e possibilidade de manutenção são critérios que ajudam a aproximar design e responsabilidade ambiental.','Para o consumidor, transparência sobre materiais e processos torna-se parte do valor percebido do produto.']
    },
    'materia-design': {
      tipo:'Matéria', titulo:'Autoria e identidade brasileira valorizam produtos e ambientes', subtitulo:'Design brasileiro',
      corpo:['O design brasileiro combina repertórios regionais, madeira, fibras, cerâmica, metal e técnicas artesanais com processos industriais contemporâneos.','A autoria agrega narrativa e diferenciação aos produtos, criando oportunidades para marcas que desejam competir por qualidade, identidade e valor agregado.','Quando indústria, artesanato e arquitetura dialogam, o resultado amplia a presença da economia criativa dentro da cadeia de móveis e decoração.']
    }
  };

  function escapeHTML(s){return String(s||'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));}
  function renderLinks(links){return (links||[]).map(l=>`<a class="detail-source" href="${escapeHTML(l.url)}" target="_blank" rel="noopener">${escapeHTML(l.rotulo)} ↗</a>`).join('');}
  function ensureModal(){
    if(document.getElementById('modalDetalhe')) return;
    const style=document.createElement('style');
    style.textContent=`
      .detail-click{cursor:pointer}.detail-click:focus-visible{outline:3px solid #d99b1d;outline-offset:3px}
      .brand-pill.detail-click:hover{border-color:#d99b1d;color:#8a6111;transform:translateY(-2px)}
      #modalDetalhe .modal-card{width:min(860px,100%);padding:0;overflow:hidden}
      .detail-scroll{max-height:90vh;overflow:auto}.detail-top{padding:26px 28px 20px;background:linear-gradient(135deg,#0d3152,#154d77);color:#fff}
      .detail-top .close{float:right;background:rgba(255,255,255,.15);color:#fff}.detail-kind{font-size:11px;font-weight:900;letter-spacing:1px;color:#ffd26c}
      .detail-top h3{color:#fff;margin:8px 48px 4px 0;font-size:clamp(28px,4vw,42px)}.detail-top p{margin:0;color:#dbe9f4;font-weight:700}
      .detail-body{padding:26px 28px 30px}.detail-leader{display:grid;grid-template-columns:190px 1fr;gap:22px;align-items:start;margin-bottom:22px}
      .detail-leader img{width:190px;height:190px;object-fit:cover;border-radius:20px;border:1px solid #dce5ec;box-shadow:0 12px 28px rgba(30,55,80,.14)}
      .detail-copy p{font-size:16px;line-height:1.62;color:#516a80;margin:0 0 14px}.detail-contact{padding:16px 18px;background:#f4f8fb;border:1px solid #dce5ec;border-radius:16px;margin:18px 0;font-size:15px;line-height:1.55;color:#183047}
      .detail-message{margin-top:22px;padding:22px;border-radius:20px;background:#fff9e9;border:1px solid #ecd59a}.detail-message h4{margin:0 0 6px;color:#7c5812;font-size:20px}.detail-disclaimer{font-size:12px!important;color:#806f4e!important;font-weight:800}
      .detail-sources{display:flex;gap:9px;flex-wrap:wrap;margin-top:18px}.detail-source{display:inline-flex;padding:9px 12px;border-radius:999px;background:#eef5f9;border:1px solid #d7e3eb;color:#0d3152;font-size:12px;font-weight:900}
      @media(max-width:650px){.detail-leader{grid-template-columns:1fr}.detail-leader img{width:150px;height:150px}.detail-body,.detail-top{padding-left:20px;padding-right:20px}}
    `;
    document.head.appendChild(style);
    const modal=document.createElement('div');
    modal.className='modal'; modal.id='modalDetalhe'; modal.setAttribute('aria-hidden','true');
    modal.innerHTML='<div class="modal-card detail-scroll" role="dialog" aria-modal="true" aria-labelledby="detailTitle"><div id="detailContent"></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click',e=>{if(e.target===modal)closeDetail();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeDetail();});
  }
  function openDetail(key){
    const d=detalhes[key]; if(!d) return;
    ensureModal();
    const photo=d.foto?`<div class="detail-leader"><img src="${escapeHTML(d.foto)}" alt="${escapeHTML(d.fotoAlt||d.titulo)}"><div class="detail-copy">${(d.corpo||[]).map(p=>`<p>${escapeHTML(p)}</p>`).join('')}</div></div>`:`<div class="detail-copy">${(d.corpo||[]).map(p=>`<p>${escapeHTML(p)}</p>`).join('')}</div>`;
    const contact=d.contato?`<div class="detail-contact"><strong>Contato e endereço</strong><br>${escapeHTML(d.contato)}</div>`:'';
    const message=d.mensagem?`<div class="detail-message"><h4>Mensagem institucional sugerida para aprovação</h4><p class="detail-disclaimer">Texto editorial sugerido pelo VOZ NEWS. Não constitui declaração pública do dirigente até aprovação expressa da entidade.</p>${d.mensagem.map(p=>`<p>${escapeHTML(p)}</p>`).join('')}</div>`:'';
    document.getElementById('detailContent').innerHTML=`<div class="detail-top"><button class="close" type="button" aria-label="Fechar">×</button><div class="detail-kind">${escapeHTML(d.tipo)}</div><h3 id="detailTitle">${escapeHTML(d.titulo)}</h3><p>${escapeHTML(d.subtitulo||'')}</p></div><div class="detail-body">${photo}${contact}${message}<div class="detail-sources">${renderLinks(d.links)}</div></div>`;
    document.querySelector('#modalDetalhe .close').onclick=closeDetail;
    const modal=document.getElementById('modalDetalhe'); modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
  }
  function closeDetail(){const m=document.getElementById('modalDetalhe');if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow='';}
  function bind(el,key){if(!el||!detalhes[key])return;el.classList.add('detail-click');el.dataset.detail=key;if(!/^(A|BUTTON)$/.test(el.tagName)){el.setAttribute('role','button');el.setAttribute('tabindex','0');}el.addEventListener('click',e=>{if(e.target.closest('a,button')&&e.target!==el)return;openDetail(key);});el.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!/^(A|BUTTON)$/.test(el.tagName)){e.preventDefault();openDetail(key);}});}

  function init(){
    ensureModal();
    const brandMap={'CORETO':'coreto','BONTEMPO':'bontempo','FIBRA':'fibra','SINDIMAM-DF':'sindimam','ABIMÓVEL':'abimovel','ABIMAD':'abimad','CASACOR':'casacor','MOVELSUL':'movelsul','SENAI':'senai-iel','IEL':'senai-iel','APEXBRASIL':'apexbrasil'};
    document.querySelectorAll('.brand-pill').forEach(el=>bind(el,brandMap[el.textContent.trim().toUpperCase()]));
    bind(document.querySelector('.coreto'),'coreto');

    const materialKeys=['materia-corporativos','materia-planejados','materia-casacor','materia-industria','materia-sustentabilidade','materia-design'];
    document.querySelectorAll('#materias .card').forEach((el,i)=>bind(el,materialKeys[i]));
    const fairMap={'CASACOR Brasília':'casacor','Movelsul Brasil':'movelsul','ABIMAD':'abimad'};
    document.querySelectorAll('#feiras .card').forEach(el=>bind(el,fairMap[el.querySelector('h3')?.textContent.trim()]));
    const entityMap={'FIBRA':'fibra','SINDIMAM-DF':'sindimam','ABIMÓVEL':'abimovel','ABIMAD':'abimad','SENAI & IEL':'senai-iel','ApexBrasil':'apexbrasil'};
    document.querySelectorAll('#entidades .card').forEach(el=>bind(el,entityMap[el.querySelector('h3')?.textContent.trim()]));
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
