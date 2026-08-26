const fs=require('fs');
const html=fs.readFileSync('energia/index.html','utf8');
const checks=[
 ['imagem original carregada diretamente',/src="\/energia\/hero-energia-hq\.jpg/],
 ['raio realista no hero',/class="energy-lightning"[\s\S]*@keyframes lightningPulse/],
 ['agua em movimento',/@keyframes waterFlow[\s\S]*translateY/],
 ['homem em movimento',/@keyframes operatorMove/],
 ['numeros verde limao',/\.metric strong\{[^}]*#68ff3d/],
 ['contadores partem de 1',/data-target="220"[\s\S]*data-target="200"[\s\S]*data-target="1000"[\s\S]*data-target="10000"/],
 ['animacao de contagem',/requestAnimationFrame[\s\S]*data-target/]
];
let failed=0;
for(const [name,re] of checks){if(!re.test(html)){console.error('FAIL:',name);failed++}else console.log('OK:',name)}
process.exit(failed?1:0);
