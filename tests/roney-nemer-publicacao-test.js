const assert = require('assert');
const fs = require('fs');

const article = fs.readFileSync('materias/roney-nemer-11111.html', 'utf8');
const feature = fs.readFileSync('v33-did-player.js', 'utf8');
const home = fs.readFileSync('index.html', 'utf8');
const sitemap = fs.readFileSync('api/sitemap.js', 'utf8');

assert.match(article, /Por Paulo Fayad/);
assert.match(article, /número 11111/);
assert.match(article, /candidatura deferida/i);
assert.strictEqual((article.match(/<img /g) || []).length >= 4, true);
assert.match(feature, /#politica \.media-grid/);
assert.match(feature, /roney-nemer-11111\.html/);
assert.match(home, /v33-did-player\.js/);
assert.match(sitemap, /materias\/roney-nemer-11111\.html/);

console.log('Publicação de Rôney Nemer validada.');
