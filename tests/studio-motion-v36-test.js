const fs=require('fs');
const js=fs.readFileSync('v33-did-player.js','utf8');
const checks=[
 ['imagem aprovada permanece exatamente a mesma',/src="\/studio-voznews-final\.png\?v=20260905-hq-luzes"/],
 ['mercado continua exatamente como aprovado',/\.vn-market-runner\{[\s\S]*animation:vnMarket 18s linear infinite/],
 ['faixa branca frontal foi removida',/\.vn-lightfx::after\{content:none!important;display:none!important;animation:none!important\}/],
 ['leds de fundo foram reforcados',/radial-gradient\(circle at 7% 5%[\s\S]*radial-gradient\(circle at 95% 4%[\s\S]*radial-gradient\(circle at 94% 28%/],
 ['noticias quentes passam mais suavemente',/\.vn-hot-runner\{[\s\S]*animation:vnHot 36s linear infinite[\s\S]*backface-visibility:hidden[\s\S]*transform:translateZ\(0\)/],
 ['noticias mantem loop continuo',/@keyframes vnHot\{from\{transform:translate3d\(0,0,0\)\}to\{transform:translate3d\(-50%,0,0\)\}\}/],
 ['movimento solicitado nao pode ser desligado por prefers-reduced-motion',!/prefers-reduced-motion:reduce[\s\S]*\.vn-market-runner[\s\S]*animation:none!important/.test(js)],
 ['camada de avatares e isolada do restante do studio',/class="vn-avatar-stage"/],
 ['Deijanete usa camada propria sem substituir o cenario',/class="vn-avatar-host vn-avatar-deijanete"/],
 ['Paulo usa camada propria sem substituir o cenario',/class="vn-avatar-host vn-avatar-paulo"/],
 ['conversa usa os dez clipes aprovados de apresentadores reais',/assets\/v33-real\/01-paulo\.mp4[\s\S]*assets\/v33-real\/02-deijanete\.mp4[\s\S]*assets\/v33-real\/09-paulo\.mp4[\s\S]*assets\/v33-real\/10-deijanete\.mp4/],
 ['lip sync vem do video aprovado e fica acima da imagem mas abaixo dos efeitos',/\.vn-avatar-video\{[\s\S]*z-index:4!important/],
 ['reacao de Deijanete se orienta para Paulo',/@keyframes vnPartnerRight\{/],
 ['reacao de Paulo se orienta para Deijanete',/@keyframes vnPartnerLeft\{/],
 ['camada animada e recortada antes das duas faixas inferiores',/\.vn-avatar-stage\{[\s\S]*clip-path:inset\(0 0 10\.4% 0\)!important/],
 ['audio so e liberado por gesto do visitante sem criar novo controle visual',/addEventListener\('pointerdown',enableAvatarAudio/]
];
let failed=0;
for(const [name,test] of checks){const ok=test instanceof RegExp?test.test(js):test;if(!ok){console.error('FAIL:',name);failed++}else console.log('OK:',name)}
process.exit(failed?1:0);
