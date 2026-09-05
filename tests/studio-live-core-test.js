const assert=require('assert');
const {buildStudioBlock}=require('../studio-live-core');
const headlines=['Manchete um confirmada','Manchete dois confirmada','Manchete três confirmada'];
const items=[{title:headlines[0]},{title:headlines[1]},{title:headlines[0]},{title:headlines[2]}];
const block=buildStudioBlock(items,new Date('2026-09-05T19:00:00Z'));
assert.deepStrictEqual(block.sourceHeadlines,headlines,'remove duplicadas sem reescrever fatos');
assert.ok(block.turns.length>=4 && block.turns.length<=6,'4 a 6 turnos');
assert.deepStrictEqual(block.turns.map(t=>t.speaker),block.turns.map((_,i)=>i%2===0?'deijanete':'paulo'),'alterna apresentadores');
assert.ok(block.turns.every(t=>['camera','partner'].includes(t.mode)),'modo visual conhecido');
for(const turn of block.turns){
  assert.ok(headlines.some(h=>turn.text.endsWith(h)),'cada fala termina com manchete literal');
}
console.log('OK studio-live-core');
