const fs = require('fs');
const source = fs.readFileSync('ecossistema-40-portais.js','utf8');
const loader = fs.readFileSync('voznews-accessibilidade.js','utf8');
const required = [
'energia','bancos','aviacao','automoveis','agro','tecnologia','saude-bem-estar','farma','turismo','imoveis','esg','logistica','poder','justica','seguranca','educacao','empreendedorismo','cultura','esportes','ibj-acao-social','fitness','casa','drogarias','beleza','computadores','fotografia','gastronomia-negocios','adegas','pet','moda','oticas','odontologia','reforma','varejo','hoteis','cursos','seguros','condominios','festas','motos'
];
if (!source.includes('installProtectedEcosystem')) throw new Error('Ecossistema protegido não instalado');
if (!loader.includes('/ecossistema-40-portais.js')) throw new Error('Loader do ecossistema não está ativo');
for (const slug of required) {
  if (!source.includes(`slug:'${slug}'`)) throw new Error(`Portal ausente: ${slug}`);
  const image = `assets-v23/portal-${slug}.svg`;
  if (!fs.existsSync(image)) throw new Error(`Imagem física do portal ausente: ${slug}`);
}
const cardCount = (source.match(/slug:'/g) || []).length;
if (cardCount !== 40) throw new Error(`Esperados 40 portais, encontrados ${cardCount}`);
if (!source.includes('hydrateThemePhotos')) throw new Error('Carregamento direto das fotos temáticas não instalado');
if (!source.includes('class="portal-theme-photo"')) throw new Error('Cards não possuem IMG direto para a foto temática');
if (!source.includes('class="portal-brand-badge"')) throw new Error('Marca VOZ NEWS não está sobre as fotos');
if (source.includes('<object class="eco-portal-img"')) throw new Error('SVG embutido por object não é compatível com Safari/iPhone');
console.log('PASS: 40 portais protegidos com fotos temáticas diretas e marca VOZ NEWS');
