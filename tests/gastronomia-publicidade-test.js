const fs=require('fs');
const path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','gastronomia','index.html'),'utf8');
const must=(c,m)=>{if(!c) throw new Error(m)};
const count=s=>(html.match(new RegExp(s,'g'))||[]).length;

must(html.includes('data-ad-zone="hotels-top"'),'bloco de hotéis no topo ausente');
must(html.indexOf('data-ad-zone="hotels-top"') < html.indexOf('id="editores"'),'hotéis precisam aparecer antes da editoria');
must(count('data-ad-kind="hotel"')===3,'devem existir exatamente 3 anúncios de hotéis');
must(count('data-ad-kind="restaurant"')===3,'devem existir exatamente 3 anúncios de restaurantes');
must(count('ESPAÇO PUBLICITÁRIO')>=6,'cada anúncio precisa identificar o espaço publicitário');
must(!html.includes('ESPAÇO PUBLICITÁRIO • DEMONSTRAÇÃO'),'não usar a palavra demonstração nos anúncios');
must(count('data-ad-photo')>=18,'os seis anúncios precisam ter uma galeria rica de fotos');
must(html.includes('240K+'),'métrica do Instagram deve estar em 240K+');
console.log('gastronomia-publicidade-test: PASS');
