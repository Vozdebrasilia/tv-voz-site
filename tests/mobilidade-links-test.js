const fs = require('fs');
const html = fs.readFileSync('mobilidade/index.html','utf8');
const must=(c,m)=>{if(!c) throw new Error(m)};
['240K+','200M+','1.000+','10.000+','40 anos'].forEach(v=>must(html.includes(v),`métrica ausente: ${v}`));
['logo-voznews-oficial.png','selo-40anos-transparente.png','logo-ibj.jpg','capa-anuario.jpg','logo-trofeu.jpg'].forEach(v=>must(html.includes(v),`logo ausente: ${v}`));
['automoveis','motos','bikes','eletricos','locadoras','concessionarias','nautica','aviacao','tecnologia','lancamentos'].forEach(v=>must(html.includes(`/mobilidade/tema.html?tema=${v}`),`editoria sem link: ${v}`));
['carros','nautica','bikes','aviacao','locadoras','eletricos','test-drive','entrevistas','paulo-fayad','deijanete-fayad'].forEach(v=>must(html.includes(`/mobilidade/tema.html?tema=${v}`),`destaque sem link: ${v}`));
['mobility-search','search-term','search-location','search-vehicle','search-service','search-category','search-results'].forEach(v=>must(html.includes(v),`controle de pesquisa ausente: ${v}`));
['Localiza','Movida','Unidas','Foco','Avis','Hertz','Europcar','Sixt','Enterprise'].forEach(v=>must(html.includes(v),`locadora inicial ausente: ${v}`));
must(html.includes('/api/mobilidade-search'),'endpoint de pesquisa não conectado');
must(html.includes('class="brand-item" href='),'logos institucionais sem clique');
must(fs.existsSync('api/mobilidade-search.js'),'endpoint de pesquisa ausente');
must(fs.existsSync('mobilidade/tema.html'),'página de destino ausente');

// Nova camada editorial e comercial.
for(let i=1;i<=6;i++) must(html.includes(`../assets/awards/card-0${i}.jpg`),`premiação ausente: card-0${i}.jpg`);
const adCount=(html.match(/ESPAÇO PUBLICITÁRIO • DEMONSTRAÇÃO/g)||[]).length;
must(adCount===4,`esperados 4 anúncios demonstrativos, encontrados ${adCount}`);
must(fs.existsSync('mobilidade/conteudo.js'),'base editorial da Mobilidade ausente');
must(fs.existsSync('mobilidade/materia.html'),'página de matéria ausente');
const tema=fs.readFileSync('mobilidade/tema.html','utf8');
const materia=fs.readFileSync('mobilidade/materia.html','utf8');
const conteudo=fs.readFileSync('mobilidade/conteudo.js','utf8');
must(tema.includes('conteudo.js'),'tema não carrega a base editorial');
must(tema.includes('/mobilidade/materia.html?id='),'cards de tema não abrem matérias');
must(materia.includes('conteudo.js'),'matéria não carrega a base editorial');
must(materia.includes('240K+'),'matéria não usa métrica atualizada');
['aviacao-companhias','aviacao-taxi-aereo','aviacao-aeroportos','aviacao-executiva'].forEach(id=>must(conteudo.includes(id),`subtema de aviação ausente: ${id}`));
must(conteudo.includes('Jeep Avenger'),'lançamento atual do mercado ausente');
must(conteudo.includes('02 de setembro de 2026'),'data do lançamento atual ausente');
['automoveis','motos','bikes','eletricos','locadoras','concessionarias','nautica','aviacao','tecnologia','lancamentos','carros','test-drive','entrevistas','paulo-fayad','deijanete-fayad'].forEach(v=>{
  const plain=`${v}:`;
  const quoted1=`'${v}':`;
  const quoted2=`"${v}":`;
  must(conteudo.includes(plain)||conteudo.includes(quoted1)||conteudo.includes(quoted2),`tema sem conteúdo específico: ${v}`);
});
console.log('Mobilidade: estrutura, pesquisa, matérias, premiações e anúncios OK');
