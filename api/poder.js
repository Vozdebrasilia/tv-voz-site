const people = [
  {name:'Lula', query:'Lula presidente Brasil', handle:'lulaoficial', role:'Presidência da República'},
  {name:'Celina Leão', query:'Celina Leão Distrito Federal', handle:'celinaleao', role:'Distrito Federal'},
  {name:'Julio Cesar Ribeiro', query:'Julio Cesar Ribeiro deputado DF', handle:'juliocesarribeiro', role:'Câmara dos Deputados • DF'},
  {name:'Gilberto Nascimento', query:'Gilberto Nascimento deputado SP', handle:'gnascimento_20', role:'Câmara dos Deputados • SP'},
  {name:'Hermeto', query:'Deputado Hermeto DF', handle:'hermeto.oficial', role:'Câmara Legislativa • DF'},
  {name:'Paula Belmonte', query:'Paula Belmonte DF', handle:'paulabelmonteoficial', role:'Distrito Federal'}
];

const fallback = {
  'Lula': {title:'Campanha presidencial entra em nova fase com Lula no centro da disputa de 2026', source:'VOZ NEWS • Política'},
  'Celina Leão': {title:'Celina Leão intensifica agenda política no Distrito Federal', source:'VOZ NEWS • DF'},
  'Julio Cesar Ribeiro': {title:'Julio Cesar Ribeiro mantém atuação parlamentar e agenda no Distrito Federal', source:'VOZ NEWS • Congresso'},
  'Gilberto Nascimento': {title:'Gilberto Nascimento acompanha pautas legislativas e articulações em São Paulo', source:'VOZ NEWS • Congresso'},
  'Hermeto': {title:'Hermeto destaca atuação comunitária e segurança pública no DF', source:'VOZ NEWS • CLDF'},
  'Paula Belmonte': {title:'Paula Belmonte amplia agenda e propostas na disputa pelo Governo do DF', source:'VOZ NEWS • DF'}
};

function clean(s=''){return String(s).replace(/<!\[CDATA\[|\]\]>/g,'').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim()}
async function latest(query){
  try{
    const url='https://news.google.com/rss/search?q='+encodeURIComponent(query)+'&hl=pt-BR&gl=BR&ceid=BR:pt-419';
    const r=await fetch(url,{headers:{'user-agent':'VOZNEWS/1.0'}});
    if(!r.ok) throw new Error('rss');
    const xml=await r.text();
    const item=(xml.match(/<item>[\s\S]*?<\/item>/)||[])[0]||'';
    const title=clean((item.match(/<title>([\s\S]*?)<\/title>/)||[])[1]||'');
    const link=clean((item.match(/<link>([\s\S]*?)<\/link>/)||[])[1]||'');
    const pubDate=clean((item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)||[])[1]||'');
    return title?{title,link,pubDate}:null;
  }catch(e){return null}
}
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

export default async function handler(req,res){
  const results=await Promise.all(people.map(async p=>({...p,news:await latest(p.query)})));
  const now=new Date();
  const date=new Intl.DateTimeFormat('pt-BR',{timeZone:'America/Sao_Paulo',day:'2-digit',month:'long',year:'numeric'}).format(now);
  const cards=results.map(p=>{
    const n=p.news||fallback[p.name];
    const href=p.news?.link||`https://news.google.com/search?q=${encodeURIComponent(p.query)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;
    return `<article class="card"><a class="photo" href="https://www.instagram.com/${esc(p.handle)}/" target="_blank" rel="noopener"><img src="/api/instagram-photo?handle=${encodeURIComponent(p.handle)}" alt="${esc(p.name)} — foto do Instagram oficial" loading="lazy"></a><div class="body"><span>${esc(p.role)}</span><h2>${esc(p.name)}</h2><h3>${esc(n.title)}</h3><p>Cobertura permanente VOZ NEWS, atualizada diariamente.</p><div class="actions"><a href="${esc(href)}" target="_blank" rel="noopener">Ler notícia →</a><a href="https://www.instagram.com/${esc(p.handle)}/" target="_blank" rel="noopener">@${esc(p.handle)}</a></div></div></article>`
  }).join('');
  res.setHeader('Cache-Control','s-maxage=900, stale-while-revalidate=3600');
  res.setHeader('Content-Type','text/html; charset=utf-8');
  res.status(200).send(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Quem Decide o Brasil | VOZ NEWS</title><meta name="description" content="Cobertura política diária do VOZ NEWS: Lula, Celina Leão, Julio Cesar Ribeiro, Gilberto Nascimento, Hermeto e Paula Belmonte."><style>:root{--g:#d4af37;--b:#061423;--b2:#0e3152;--w:#fff;--m:#d5e2ef}*{box-sizing:border-box}body{margin:0;font-family:Arial,Helvetica,sans-serif;background:linear-gradient(145deg,#04101d,#0a2742 58%,#07111c);color:var(--w)}header{position:sticky;top:0;z-index:3;background:#061423ee;border-bottom:1px solid #d4af3744}.bar{width:min(1200px,92%);height:92px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:18px}.logo{width:230px;max-width:54vw}.back{color:white;text-decoration:none;border:1px solid #d4af3766;padding:12px 18px;border-radius:999px;font-weight:800}main{width:min(1200px,92%);margin:auto;padding:58px 0 80px}.kicker{color:var(--g);font-weight:900;letter-spacing:1.5px}.hero h1{font-size:clamp(36px,6vw,70px);margin:10px 0}.hero p{font-size:19px;line-height:1.55;color:var(--m);max-width:850px}.updated{margin:20px 0 30px;color:#fff;font-weight:800}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}.card{overflow:hidden;border:1px solid #d4af3744;border-radius:24px;background:#ffffff0c;box-shadow:0 18px 50px #0005}.photo{display:block;height:320px;background:#0a1f35}.photo img{width:100%;height:100%;object-fit:cover;object-position:center top}.body{padding:20px}.body>span{display:inline-block;color:var(--g);font-size:12px;font-weight:900;text-transform:uppercase}.body h2{font-size:28px;margin:7px 0}.body h3{font-size:18px;line-height:1.3;margin:8px 0 12px}.body p{color:var(--m);line-height:1.45}.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}.actions a{padding:10px 13px;border-radius:999px;background:#d4af37;color:#061423;text-decoration:none;font-weight:900;font-size:13px}.actions a+ a{background:#ffffff12;color:#fff;border:1px solid #ffffff25}@media(max-width:900px){.grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:620px){.bar{height:76px}.back{font-size:12px;padding:9px 11px}.grid{grid-template-columns:1fr}.photo{height:360px}main{padding-top:38px}}</style></head><body><header><div class="bar"><a href="/"><img class="logo" src="/logo-voznews-oficial.png" alt="VOZ NEWS"></a><a class="back" href="/#politica">← Voltar ao VOZ NEWS</a></div></header><main><section class="hero"><div class="kicker">QUEM DECIDE O BRASIL • COBERTURA OBRIGATÓRIA DIÁRIA</div><h1>Política em atualização permanente.</h1><p>Lula, Celina Leão, Julio Cesar Ribeiro, Gilberto Nascimento, Hermeto e Paula Belmonte têm acompanhamento editorial diário, com acesso às notícias mais recentes e aos perfis oficiais.</p><div class="updated">Atualizado em ${esc(date)}</div></section><section class="grid">${cards}</section></main></body></html>`);
}
