const fs=require('fs');const assert=require('assert');
const energia=fs.readFileSync('energia/index.html','utf8');
const vercel=fs.readFileSync('vercel.json','utf8');
assert(energia.includes('/energia/vertical-tabs.js'),'Energia publico deve carregar a navegacao das tres abas');
for(const route of ['/agronegocio','/sustentabilidade']) assert(vercel.includes(`\"source\": \"${route}\"`),`Vercel deve publicar ${route}`);
console.log('OK');