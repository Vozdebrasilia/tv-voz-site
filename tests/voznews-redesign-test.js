const fs=require('fs');
function must(ok,msg){if(!ok){console.error('FAIL:',msg);process.exit(1)}}
const home=fs.existsSync('home.html')?fs.readFileSync('home.html','utf8'):'';
const energia=fs.readFileSync('energia/home.html','utf8');
const vercel=JSON.parse(fs.readFileSync('vercel.json','utf8'));
must(home.includes('230 mil+'),'home deve exibir 230 mil+ seguidores');
must(home.includes('/energia'),'home deve ligar para /energia');
for(const label of ['Brasília','Política','Negócios','Saúde','Turismo','Entrevistas']) must(home.includes(label),`home deve conter editoria ${label}`);
must(energia.includes("fetch('/energia/index.html"),'Energia deve preservar carregamento de energia/index.html');
must(energia.includes('230 mil+'),'Energia deve exibir 230 mil+ seguidores');
must(vercel.rewrites.some(r=>r.source==='/'&&r.destination==='/home.html'),'vercel deve reescrever / para /home.html');
must(vercel.rewrites.some(r=>r.source==='/energia'&&r.destination==='/energia/home.html'),'rewrite de /energia deve ser preservada');
console.log('PASS: Voz News redesign checks');
