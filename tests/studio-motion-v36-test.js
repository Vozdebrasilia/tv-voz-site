const fs=require('fs');
const js=fs.readFileSync('v33-did-player.js','utf8');
const checks=[
 ['imagem aprovada permanece exatamente a mesma',/src="\/studio-voznews-final\.png\?v=20260905-hq-luzes"/],
 ['mercado continua exatamente como aprovado',/\.vn-market-runner\{[\s\S]*animation:vnMarket 18s linear infinite/],
 ['faixa branca frontal foi removida',/\.vn-lightfx::after\{content:none!important;display:none!important;animation:none!important\}/],
 ['leds de fundo foram preservados',/radial-gradient\(circle at 7% 5%[\s\S]*radial-gradient\(circle at 95% 4%[\s\S]*radial-gradient\(circle at 94% 28%/],
 ['noticias quentes continuam suaves',/\.vn-hot-runner\{[\s\S]*animation:vnHot 36s linear infinite[\s\S]*backface-visibility:hidden[\s\S]*transform:translateZ\(0\)/],
 ['noticias mantem loop continuo',/@keyframes vnHot\{from\{transform:translate3d\(0,0,0\)\}to\{transform:translate3d\(-50%,0,0\)\}\}/],
 ['movimento solicitado nao pode ser desligado por prefers-reduced-motion',!/prefers-reduced-motion:reduce[\s\S]*\.vn-market-runner[\s\S]*animation:none!important/.test(js)],
 ['videos enviados para clonagem de voz nao podem ser usados como camada visual',!/assets\/v33-real\//.test(js)],
 ['usa clipes D-ID aprovados de Paulo',/\/assets\/v33-did\/01-paulo\.mp4[\s\S]*\/assets\/v33-did\/03-paulo\.mp4/],
 ['usa clipes D-ID aprovados de Deijanete',/\/assets\/v33-did\/02-deijanete\.mp4[\s\S]*\/assets\/v33-did\/10-deijanete\.mp4/],
 ['mascara regional de Deijanete preserva corpo e bancada',/studio-deijanete-regions-mask\.png/],
 ['mascara regional de Paulo preserva corpo e bancada',/studio-paulo-regions-mask\.png/],
 ['camada D-ID fica abaixo das luzes',/\.vn-did-layer\{[^}]*z-index:5/],
 ['faixa Mercado fica acima dos avatares',/\.vn-market\{[^}]*z-index:50/],
 ['faixa Noticias Quentes fica acima dos avatares',/\.vn-hot\{[^}]*z-index:51/],
 ['audio dos clipes nao fica mudo',/video\.muted=false/],
 ['nenhum overlay bruto antigo retorna',!/vn-avatar-video|vn-avatar-stage/.test(js)]
];
let failed=0;
for(const [name,test] of checks){const ok=test instanceof RegExp?test.test(js):test;if(!ok){console.error('FAIL:',name);failed++}else console.log('OK:',name)}
process.exit(failed?1:0);
