const fs = require('fs');
const assert = require('assert');

const source = fs.readFileSync('voznews-accessibilidade.js', 'utf8');

const tituloAnuario = 'Anuário Brasileiro de Economia, Turismo e Meio Ambiente – 25 anos';
assert(source.includes(tituloAnuario), 'o título completo do Anuário deve aparecer no cadastro dos selos');
assert(!source.includes("title:'Anuário Brasileiro – 25 anos'"), 'o título antigo do Anuário não deve permanecer');

assert(/\.voznews-award-dialog\{[^}]*max-width:920px/.test(source), 'o modal deve usar largura editorial de 920px');
assert(/\.voznews-award-modal-img\{[^}]*width:320px/.test(source), 'a arte deve abrir ampliada com 320px');
assert(/\.voznews-award-body p\{[^}]*text-align:justify/.test(source), 'os parágrafos devem ser justificados');
assert(/text-justify:inter-word/.test(source), 'o texto deve usar justificação entre palavras');
assert(/<h3 id=\\"voznews-award-title\\"><\/h3><img class=\\"voznews-award-modal-img\\"/.test(source), 'o título deve aparecer acima da arte no modal');

const itemCount = (source.match(/\{title:'/g) || []).length;
assert.strictEqual(itemCount, 11, 'devem permanecer exatamente 11 marcas e selos no conjunto institucional');

console.log('OK: padrão institucional de marcas e selos validado.');
