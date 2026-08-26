const fs=require('fs');
const html=fs.readFileSync('energia/index.html','utf8');
const checks=[
 ['raio com tremor',/class="bolt[^\"]*energy-shake|\.bolt\{[^}]*animation:/s],
 ['agua mais perceptivel',/@keyframes waterFlow[\s\S]*translateY\([^)]*[4-9]px/],
 ['homem com movimento',/@keyframes operatorMove/],
 ['contadores partem de 1',/data-target="220"[\s\S]*data-target="200"[\s\S]*data-target="1000"[\s\S]*data-target="10000"/],
 ['animacao de contagem',/requestAnimationFrame[\s\S]*data-target/]
];
let failed=0;
for(const [name,re] of checks){if(!re.test(html)){console.error('FAIL:',name);failed++}else console.log('OK:',name)}
process.exit(failed?1:0);
