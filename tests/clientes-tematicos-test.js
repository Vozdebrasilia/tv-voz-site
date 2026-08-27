const fs=require('fs');
const src=fs.readFileSync('clientes-tematicos.js','utf8');
const loader=fs.readFileSync('voznews-accessibilidade.js','utf8');
const required=['energia-solar','materiais-eletricos','automoveis-locadoras','imoveis-construcao','saude-clinicas','turismo-hoteis','restaurantes','pet-veterinaria','moda-beleza','oticas','cursos-educacao','nautica-motos'];
if(!loader.includes('/clientes-tematicos.js')) throw new Error('Loader de clientes temáticos ausente');
for(const key of required){if(!src.includes(`'${key}'`)) throw new Error(`Tema ausente: ${key}`)}
if(!src.includes('client-theme-badge')) throw new Error('Marca VOZ NEWS ausente nos cards');
if(!src.includes('images.unsplash.com')) throw new Error('Fotos temáticas diretas ausentes');
console.log('PASS: cards de clientes com fotos temáticas e marca VOZ NEWS');