const fs=require('fs');
const html=fs.readFileSync('energia/index.html','utf8');
const checks=[
 ['imagem original vem dos chunks validos',/Promise\.all\(\['01','02','03','04'\]/],
 ['hero reserva proporcao antes da imagem',/\.hero-motion\{[^}]*aspect-ratio\s*:\s*16\s*\/\s*9/s],
 ['nao usa jpg corrompido como fonte principal',!/src="\/energia\/hero-energia-hq\.jpg/.test(html)],
 ['raio realista no hero',/class="energy-lightning"[\s\S]*@keyframes lightningPulse/],
 ['agua em movimento',/@keyframes waterFlow[\s\S]*translateY/],
 ['homem em movimento',/@keyframes operatorMove/],
 ['numeros verde limao',/\.metric strong\{[^}]*#68ff3d/],
 ['contadores partem de 1',/data-target="220"[\s\S]*data-target="200"[\s\S]*data-target="1000"[\s\S]*data-target="10000"/],
 ['animacao de contagem',/requestAnimationFrame[\s\S]*data-target/]
];
let failed=0;
for(const [name,test] of checks){const ok=test instanceof RegExp?test.test(html):test;if(!ok){console.error('FAIL:',name);failed++}else console.log('OK:',name)}
process.exit(failed?1:0);
