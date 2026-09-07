const fs = require('fs');

const runtime = fs.readFileSync('top10-runtime.js', 'utf8');
const loader = fs.readFileSync('v33-did-player.js', 'utf8');

for (let rank = 1; rank <= 10; rank += 1) {
  const suffix = String(rank).padStart(2, '0');
  const imagePath = `/assets-v23/top10-hq/top-${suffix}.webp`;
  if (!runtime.includes(imagePath)) {
    throw new Error(`Imagem HQ ausente: ${imagePath}`);
  }

  const diskPath = `assets-v23/top10-hq/top-${suffix}.webp`;
  if (!fs.existsSync(diskPath)) {
    throw new Error(`Arquivo HQ ausente: ${diskPath}`);
  }

  const bytes = fs.statSync(diskPath).size;
  if (bytes < 100000) {
    throw new Error(`Imagem HQ pequena demais: ${diskPath} (${bytes} bytes)`);
  }
}

if (!/@keyframes top10KenBurns/.test(runtime)) {
  throw new Error('Movimento suave não foi definido para as capas TOP 10');
}

if (!/\.top10-visual:before\{[^}]*animation:top10KenBurns/.test(runtime)) {
  throw new Error('O movimento não está aplicado a todas as dez capas');
}

if (/top10-bright-data\/part-0[12]\.txt/.test(runtime)) {
  throw new Error('A versão antiga de baixa resolução ainda está ativa');
}

if (!/top10-runtime\.js\?v=20260907-hq-motion/.test(loader)) {
  throw new Error('O carregador ainda aponta para a versão antiga do Portal Nota 10');
}

console.log('PASS: dez capas TOP 10 em alta qualidade e com movimento');
