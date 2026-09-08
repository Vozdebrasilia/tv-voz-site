const fs=require('fs');const assert=require('assert');
const home=fs.readFileSync('energia/home.html','utf8');
const vercel=fs.readFileSync('vercel.json','utf8');
assert(home.includes('/energia/vertical-tabs.js'),'Energia deve carregar a navegacao das tres abas');
for(const route of ['/agronegocio','/sustentabilidade']) assert(vercel.includes(`\"source\": \"${route}\"`),`Vercel deve publicar ${route}`);
console.log('OK');