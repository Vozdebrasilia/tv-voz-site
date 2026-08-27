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
  if (!source.includes(`portal-${slug}.svg`)) throw new Error(`Imagem do portal ausente: ${slug}`);
}
const cardCount = (source.match(/slug:'/g) || []).length;
if (cardCount !== 40) throw new Error(`Esperados 40 portais, encontrados ${cardCount}`);
console.log('PASS: 40 portais protegidos com imagens específicas');
