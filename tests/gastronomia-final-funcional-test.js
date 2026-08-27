const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));
const must=(c,m)=>{if(!c) throw new Error(m)};
const html=read('gastronomia/index.html');
const personalities={
  'Babi Frazão':'babi-frazao',
  'Dudu Camargo':'dudu-camargo',
  'Francisco Ansiliero':'francisco-ansiliero',
  'Mara Alcamim':'mara-alcamim',
  'Marco Espinoza':'marco-espinoza',
  'Marcelo Petrarca':'marcelo-petrarca',
  'Paulo Tarso':'paulo-tarso',
  'Renata La Porta':'renata-la-porta'
};
for(const [name,slug] of Object.entries(personalities)){
  const href=`/gastronomia/personalidades/${slug}.html`;
  must(html.includes(href),`${name} sem link interno`);
  const file=`gastronomia/personalidades/${slug}.html`;
  must(exists(file),`página ausente: ${file}`);
  const page=read(file);
  must(page.includes(name),`nome ausente em ${file}`);
  must(page.includes('VOZ NEWS GASTRONOMIA'),`identidade ausente em ${file}`);
}
const cerrado={
  'Pequi':['pequi','Pequi_do_cerrado.jpg'],
  'Baru':['baru','Dipteryx_alata_fruits.jpg'],
  'Buriti':['buriti','Mauritia-flexuosa-fruit.jpg'],
  'Cagaita':['cagaita','Cagaita.jpg'],
  'Guariroba':['guariroba','Syagrus-oleracea.jpg'],
  'Cajuzinho-do-cerrado':['cajuzinho-do-cerrado','Cajuzindo-do-cerrado.jpg']
};
for(const [name,[slug,image]] of Object.entries(cerrado)){
  const href=`/gastronomia/cerrado/${slug}.html`;
  must(html.includes(href),`${name} sem link de receita`);
  must(html.includes(image),`${name} sem foto correta na capa`);
  const file=`gastronomia/cerrado/${slug}.html`;
  must(exists(file),`página do Cerrado ausente: ${file}`);
  const page=read(file);
  must(page.includes(name),`${name} ausente em ${file}`);
  must(page.includes('RECEITA'),`${name} sem receita em ${file}`);
}
for(const slug of ['hamburguer','pizza','cafes','doces','ambiente','fotos']){
  const file=`gastronomia/jovens/${slug}.html`;
  must(exists(file),`tema jovem ausente: ${slug}`);
  const page=read(file);
  must(page.includes('VOZ NEWS'),`${slug} sem identidade Voz News`);
  must(page.includes('BUSCAR RESTAURANTES'),`${slug} sem ação para o guia`);
}
const events={
  'Brasília Restaurant Week':'brasilia-restaurant-week',
  'Feiras do DF':'feiras-do-df',
  'Festivais do Cerrado':'festivais-do-cerrado'
};
for(const [name,slug] of Object.entries(events)){
  const href=`/gastronomia/eventos/${slug}.html`;
  must(html.includes(href),`${name} sem link`);
  must(exists(`gastronomia/eventos/${slug}.html`),`matéria de evento ausente: ${slug}`);
}
for(const href of ['/gastronomia/jovens/hamburguer.html','/gastronomia/jovens/doces.html','/gastronomia/jovens/ambiente.html']){
  must(html.includes(href),`card editorial jovem sem link: ${href}`);
}
console.log('gastronomia-final-funcional-test: PASS');
