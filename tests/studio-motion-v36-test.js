const fs=require('fs');
const js=fs.readFileSync('v33-did-player.js','utf8');
const checks=[
 ['mercado corre continuamente e mais visivel',/\.vn-market-runner\{[\s\S]*animation:vnMarket 18s linear infinite/],
 ['noticias quentes correm continuamente',/\.vn-hot-runner\{[\s\S]*animation:vnHot 22s linear infinite/],
 ['leds recebem varredura luminosa',/\.vn-lightfx::after\{[\s\S]*animation:vnLedSweep 5\.8s linear infinite/],
 ['varredura atravessa o estudio',/@keyframes vnLedSweep\{[\s\S]*translate3d\(220%,0,0\)/]
];
let failed=0;
for(const [name,re] of checks){const ok=re.test(js);if(!ok){console.error('FAIL:',name);failed++}else console.log('OK:',name)}
process.exit(failed?1:0);
