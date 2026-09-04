const fs = require('fs');
const source = fs.readFileSync('ecossistema-40-portais.js','utf8');
const loader = fs.readFileSync('voznews-accessibilidade.js','utf8');
const required = [
'energia','bancos','aviacao','automoveis','agro','tecnologia','saude-bem-estar','farma','turismo','imoveis','esg','logistica','poder','justica','seguranca','educacao','empreendedorismo','cultura','esportes','ibj-acao-social','fitness','casa','drogarias','beleza','computadores','fotografia','gastronomia-negocios','adegas','pet','moda','oticas','odontologia','reforma','varejo','hoteis','cursos','seguros','condominios','festas','motos'
];

const must = (condition, message) => { if (!condition) throw new Error(message); };
const hasFallback = slug => source.includes(`${slug}:'https://`) || source.includes(`'${slug}':'https://`);

must(required.length === 40, `Lista de proteção deve conter 40 portais, contém ${required.length}`);
must(loader.includes('/ecossistema-40-portais.js'), 'Loader do ecossistema não está ativo');
must(source.includes('const liveRoutes={'), 'Mapa de portais completos não está instalado');
must(source.includes('const fallback={'), 'Mapa de fotos temáticas não está instalado');
must(source.includes('async function resolveThemeImage'), 'Resolvedor de fotos temáticas não está instalado');
must(source.includes('const svgPath=`/assets-v23/portal-${slug}.svg`;'), 'Fallback físico das imagens temáticas não está protegido');
must(source.includes("document.querySelectorAll('.eco-portal')") || source.includes("section.querySelectorAll('.eco-portal')"), 'Cards do ecossistema não são hidratados');
must(source.includes("img.referrerPolicy='no-referrer'"), 'Proteção de carregamento das fotos externas ausente');
must(source.includes("b.textContent='SITE ATIVO'"), 'Selo SITE ATIVO ausente para verticais completos');
must(!source.includes('<object class="eco-portal-img"'), 'SVG embutido por object não é compatível com Safari/iPhone');

for (const slug of required) {
  must(hasFallback(slug), `Foto temática/fallback ausente: ${slug}`);
  const image = `assets-v23/portal-${slug}.svg`;
  must(fs.existsSync(image), `Imagem física do portal ausente: ${slug}`);
}

for (const [slug, route] of [
  ['automoveis','/mobilidade/'],
  ['casa','/moveis-decoracao/'],
  ['gastronomia-negocios','/gastronomia/'],
  ['saude-bem-estar','/saude-beleza/'],
  ['beleza','/saude-beleza/']
]) {
  must(source.includes(`'${slug}':'${route}'`), `Rota ativa ausente ou alterada: ${slug} -> ${route}`);
}

console.log('PASS: 40 portais protegidos, fotos temáticas preservadas e rotas ativas validadas');
