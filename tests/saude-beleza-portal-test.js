const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));
const must=(c,m)=>{if(!c)throw new Error(m)};

must(exists('saude-beleza/index.html'),'saude-beleza/index.html ausente');
const html=read('saude-beleza/index.html');
const vercel=read('vercel.json');
const ecosystem=read('ecossistema-40-portais.js');

for(const token of ['VOZ NEWS','SAÚDE & BELEZA','240K+','Saúde','Estética','Dermatologia','Odontologia','Beleza','Bem-estar','Fitness','Inovação','BRANDED CONTENT','CONTEÚDO PATROCINADO','QUERO DESTACAR MINHA MARCA','CRIAR PROJETO DE CONTEÚDO','FALAR COM O COMERCIAL','AGÊNCIAS']) {
  must(html.includes(token),`conteúdo obrigatório ausente: ${token}`);
}
must(html.includes('../logo-voznews-oficial.png'),'logo oficial não utilizada');
must(html.includes('https://www.voznewsbrasil.com.br/saude-beleza/'),'canonical ausente');
must(vercel.includes('"source": "/saude-beleza"'),'rewrite sem barra ausente');
must(vercel.includes('"source": "/saude-beleza/"'),'rewrite com barra ausente');
must(ecosystem.includes("'saude-bem-estar':'/saude-beleza/'"),'Saúde & Bem-estar não aponta para o vertical');
must(ecosystem.includes("'beleza':'/saude-beleza/'"),'Beleza não aponta para o vertical');
console.log('saude-beleza-portal-test: PASS');
