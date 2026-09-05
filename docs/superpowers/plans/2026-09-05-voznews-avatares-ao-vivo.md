# VOZ NEWS Avatares AO VIVO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar ao estúdio VOZ NEWS dois apresentadores animados — Deijanete e Paulo — com vozes clonadas, turnos de fala baseados no `/api/news`, botão `AO VIVO / OUVIR AGORA` e blocos de aproximadamente 45 segundos, preservando integralmente o estúdio atual quando a camada AO VIVO estiver desligada ou indisponível.

**Architecture:** A imagem e as animações atuais permanecem como baseline. Um runtime separado (`studio-live-player.js`) é carregado depois do estúdio existente e injeta somente o botão/slots de vídeo. O backend usa funções Vercel stateless: prepara um roteiro determinístico a partir do `/api/news`, solicita clipes ao provedor de avatar e devolve um token assinado com o estado do bloco; nenhuma chave do provedor vai para o navegador.

**Tech Stack:** Vercel Functions (Node.js), JavaScript sem framework, endpoint existente `/api/news`, HeyGen private avatars/voice clones, WebM/MP4 de avatar, Node `assert` para testes, GitHub Actions, Vercel production deploy.

**Spec:** `docs/superpowers/specs/2026-09-05-voznews-avatares-ao-vivo-design.md`

## Global Constraints

- O arquivo visual atual do estúdio é baseline protegido; não redesenhar imagem, logos, bancada, textos, proporções, LEDs ou rodapés.
- O runtime atual `v33-did-player.js` mantém as animações aprovadas: Mercado `18s`, Notícias Quentes `36s`, LEDs/pulsos e imagem oficial.
- Os arquivos brutos de Deijanete e Paulo enviados na conversa não entram no GitHub.
- Áudio só inicia após clique em `AO VIVO / OUVIR AGORA`.
- Fatos falados vêm das manchetes de `/api/news`; conectivos podem ser naturais, mas não acrescentam fatos.
- Blocos alvo: 45 s, com variação natural de duração.
- Nenhuma chave HeyGen/API fica em JavaScript público.
- Falha de avatar nunca remove a imagem estática nem interrompe Mercado & Clima / Notícias Quentes / LEDs.
- O cliente não solicita câmera nem microfone do visitante.

---

### Task 1: Provisionar identidades e vozes privadas

**Files:**
- No repository changes in this task.
- Server configuration required later: `HEYGEN_API_KEY`, `VOZNEWS_DEIJANETE_AVATAR_ID`, `VOZNEWS_PAULO_AVATAR_ID`, `VOZNEWS_DEIJANETE_VOICE_ID`, `VOZNEWS_PAULO_VOICE_ID`, `VOZNEWS_LIVE_SIGNING_SECRET`.

**Interfaces:**
- Consumes: os dois MP4 enviados em 05/09/2026, um de Deijanete e um de Paulo.
- Produces: dois avatar look IDs prontos, dois voice IDs prontos e consentimento aprovado para os dois perfis.

- [ ] **Step 1: Verificar os dois arquivos locais**

Run:
```bash
ffprobe -v error -show_entries format=duration:stream=codec_type,codec_name -of json "/mnt/data/WhatsApp Video 2026-09-04 at 12.02.59(1).mp4"
ffprobe -v error -show_entries format=duration:stream=codec_type,codec_name -of json "/mnt/data/WhatsApp Video 2026-09-05 at 16.34.29.mp4"
```
Expected: ambos contêm stream de vídeo + áudio e duração maior que 30 s.

- [ ] **Step 2: Fazer upload dos dois vídeos como assets privados no HeyGen**

Usar o fluxo `create_asset_upload` → PUT do MP4 no `upload_url` → `complete_asset_upload` para cada vídeo. Não publicar URLs dos assets em código ou documentação pública.

Expected: dois `asset_id` finalizados e legíveis por `get_asset`.

- [ ] **Step 3: Criar as duas vozes clonadas**

Criar:
- `VOZ NEWS — Deijanete` com idioma `pt` e remoção de ruído habilitada;
- `VOZ NEWS — Paulo` com idioma `pt` e remoção de ruído habilitada.

Expected: `get_voice(voice_id).status == "complete"` para ambos.

- [ ] **Step 4: Criar os dois digital twins**

Criar um digital twin por asset, com nomes:
- `VOZ NEWS — Deijanete`;
- `VOZ NEWS — Paulo`.

Expected: os grupos/looks aparecem como privados e chegam ao estado `ready`/equivalente do provedor.

- [ ] **Step 5: Completar consentimento de cada avatar**

Gerar o link de consentimento para cada grupo e concluir a gravação/validação no fluxo do provedor.

Expected: cada avatar privado fica autorizado para geração.

- [ ] **Step 6: Associar a voz correta ao avatar correto**

Atualizar o grupo de Deijanete com a voz clonada de Deijanete e o grupo de Paulo com a voz clonada de Paulo.

Expected: o default voice ID de cada grupo corresponde ao apresentador correto.

- [ ] **Step 7: Registrar IDs e segredo somente no ambiente do servidor**

Configurar no projeto Vercel:
```text
HEYGEN_API_KEY=<secret>
VOZNEWS_DEIJANETE_AVATAR_ID=<private look id>
VOZNEWS_PAULO_AVATAR_ID=<private look id>
VOZNEWS_DEIJANETE_VOICE_ID=<private voice id>
VOZNEWS_PAULO_VOICE_ID=<private voice id>
VOZNEWS_LIVE_SIGNING_SECRET=<32+ random bytes>
```

Expected: nenhum desses valores aparece em `git grep -n "HEYGEN\|VOZNEWS_.*_ID\|SIGNING_SECRET" -- ':!docs/**'` exceto referências a `process.env`.

---

### Task 2: Criar o gerador determinístico de roteiro

**Files:**
- Create: `studio-live-core.js`
- Create: `tests/studio-live-core-test.js`

**Interfaces:**
- Consumes: `Array<{title:string}>` vindo do `/api/news`.
- Produces: `buildStudioBlock(items, now)` retornando `{blockId, generatedAt, sourceHeadlines, turns}`.

- [ ] **Step 1: Escrever o teste falhando**

Create `tests/studio-live-core-test.js`:
```js
const assert=require('assert');
const {buildStudioBlock}=require('../studio-live-core');

const items=[
  {title:'Manchete um confirmada'},
  {title:'Manchete dois confirmada'},
  {title:'Manchete um confirmada'},
  {title:'Manchete três confirmada'}
];
const block=buildStudioBlock(items,new Date('2026-09-05T19:00:00Z'));
assert.strictEqual(block.sourceHeadlines.length,3,'remove duplicadas');
assert.ok(block.turns.length>=4 && block.turns.length<=6,'4 a 6 turnos');
assert.deepStrictEqual(block.turns.map(t=>t.speaker),block.turns.map((_,i)=>i%2===0?'deijanete':'paulo'),'alterna apresentadores');
assert.ok(block.turns.every(t=>['camera','partner'].includes(t.mode)),'modo visual conhecido');
for(const h of block.sourceHeadlines){
  assert.ok(block.turns.some(t=>t.text.includes(h)),'cada manchete selecionada aparece literalmente em uma fala');
}
assert.ok(block.turns.every(t=>!/[0-9]{4,}/.test(t.text.replace(block.sourceHeadlines.join(' '),''))),'conectivos não inventam números longos');
console.log('OK studio-live-core');
```

- [ ] **Step 2: Rodar e confirmar RED**

Run:
```bash
node tests/studio-live-core-test.js
```
Expected: FAIL com `Cannot find module '../studio-live-core'`.

- [ ] **Step 3: Implementar o mínimo**

Create `studio-live-core.js`:
```js
const crypto=require('crypto');

const links={
  deijanete:['Paulo, olha só esta informação.','E agora, outro destaque do nosso noticiário.','Vamos acompanhar esta atualização.'],
  paulo:['Deijanete, este assunto chama atenção.','Tem mais um destaque chegando.','Vamos a outra informação do VOZ NEWS.']
};

function cleanTitle(value){return String(value||'').replace(/\s+/g,' ').trim()}
function uniqueTitles(items){
  const seen=new Set(),out=[];
  for(const item of Array.isArray(items)?items:[]){
    const title=cleanTitle(item&&item.title);
    const key=title.toLocaleLowerCase('pt-BR');
    if(title && !seen.has(key)){seen.add(key);out.push(title)}
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
    const lead=links[speaker][i%links[speaker].length];
    turns.push({speaker,mode:i%3===1?'partner':'camera',text:`${lead} ${headline}`});
  }
  const generatedAt=now.toISOString();
  const blockId=crypto.createHash('sha256').update(generatedAt+'|'+base.join('|')).digest('hex').slice(0,20);
  return {blockId,generatedAt,sourceHeadlines:base,turns};
}
module.exports={buildStudioBlock,uniqueTitles};
```

- [ ] **Step 4: Rodar GREEN**

Run:
```bash
node tests/studio-live-core-test.js
```
Expected: `OK studio-live-core` e exit 0.

- [ ] **Step 5: Commit**

```bash
git add studio-live-core.js tests/studio-live-core-test.js
git commit -m "feat: add deterministic studio live script builder"
```

---

### Task 3: Criar cliente server-only do provedor e token assinado

**Files:**
- Create: `api/_studio-live-provider.js`
- Create: `tests/studio-live-provider-test.js`

**Interfaces:**
- Consumes: `turns` de `studio-live-core.js`, `process.env` com avatar/voice IDs e chave.
- Produces: `createTurnVideo(turn) -> Promise<{videoId:string}>`, `readTurnVideo(videoId) -> Promise<{status,url}>`, `signJob(payload) -> token`, `verifyJob(token) -> payload`.

- [ ] **Step 1: Escrever teste falhando para isolamento de segredo e assinatura**

Create `tests/studio-live-provider-test.js`:
```js
const assert=require('assert');
process.env.VOZNEWS_LIVE_SIGNING_SECRET='0123456789abcdef0123456789abcdef';
const p=require('../api/_studio-live-provider');
const token=p.signJob({blockId:'abc',videos:[{speaker:'deijanete',videoId:'v1'}]});
assert.deepStrictEqual(p.verifyJob(token),{blockId:'abc',videos:[{speaker:'deijanete',videoId:'v1'}]});
assert.throws(()=>p.verifyJob(token.slice(0,-1)+'x'));
const fs=require('fs');
const src=fs.readFileSync('api/_studio-live-provider.js','utf8');
assert.ok(src.includes('process.env.HEYGEN_API_KEY'));
assert.ok(!/sk[-_][A-Za-z0-9]{20,}/.test(src),'nenhuma chave literal');
console.log('OK studio-live-provider');
```

- [ ] **Step 2: Rodar RED**

Run:
```bash
node tests/studio-live-provider-test.js
```
Expected: FAIL porque `_studio-live-provider.js` ainda não existe.

- [ ] **Step 3: Implementar assinatura HMAC e cliente HTTP**

Implementar `api/_studio-live-provider.js` com:
```js
const crypto=require('crypto');
const API='https://api.heygen.com';
function b64(v){return Buffer.from(JSON.stringify(v)).toString('base64url')}
function signJob(payload){
  const body=b64(payload),secret=process.env.VOZNEWS_LIVE_SIGNING_SECRET;
  if(!secret)throw new Error('missing signing secret');
  const sig=crypto.createHmac('sha256',secret).update(body).digest('base64url');
  return `${body}.${sig}`;
}
function verifyJob(token){
  const [body,sig]=String(token||'').split('.');
  const expected=crypto.createHmac('sha256',process.env.VOZNEWS_LIVE_SIGNING_SECRET||'').update(body||'').digest('base64url');
  if(!sig || sig.length!==expected.length || !crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected)))throw new Error('invalid token');
  return JSON.parse(Buffer.from(body,'base64url').toString('utf8'));
}
async function heygen(path,options={}){
  const key=process.env.HEYGEN_API_KEY;
  if(!key)throw new Error('missing HEYGEN_API_KEY');
  const r=await fetch(API+path,{...options,headers:{'Content-Type':'application/json','X-Api-Key':key,...options.headers}});
  const data=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(`heygen:${r.status}:${JSON.stringify(data)}`);
  return data;
}
```

`createTurnVideo` deve selecionar avatar/voice por `turn.speaker`, solicitar vídeo 720p ou 1080p conforme suporte, com `motion_prompt` coerente com `camera`/`partner`, e nunca aceitar IDs vindos do navegador. `readTurnVideo` consulta o status do vídeo e retorna apenas status + URL pronta.

- [ ] **Step 4: Rodar GREEN**

Run:
```bash
node tests/studio-live-provider-test.js
```
Expected: `OK studio-live-provider` e exit 0.

- [ ] **Step 5: Commit**

```bash
git add api/_studio-live-provider.js tests/studio-live-provider-test.js
git commit -m "feat: add server-only live avatar provider client"
```

---

### Task 4: Criar endpoints stateless de preparação e estado

**Files:**
- Create: `api/studio-live-prepare.js`
- Create: `api/studio-live-state.js`
- Create: `tests/studio-live-api-test.js`

**Interfaces:**
- `POST /api/studio-live-prepare` -> `{status:'preparing', token, blockId, targetDuration:45}`.
- `GET /api/studio-live-state?token=...` -> `{status:'preparing'|'ready'|'unavailable', block?:{id,duration,turns}}`.

- [ ] **Step 1: Escrever teste de contrato falhando**

Create `tests/studio-live-api-test.js`:
```js
const fs=require('fs'),assert=require('assert');
const prepare=fs.readFileSync('api/studio-live-prepare.js','utf8');
const state=fs.readFileSync('api/studio-live-state.js','utf8');
assert.ok(prepare.includes('/api/news'),'prepare usa o mesmo feed do rodapé');
assert.ok(prepare.includes('buildStudioBlock'),'prepare usa roteiro determinístico');
assert.ok(prepare.includes('signJob'),'prepare devolve token assinado');
assert.ok(state.includes('verifyJob'),'state valida token');
assert.ok(!prepare.includes('HEYGEN_API_KEY:'),'não serializa chave');
assert.ok(!state.includes('HEYGEN_API_KEY:'),'não serializa chave');
console.log('OK studio-live-api');
```

- [ ] **Step 2: Rodar RED**

Run:
```bash
node tests/studio-live-api-test.js
```
Expected: FAIL com `ENOENT` para os endpoints.

- [ ] **Step 3: Implementar `POST /api/studio-live-prepare`**

Fluxo mínimo:
```js
const {buildStudioBlock}=require('../studio-live-core');
const {createTurnVideo,signJob}=require('./_studio-live-provider');
module.exports=async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'method_not_allowed'});
  try{
    const host=req.headers.host,proto=req.headers['x-forwarded-proto']||'https';
    const news=await fetch(`${proto}://${host}/api/news`,{headers:{accept:'application/json'}}).then(r=>r.json());
    const block=buildStudioBlock(news.items||[]);
    const videos=[];
    for(const turn of block.turns){
      const job=await createTurnVideo(turn);
      videos.push({speaker:turn.speaker,mode:turn.mode,text:turn.text,videoId:job.videoId});
    }
    const token=signJob({blockId:block.blockId,generatedAt:block.generatedAt,sourceHeadlines:block.sourceHeadlines,videos});
    res.setHeader('Cache-Control','no-store');
    return res.status(202).json({status:'preparing',token,blockId:block.blockId,targetDuration:45});
  }catch(e){
    console.error('studio-live-prepare',e);
    return res.status(503).json({status:'unavailable'});
  }
}
```

- [ ] **Step 4: Implementar `GET /api/studio-live-state`**

Verificar token, consultar cada `videoId`, e:
- se algum falhou: `503 {status:'unavailable'}`;
- se algum ainda processa: `200 {status:'preparing'}`;
- se todos estão prontos: `200 {status:'ready',block:{id,duration:45,turns:[{speaker,mode,text,url}]}}`.

Nunca devolver `videoId`, avatar IDs, voice IDs nem chave no payload pronto.

- [ ] **Step 5: Rodar GREEN**

Run:
```bash
node tests/studio-live-api-test.js
```
Expected: `OK studio-live-api`.

- [ ] **Step 6: Commit**

```bash
git add api/studio-live-prepare.js api/studio-live-state.js tests/studio-live-api-test.js
git commit -m "feat: add stateless studio live endpoints"
```

---

### Task 5: Criar runtime de reprodução isolado

**Files:**
- Create: `studio-live-player.js`
- Create: `tests/studio-live-player-test.js`
- Modify: `v33-did-player.js` apenas para carregar o novo runtime; não alterar CSS/HTML visual já aprovado.

**Interfaces:**
- Consumes: `/api/studio-live-prepare`, `/api/studio-live-state`.
- Produces: botão `AO VIVO / OUVIR AGORA`, slots `.vn-live-presenter-deijanete` e `.vn-live-presenter-paulo`, estados `idle/camera/partner/transition`.

- [ ] **Step 1: Escrever teste de isolamento falhando**

Create `tests/studio-live-player-test.js`:
```js
const fs=require('fs'),assert=require('assert');
const base=fs.readFileSync('v33-did-player.js','utf8');
const live=fs.readFileSync('studio-live-player.js','utf8');
assert.ok(base.includes('studio-live-player.js'),'baseline carrega runtime separado');
assert.ok(base.includes('animation:vnMarket 18s linear infinite'),'Mercado preservado');
assert.ok(base.includes('animation:vnHot 36s linear infinite'),'Notícias Quentes preservada');
assert.ok(base.includes('.vn-lightfx::after{content:none!important;display:none!important;animation:none!important}'),'faixa branca continua removida');
assert.ok(live.includes('AO VIVO / OUVIR AGORA'));
assert.ok(live.includes('/api/studio-live-prepare'));
assert.ok(live.includes('/api/studio-live-state'));
assert.ok(!/getUserMedia|mediaDevices/.test(live),'não captura câmera/microfone');
console.log('OK studio-live-player');
```

- [ ] **Step 2: Rodar RED**

Run:
```bash
node tests/studio-live-player-test.js
```
Expected: FAIL porque `studio-live-player.js` não existe.

- [ ] **Step 3: Implementar `studio-live-player.js`**

O runtime deve:
1. esperar `#tv-ao-vivo` existir;
2. injetar botão com `z-index` acima da imagem e abaixo/fora das faixas de rodapé;
3. criar dois `<video muted playsinline>` transparentes/recortados, posicionados somente nas áreas dos apresentadores;
4. no clique, chamar `POST /api/studio-live-prepare`;
5. exibir `Preparando…` enquanto consulta o estado em intervalos de 2,5 s;
6. quando pronto, tocar os turnos sequencialmente, um vídeo com som por vez;
7. manter o outro apresentador em estado visual `partner`/`idle`;
8. ao terminar, solicitar o próximo bloco;
9. em qualquer erro, esconder slots e voltar à imagem base sem tocar em `.vn-market`, `.vn-hot` ou `.vn-lightfx`.

O runtime deve usar classes próprias prefixadas `.vn-live-` para não colidir com o CSS aprovado.

- [ ] **Step 4: Adicionar somente o loader ao `v33-did-player.js`**

Adicionar ao final, fora da definição do style atual:
```js
(()=>{if(!document.getElementById('voznews-studio-live-runtime')){const s=document.createElement('script');s.id='voznews-studio-live-runtime';s.src='/studio-live-player.js?v=20260905-live1';s.defer=true;document.head.appendChild(s)}})();
```

Nenhuma outra linha do arquivo deve mudar.

- [ ] **Step 5: Rodar GREEN + regressão existente**

Run:
```bash
node tests/studio-live-player-test.js
node tests/studio-motion-v36-test.js
```
Expected: ambos exit 0.

- [ ] **Step 6: Commit**

```bash
git add studio-live-player.js v33-did-player.js tests/studio-live-player-test.js
git commit -m "feat: add isolated studio live playback runtime"
```

---

### Task 6: Adicionar CI específica e verificar que nenhum segredo entrou no repo

**Files:**
- Create: `.github/workflows/studio-live.yml`

**Interfaces:**
- Consumes: todos os testes `studio-live-*` + teste de movimento existente.
- Produces: gate automático em pushes que toquem os arquivos do módulo AO VIVO.

- [ ] **Step 1: Criar workflow**

```yaml
name: studio-live
on:
  push:
    paths:
      - 'studio-live-core.js'
      - 'studio-live-player.js'
      - 'v33-did-player.js'
      - 'api/studio-live-*.js'
      - 'api/_studio-live-provider.js'
      - 'tests/studio-live-*.js'
      - '.github/workflows/studio-live.yml'
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: node tests/studio-live-core-test.js
      - run: node tests/studio-live-provider-test.js
      - run: node tests/studio-live-api-test.js
      - run: node tests/studio-live-player-test.js
      - run: node tests/studio-motion-v36-test.js
      - name: Reject leaked provider secrets
        run: |
          ! grep -RIE 'sk[-_][A-Za-z0-9]{20,}|HEYGEN_API_KEY\s*=\s*["'"''][^"'"'']+' --exclude-dir=.git .
```

- [ ] **Step 2: Rodar todos os testes localmente**

```bash
node tests/studio-live-core-test.js && \
node tests/studio-live-provider-test.js && \
node tests/studio-live-api-test.js && \
node tests/studio-live-player-test.js && \
node tests/studio-motion-v36-test.js
```
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/studio-live.yml
git commit -m "ci: protect studio live avatar module"
```

---

### Task 7: Teste funcional em produção e ativação segura

**Files:**
- No source changes unless verification reveals a bug; any bug fix returns to RED-GREEN before deployment.

**Interfaces:**
- Consumes: deployment Vercel do `main` com env vars configuradas.
- Produces: domínio oficial com botão AO VIVO funcional e baseline intacto.

- [ ] **Step 1: Fazer deploy e aguardar READY**

Verificar que o deployment corresponde ao commit que contém o runtime AO VIVO e que os aliases incluem:
```text
www.voznewsbrasil.com.br
voznewsbrasil.com.br
```
Expected: `readyState == READY`, `aliasError == null`.

- [ ] **Step 2: Verificar o baseline sem clicar no botão**

Abrir:
```text
https://www.voznewsbrasil.com.br/?studio-live=baseline
```
Checklist:
- imagem aprovada idêntica;
- LEDs ativos;
- Mercado & Clima correndo;
- Notícias Quentes correndo suavemente;
- nenhuma faixa branca atravessando o painel;
- nenhum áudio automático.

- [ ] **Step 3: Verificar preparação do bloco**

Chamar `POST /api/studio-live-prepare` no domínio oficial.
Expected: HTTP 202, `status=preparing`, `token` presente, nenhuma chave/ID privado exposto.

- [ ] **Step 4: Verificar estado até ready**

Consultar `GET /api/studio-live-state?token=...` até `status=ready`.
Expected: cada turn contém somente `speaker`, `mode`, `text`, `url`; sem IDs internos.

- [ ] **Step 5: Testar interação completa no navegador**

Clicar `AO VIVO / OUVIR AGORA` e confirmar:
- Deijanete fala com a voz clonada de Deijanete;
- Paulo fala com a voz clonada de Paulo;
- áudio nunca sobrepõe;
- turnos alternam;
- gesto visual de câmera/colega é aplicado quando suportado;
- rodapés e LEDs continuam em movimento durante a fala;
- ao finalizar o bloco, o próximo pode ser preparado sem reload.

- [ ] **Step 6: Testar fallback**

Simular indisponibilidade do endpoint/provedor em preview ou usando token inválido.
Expected: slots AO VIVO somem/ficam inativos, imagem base e rodapés continuam intactos.

- [ ] **Step 7: Verificar produção final**

Fetch do domínio oficial deve mostrar:
- `studio-live-player.js` publicado;
- `v33-did-player.js` carregando runtime versionado;
- endpoints AO VIVO respondendo;
- teste GitHub Actions `studio-live` concluído com `success`.

Só então considerar a funcionalidade implantada.
