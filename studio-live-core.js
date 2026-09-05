const crypto=require('crypto');
const links={
  deijanete:['Paulo, olha só esta informação.','E agora, outro destaque do nosso noticiário.','Vamos acompanhar esta atualização.'],
  paulo:['Deijanete, este assunto chama atenção.','Tem mais um destaque chegando.','Vamos a outra informação do VOZ NEWS.']
};
function cleanTitle(value){return String(value||'').replace(/\s+/g,' ').trim()}
function uniqueTitles(items){
  const seen=new Set(),out=[];
  for(const item of Array.isArray(items)?items:[]){
    const title=cleanTitle(item&&item.title),key=title.toLocaleLowerCase('pt-BR');
    if(title&&!seen.has(key)){seen.add(key);out.push(title)}
  }
  return out.slice(0,4);
}
function buildStudioBlock(items,now=new Date()){
  const sourceHeadlines=uniqueTitles(items);
  const base=sourceHeadlines.length?sourceHeadlines:['Notícias em atualização'];
  const turns=[];
  for(let i=0;i<Math.max(4,Math.min(6,base.length+2));i++){
    const speaker=i%2===0?'deijanete':'paulo';
    const headline=base[i%base.length];
    turns.push({speaker,mode:i%3===1?'partner':'camera',text:`${links[speaker][i%links[speaker].length]} ${headline}`});
  }
  const generatedAt=now.toISOString();
  const blockId=crypto.createHash('sha256').update(generatedAt+'|'+base.join('|')).digest('hex').slice(0,20);
  return {blockId,generatedAt,sourceHeadlines:base,turns};
}
module.exports={buildStudioBlock,uniqueTitles};
