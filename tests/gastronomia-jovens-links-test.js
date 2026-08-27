const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'gastronomia/index.html'),'utf8');
const js=fs.readFileSync(path.join(root,'gastronomia/gastronomia.js'),'utf8');
const must=(c,m)=>{if(!c) throw new Error(m)};

must(!html.includes('Paulo Filho'),'nome real Paulo Filho ainda visível no HTML');
must(!html.includes('Isabella'),'nome real Isabella ainda visível no HTML');
must(!js.includes('Paulo Filho'),'nome real Paulo Filho ainda visível no JS');
must(!js.includes('Isabella'),'nome real Isabella ainda visível no JS');
must(html.includes('Lucas Ferraz') || js.includes('Lucas Ferraz'),'Lucas Ferraz ausente');
must(html.includes('Sofia Martins') || js.includes('Sofia Martins'),'Sofia Martins ausente');
for(const slug of ['hamburguer','pizza','cafes','doces','ambiente','fotos']){
  must(html.includes(`/gastronomia/jovens/${slug}.html`) || js.includes(`/gastronomia/jovens/${slug}.html`),`link jovem ausente: ${slug}`);
  must(fs.existsSync(path.join(root,`gastronomia/jovens/${slug}.html`)),`página jovem ausente: ${slug}`);
}
console.log('gastronomia-jovens-links-test: PASS');
