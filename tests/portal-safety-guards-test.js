const fs = require('fs');
const path = require('path');

const criticalFiles = [
  'index.html',
  'top10-runtime.js',
  'top10-existing-portals.js',
  'energia/home.html',
  'mobilidade/index.html',
  'saude-beleza/index.html',
  'moveis-decoracao/index.html',
  'gastronomia/index.html',
  'poder-justica-cidadania/index.html',
  'economia-negocios-consumo/index.html',
  'tecnologia-ia-midia/index.html',
  'educacao-carreiras-cultura/index.html',
  'estilo-esporte-experiencias/index.html'
];

for (const file of criticalFiles) {
  if (!fs.existsSync(file)) throw new Error(`Arquivo crítico ausente: ${file}`);
  if (fs.statSync(file).size < 100) throw new Error(`Arquivo crítico vazio ou corrompido: ${file}`);
}

const runtime = fs.readFileSync('top10-runtime.js', 'utf8');
const routes = [
  '/poder-justica-cidadania/',
  '/economia-negocios-consumo/',
  '/energia/',
  '/mobilidade/',
  '/tecnologia-ia-midia/',
  '/saude-beleza/',
  '/moveis-decoracao/',
  '/gastronomia/',
  '/educacao-carreiras-cultura/',
  '/estilo-esporte-experiencias/'
];

for (const route of routes) {
  if (!runtime.includes(`siteHref:'${route}'`)) {
    throw new Error(`Rota protegida removida do TOP 10: ${route}`);
  }
}

const textExtensions = new Set(['.html', '.js', '.css', '.json', '.yml', '.yaml', '.md']);
const ignoreDirs = new Set(['.git', 'node_modules', '.vercel', 'dist', 'build']);
const secretPatterns = [
  /ghp_[A-Za-z0-9]{30,}/,
  /github_pat_[A-Za-z0-9_]{30,}/,
  /sk-proj-[A-Za-z0-9_-]{20,}/,
  /AKIA[0-9A-Z]{16}/,
  /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /SUPABASE_SERVICE_ROLE_KEY\s*[:=]\s*['"][^'"]+['"]/,
  /STRIPE_SECRET_KEY\s*[:=]\s*['"][^'"]+['"]/
];

function scanDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoreDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(full);
      continue;
    }
    if (!textExtensions.has(path.extname(entry.name).toLowerCase())) continue;
    const source = fs.readFileSync(full, 'utf8');

    if (/^(<<<<<<<|=======|>>>>>>>)/m.test(source)) {
      throw new Error(`Conflito de merge não resolvido em: ${full}`);
    }
    if (/href\s*=\s*["']javascript:/i.test(source)) {
      throw new Error(`Link javascript: bloqueado em: ${full}`);
    }
    if (/<script[^>]+src\s*=\s*["']http:\/\//i.test(source)) {
      throw new Error(`Script inseguro HTTP bloqueado em: ${full}`);
    }
    for (const pattern of secretPatterns) {
      if (pattern.test(source)) {
        throw new Error(`Possível segredo exposto em: ${full}`);
      }
    }
  }
}

scanDir('.');

console.log('PASS: filtros de proteção, integridade, rotas e segredos verificados');
