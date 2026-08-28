const fs = require('fs');
const assert = require('assert');

const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const redirects = Array.isArray(config.redirects) ? config.redirects : [];

const link = redirects.find((item) => item.source === '/tvvozdebrasiliafilmes/lunardi');

assert(link, 'Falta o link /tvvozdebrasiliafilmes/lunardi');
assert.strictEqual(link.destination, 'https://youtu.be/5zl9bu3rG-k', 'O link deve abrir o filme do Lunardi no YouTube');

console.log('OK: link curto do filme Lunardi configurado.');
