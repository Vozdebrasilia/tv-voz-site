const fs=require('fs');
const js=fs.readFileSync('v33-did-player.js','utf8');
const checks=[
 ['mercado continua exatamente como aprovado',/\.vn-market-runner\{[\s\S]*animation:vnMarket 18s linear infinite/],
 ['faixa branca frontal foi removida',/\.vn-lightfx::after\{content:none!important;display:none!important;animation:none!important\}/],
 ['leds de fundo foram reforcados',/radial-gradient\(circle at 7% 5%[\s\S]*radial-gradient\(circle at 95% 4%[\s\S]*radial-gradient\(circle at 94% 28%/],
 ['noticias quentes passam mais suavemente',/\.vn-hot-runner\{[\s\S]*animation:vnHot 36s linear infinite[\s\S]*backface-visibility:hidden[\s\S]*transform:translateZ\(0\)/],
 ['noticias mantem loop continuo',/@keyframes vnHot\{from\{transform:translate3d\(0,0,0\)\}to\{transform:translate3d\(-50%,0,0\)\}\}/],
 ['movimento solicitado nao pode ser desligado por prefers-reduced-motion',!/prefers-reduced-motion:reduce[\s\S]*\.vn-market-runner[\s\S]*animation:none!important/.test(js)]
];
let failed=0;
for(const [name,test] of checks){const ok=test instanceof RegExp?test.test(js):test;if(!ok){console.error('FAIL:',name);failed++}else console.log('OK:',name)}
process.exit(failed?1:0);
