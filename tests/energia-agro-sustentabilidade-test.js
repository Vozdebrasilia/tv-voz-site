const fs=require('fs');
const assert=require('assert');
function read(p){return fs.readFileSync(p,'utf8')}
assert(fs.existsSync('agronegocio/index.html'),'agronegocio/index.html deve existir');
assert(fs.existsSync('sustentabilidade/index.html'),'sustentabilidade/index.html deve existir');
assert(fs.existsSync('energia/vertical-tabs.js'),'energia/vertical-tabs.js deve existir');
const tabs=read('energia/vertical-tabs.js');
for(const href of ['/energia/','/agronegocio/','/sustentabilidade/']) assert(tabs.includes(href),`tabs deve linkar ${href}`);
for(const p of ['agronegocio/index.html','sustentabilidade/index.html']){
  const html=read(p);
  for(const href of ['/energia/','/agronegocio/','/sustentabilidade/']) assert(html.includes(href),`${p} deve linkar ${href}`);
  assert(/fontes oficiais/i.test(html),'deve indicar fontes oficiais');
  assert(/Paulo Fayad/i.test(html),'deve ter assinatura/voz autoral de Paulo Fayad');
  assert(/entrevista/i.test(html),'deve ter entrevistas');
  assert(/pesquis/i.test(html),'deve ter consulta/pesquisa');
  assert(/source-card|source-link/i.test(html),'deve ter links de fontes');
  assert(/@keyframes|animation:/i.test(html),'deve ter movimento visual');
  assert(/agenciabrasil|gov\.br|agenciabrasilia/i.test(html),'deve usar fonte institucional');
}
console.log('OK');