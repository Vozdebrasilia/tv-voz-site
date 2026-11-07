const { put } = require('@vercel/blob'); const crypto = require('crypto');
async function cadastroPermuta(req,res){res.setHeader('Cache-Control','no-store');if(req.method!=='POST')return res.status(405).json({error:'Método não permitido'});try{const d=req.body||{};if(d.website)return res.status(400).json({error:'Cadastro inválido'});for(const k of ['responsavel','empresa','email','whatsapp','cidade','segmento','oferta','procura'])if(typeof d[k]!=='string'||!d[k].trim()||d[k].length>3000)return res.status(400).json({error:'Preencha todos os campos obrigatórios'});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))return res.status(400).json({error:'E-mail inválido'});if(d.consentimento!=='on')return res.status(400).json({error:'Consentimento obrigatório'});const protocolo='CP-'+Date.now().toString(36).toUpperCase()+'-'+crypto.randomBytes(3).toString('hex').toUpperCase();const registro={protocolo,criadoEm:new Date().toISOString(),...Object.fromEntries(['responsavel','empresa','email','whatsapp','cidade','segmento','oferta','procura'].map(k=>[k,d[k].trim()]))};await put('cadastros/'+protocolo+'.json',JSON.stringify(registro),{access:'private',contentType:'application/json',addRandomSuffix:false});return res.status(201).json({protocolo})}catch(e){console.error('CLUBE_CADASTRO_STORAGE',e?.message,e?.stack);return res.status(500).json({error:'Serviço temporariamente indisponível'})}}
const people = [
  {name:'Lula',query:'Lula presidente Brasil',handle:'lulaoficial',source:'Presidência • Brasil'},
  {name:'Celina Leão',query:'Celina Leão Distrito Federal',handle:'celinaleao',source:'GDF • Brasília'},
  {name:'Julio Cesar Ribeiro',query:'Julio Cesar Ribeiro deputado DF',handle:'juliocesarribeiro',source:'Câmara • DF'},
  {name:'Gilberto Nascimento',query:'Gilberto Nascimento deputado SP',handle:'gnascimento_20',source:'Câmara • SP'},
  {name:'Hermeto',query:'Deputado Hermeto DF',handle:'hermeto.oficial',source:'CLDF • Brasília'},
  {name:'Paula Belmonte',query:'Paula Belmonte DF',handle:'paulabelmonteoficial',source:'Política • Brasília'}
];
function clean(s=''){return String(s).replace(/<!\[CDATA\[|\]\]>/g,'').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim()}
async function latest(p){
  try{
    const u='https://news.google.com/rss/search?q='+encodeURIComponent(p.query)+'&hl=pt-BR&gl=BR&ceid=BR:pt-419';
    const r=await fetch(u,{headers:{'user-agent':'VOZNEWS/1.0'}});
    if(!r.ok) throw new Error('rss');
    const xml=await r.text(),item=(xml.match(/<item>[\s\S]*?<\/item>/)||[])[0]||'';
    const title=clean((item.match(/<title>([\s\S]*?)<\/title>/)||[])[1]||'');
    const link=clean((item.match(/<link>([\s\S]*?)<\/link>/)||[])[1]||'');
    return title?{title,summary:`Acompanhe a atualização mais recente sobre ${p.name} na cobertura diária do VOZ NEWS.`,source:p.source,link,image:`/api/instagram-photo?handle=${encodeURIComponent(p.handle)}`,instagram:`https://www.instagram.com/${p.handle}/`}:null;
  }catch(e){return null}
}
export default async function handler(req,res){
  if(req.method==='POST' && req.query?.clube==='1') return cadastroPermuta(req,res);
  const rows=await Promise.all(people.map(latest));
  const items=rows.filter(Boolean);
  const now=new Date();
  const edition=new Intl.DateTimeFormat('pt-BR',{timeZone:'America/Sao_Paulo',day:'2-digit',month:'long',year:'numeric'}).format(now);
  res.setHeader('Cache-Control','s-maxage=900, stale-while-revalidate=3600');
  res.status(200).json({updatedAt:now.toISOString(),edition:`VOZ NEWS • ${edition}`,requiredCoverage:people.map(p=>p.name),items});
}
