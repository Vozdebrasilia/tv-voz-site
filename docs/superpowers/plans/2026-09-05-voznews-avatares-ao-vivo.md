# VOZ NEWS Avatares AO VIVO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar ao estúdio VOZ NEWS dois apresentadores animados — Deijanete e Paulo — com vozes clonadas, turnos de fala baseados no `/api/news`, botão `AO VIVO / OUVIR AGORA` e blocos de aproximadamente 45 segundos, preservando integralmente o estúdio atual quando a camada AO VIVO estiver desligada ou indisponível.

**Architecture:** A imagem e as animações atuais permanecem como baseline. Um runtime separado (`studio-live-player.js`) é carregado depois do estúdio existente e injeta somente o botão e duas camadas de apresentador. O backend usa funções Vercel stateless: prepara um roteiro determinístico a partir do `/api/news`, solicita clipes ao HeyGen via API v3 e devolve um token HMAC assinado; nenhuma chave do provedor vai para o navegador.

**Tech Stack:** Vercel Functions (Node.js), JavaScript sem framework, endpoint existente `/api/news`, HeyGen private digital twins + voice clones, `POST /v3/videos`, `GET /v3/videos/{video_id}`, Node `assert`, GitHub Actions, Vercel production deploy.

**Spec:** `docs/superpowers/specs/2026-09-05-voznews-avatares-ao-vivo-design.md`

## Global Constraints

- O visual atual do estúdio é baseline protegido; não redesenhar imagem, logos, bancada, textos, proporções, LEDs ou rodapés.
- O runtime atual `v33-did-player.js` mantém Mercado `18s`, Notícias Quentes `36s`, LEDs/pulsos e a imagem oficial.
- Os arquivos brutos de Deijanete e Paulo enviados na conversa não entram no GitHub.
- Áudio só inicia após clique em `AO VIVO / OUVIR AGORA`.
- Fatos falados vêm das manchetes de `/api/news`; conectivos podem ser naturais, mas não acrescentam fatos.
- Blocos alvo: 45 s, com variação natural.
- Nenhuma chave HeyGen/API fica em JavaScript público.
- Falha do avatar nunca remove a imagem estática nem interrompe Mercado & Clima, Notícias Quentes ou LEDs.
- O cliente não solicita câmera nem microfone do visitante.
- `partner` significa reação visual orientada ao colega; não prometer controle ocular real quando o motor do digital twin não expuser gaze control explícito.

---

### Task 1: Provisionar identidades e vozes privadas

**Files:**
- No repository changes in this task.
- Server environment names: `HEYGEN_API_KEY`, `VOZNEWS_DEIJANETE_AVATAR_ID`, `VOZNEWS_PAULO_AVATAR_ID`, `VOZNEWS_DEIJANETE_VOICE_ID`, `VOZNEWS_PAULO_VOICE_ID`, `VOZNEWS_LIVE_SIGNING_SECRET`.

**Interfaces:**
- Consumes: `/mnt/data/WhatsApp Video 2026-09-04 at 12.02.59(1).mp4` (Deijanete) and `/mnt/data/WhatsApp Video 2026-09-05 at 16.34.29.mp4` (Paulo).
- Produces: dois avatar look IDs prontos, dois voice IDs prontos e consentimento aprovado.

- [ ] **Step 1: Verificar os dois arquivos locais**

Run:
```bash
ffprobe -v error -show_entries format=duration:stream=codec_type,codec_name -of json "/mnt/data/WhatsApp Video 2026-09-04 at 12.02.59(1).mp4"
ffprobe -v error -show_entries format=duration:stream=codec_type,codec_name -of json "/mnt/data/WhatsApp Video 2026-09-05 at 16.34.29.mp4"
```
Expected: ambos têm stream de vídeo, stream de áudio e duração maior que 30 s.

- [ ] **Step 2: Fazer upload dos dois vídeos como assets privados no HeyGen**

Para cada MP4: `create_asset_upload` → PUT exato dos bytes no `upload_url` → `complete_asset_upload` → `get_asset`.

Expected: dois `asset_id` finalizados.

- [ ] **Step 3: Criar as duas vozes clonadas**

Criar `VOZ NEWS — Deijanete` e `VOZ NEWS — Paulo` com idioma `pt` e remoção de ruído habilitada.

Expected: `get_voice` retorna `status=complete` para ambas.

- [ ] **Step 4: Criar os dois digital twins**

Criar `VOZ NEWS — Deijanete` a partir do asset de Deijanete e `VOZ NEWS — Paulo` a partir do asset de Paulo.

Expected: os grupos/looks privados chegam ao estado de treinamento concluído.

- [ ] **Step 5: Completar consentimento de cada avatar**

Gerar e concluir o consentimento de cada grupo no fluxo do provedor.

Expected: ambos ficam autorizados para geração de vídeo.

- [ ] **Step 6: Associar a voz correta ao avatar correto**

Atualizar cada avatar group com sua própria voz clonada como `default_voice_id`.

Expected: Deijanete aponta para a voz de Deijanete e Paulo para a voz de Paulo.

- [ ] **Step 7: Registrar resultados somente no ambiente do servidor**

No projeto Vercel, definir os cinco valores vindos dos passos anteriores nos nomes de ambiente acima. Gerar o segredo localmente com:
```bash
openssl rand -hex 32
```
e salvar o resultado exclusivamente em `VOZNEWS_LIVE_SIGNING_SECRET` no ambiente Vercel. Não registrar valores reais no repositório, logs ou plano.

Verification:
```bash
git grep -nE 'HEYGEN_API_KEY\s*=|VOZNEWS_(DEIJANETE|PAULO)_(AVATAR|VOICE)_ID\s*=|VOZNEWS_LIVE_SIGNING_SECRET\s*=' -- ':!docs/**'
```
Expected: nenhum valor literal; posteriormente só referências `process.env.*`.

---

### Task 2: Criar o gerador determinístico de roteiro

**Files:**
- Create: `studio-live-core.js`
- Create: `tests/studio-live-core-test.js`

**Interfaces:**
- Consumes: `Array<{title:string}>` vindo do `/api/news`.
- Produces: `buildStudioBlock(items, now)` -> `{blockId, generatedAt, sourceHeadlines, turns}`.

- [ ] **Step 1: Escrever o teste falhando**

Create `tests/studio-live-core-test.js`:
```js
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
```

- [ ] **Step 2: Rodar RED**

```bash
node tests/studio-live-core-test.js
```
Expected: FAIL `Cannot find module '../studio-live-core'`.

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
```

- [ ] **Step 4: Rodar GREEN**

```bash
node tests/studio-live-core-test.js
```
Expected: `OK studio-live-core`.

- [ ] **Step 5: Commit**

```bash
git add studio-live-core.js tests/studio-live-core-test.js
git commit -m "feat: add deterministic studio live script builder"
```

---

### Task 3: Criar cliente server-only do HeyGen e token assinado

**Files:**
- Create: `api/_studio-live-provider.js`
- Create: `tests/studio-live-provider-test.js`

**Interfaces:**
- Consumes: turnos de `studio-live-core.js` e `process.env`.
- Produces: `createTurnVideo(turn)`, `readTurnVideo(videoId)`, `signJob(payload)`, `verifyJob(token)`.

- [ ] **Step 1: Escrever o teste falhando**

Create `tests/studio-live-provider-test.js`:
```js
const assert=require('assert'),fs=require('fs');
process.env.VOZNEWS_LIVE_SIGNING_SECRET='0123456789abcdef0123456789abcdef';
const p=require('../api/_studio-live-provider');
const payload={blockId:'abc',videos:[{speaker:'deijanete',videoId:'v1'}]};
const token=p.signJob(payload);
assert.deepStrictEqual(p.verifyJob(token),payload);
assert.throws(()=>p.verifyJob(token.slice(0,-1)+(token.endsWith('a')?'b':'a')));
const src=fs.readFileSync('api/_studio-live-provider.js','utf8');
assert.ok(src.includes("'/v3/videos'"));
assert.ok(src.includes("`/v3/videos/${videoId}`"));
assert.ok(src.includes('process.env.HEYGEN_API_KEY'));
assert.ok(!/sk[-_][A-Za-z0-9]{20,}/.test(src),'nenhuma chave literal');
console.log('OK studio-live-provider');
```

- [ ] **Step 2: Rodar RED**

```bash
node tests/studio-live-provider-test.js
```
Expected: FAIL porque o arquivo ainda não existe.

- [ ] **Step 3: Implementar assinatura, seleção de identidade e API v3**

Create `api/_studio-live-provider.js` com estas funções e contratos:
```js
const crypto=require('crypto');
const API='https://api.heygen.com';
function b64(v){return Buffer.from(JSON.stringify(v)).toString('base64url')}
function signJob(payload){
  const secret=process.env.VOZNEWS_LIVE_SIGNING_SECRET;
  if(!secret)throw new Error('missing signing secret');
  const body=b64(payload),sig=crypto.createHmac('sha256',secret).update(body).digest('base64url');
  return `${body}.${sig}`;
}
function verifyJob(token){
  const secret=process.env.VOZNEWS_LIVE_SIGNING_SECRET;
  if(!secret)throw new Error('missing signing secret');
  const [body,sig]=String(token||'').split('.');
  const expected=crypto.createHmac('sha256',secret).update(body||'').digest('base64url');
  if(!body||!sig||sig.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected)))throw new Error('invalid token');
  return JSON.parse(Buffer.from(body,'base64url').toString('utf8'));
}
function identity(speaker){
  if(speaker==='deijanete')return {avatarId:process.env.VOZNEWS_DEIJANETE_AVATAR_ID,voiceId:process.env.VOZNEWS_DEIJANETE_VOICE_ID};
  if(speaker==='paulo')return {avatarId:process.env.VOZNEWS_PAULO_AVATAR_ID,voiceId:process.env.VOZNEWS_PAULO_VOICE_ID};
  throw new Error('invalid speaker');
}
async function heygen(path,options={}){
  const key=process.env.HEYGEN_API_KEY;
  if(!key)throw new Error('missing HEYGEN_API_KEY');
  const r=await fetch(API+path,{...options,headers:{'Content-Type':'application/json','x-api-key':key,...options.headers}});
  const data=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(`heygen:${r.status}:${JSON.stringify(data)}`);
  return data;
}
async function createTurnVideo(turn){
  const ids=identity(turn.speaker);
  if(!ids.avatarId||!ids.voiceId)throw new Error('missing presenter identity');
  const data=await heygen('/v3/videos',{method:'POST',body:JSON.stringify({
    type:'avatar',avatar_id:ids.avatarId,script:turn.text,voice_id:ids.voiceId,
    title:`VOZ NEWS ${turn.speaker} ${Date.now()}`,resolution:'720p',aspect_ratio:'16:9',
    output_format:'webm'
  })});
  const videoId=data&&data.data&&data.data.video_id;
  if(!videoId)throw new Error('missing video id');
  return {videoId};
}
async function readTurnVideo(videoId){
  const data=await heygen(`/v3/videos/${videoId}`,{method:'GET'});
  const item=data&&data.data||{};
  if(item.status==='failed')return {status:'failed'};
  if(item.status==='completed'&&item.video_url)return {status:'completed',url:item.video_url,duration:Number(item.duration)||0};
  return {status:'processing'};
}
module.exports={signJob,verifyJob,createTurnVideo,readTurnVideo};
```

If `output_format:'webm'` is rejected because the trained look lacks matting, make a RED test for the provider fallback, then change `createTurnVideo` to retry once with `output_format:'mp4'`; do not silently change the visual baseline.

- [ ] **Step 4: Rodar GREEN**

```bash
node tests/studio-live-provider-test.js
```
Expected: `OK studio-live-provider`.

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
- `POST /api/studio-live-prepare` -> `{status:'preparing',token,blockId,targetDuration:45}`.
- `GET /api/studio-live-state?token=...` -> `{status:'preparing'|'ready'|'unavailable',block?}`.

- [ ] **Step 1: Escrever teste de contrato falhando**

Create `tests/studio-live-api-test.js`:
```js
const fs=require('fs'),assert=require('assert');
const prepare=fs.readFileSync('api/studio-live-prepare.js','utf8');
const state=fs.readFileSync('api/studio-live-state.js','utf8');
assert.ok(prepare.includes('/api/news'),'mesmo feed do rodapé');
assert.ok(prepare.includes('buildStudioBlock'));
assert.ok(prepare.includes('signJob'));
assert.ok(state.includes('verifyJob'));
assert.ok(!prepare.includes('process.env.HEYGEN_API_KEY'),'endpoint não manipula segredo diretamente');
assert.ok(!state.includes('process.env.HEYGEN_API_KEY'),'endpoint não manipula segredo diretamente');
console.log('OK studio-live-api');
```

- [ ] **Step 2: Rodar RED**

```bash
node tests/studio-live-api-test.js
```
Expected: FAIL `ENOENT`.

- [ ] **Step 3: Implementar `POST /api/studio-live-prepare`**

```js
const {buildStudioBlock}=require('../studio-live-core');
const {createTurnVideo,signJob}=require('./_studio-live-provider');
module.exports=async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'method_not_allowed'});
  try{
    const host=req.headers.host,proto=req.headers['x-forwarded-proto']||'https';
    const newsResponse=await fetch(`${proto}://${host}/api/news`,{headers:{accept:'application/json'}});
    if(!newsResponse.ok)throw new Error('news unavailable');
    const news=await newsResponse.json();
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
    console.error('studio-live-prepare',e.message);
    return res.status(503).json({status:'unavailable'});
  }
}
```

- [ ] **Step 4: Implementar `GET /api/studio-live-state`**

```js
const {verifyJob,readTurnVideo}=require('./_studio-live-provider');
module.exports=async function handler(req,res){
  if(req.method!=='GET')return res.status(405).json({error:'method_not_allowed'});
  try{
    const job=verifyJob(req.query&&req.query.token);
    const turns=[];let total=0;
    for(const v of job.videos){
      const state=await readTurnVideo(v.videoId);
      if(state.status==='failed')return res.status(503).json({status:'unavailable'});
      if(state.status!=='completed')return res.status(200).json({status:'preparing'});
      total+=state.duration||0;
      turns.push({speaker:v.speaker,mode:v.mode,text:v.text,url:state.url});
    }
    res.setHeader('Cache-Control','no-store');
    return res.status(200).json({status:'ready',block:{id:job.blockId,duration:total||45,turns}});
  }catch(e){
    return res.status(400).json({status:'unavailable'});
  }
}
```

- [ ] **Step 5: Rodar GREEN**

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
- Modify: `v33-did-player.js` apenas para carregar o novo runtime.

**Interfaces:**
- Consumes: `/api/studio-live-prepare`, `/api/studio-live-state`.
- Produces: botão `AO VIVO / OUVIR AGORA`, slots `.vn-live-presenter-deijanete`, `.vn-live-presenter-paulo`, estados `idle/camera/partner/transition`.

- [ ] **Step 1: Escrever teste de isolamento falhando**

Create `tests/studio-live-player-test.js`:
```js
const fs=require('fs'),assert=require('assert');
const base=fs.readFileSync('v33-did-player.js','utf8');
const live=fs.readFileSync('studio-live-player.js','utf8');
assert.ok(base.includes('studio-live-player.js'),'runtime separado');
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

```bash
node tests/studio-live-player-test.js
```
Expected: FAIL porque `studio-live-player.js` não existe.

- [ ] **Step 3: Implementar `studio-live-player.js`**

Criar runtime auto-inicializável que:
1. espera `#tv-ao-vivo`;
2. injeta botão `🔴 AO VIVO / OUVIR AGORA` sem alterar `.vn-market`, `.vn-hot`, `.vn-lightfx`;
3. cria dois `<video playsinline>` com classes próprias `.vn-live-*`;
4. ao clique chama `POST /api/studio-live-prepare`;
5. enquanto prepara, consulta `GET /api/studio-live-state?token=...` a cada 2500 ms;
6. quando `ready`, reproduz turnos sequencialmente e nunca toca dois áudios juntos;
7. estado `camera`: slot do falante fica neutro/frontal;
8. estado `partner`: slot do ouvinte recebe transformação visual sutil em direção ao colega (pequena rotação/perspectiva/translate, sem afirmar gaze ocular real);
9. ao terminar o bloco, prepara o seguinte;
10. qualquer erro chama `resetToBaseline()`, pausa/remove os vídeos AO VIVO e deixa a imagem/rodapés/LEDs intocados.

CSS do runtime deve ser injetado em `<style id="voznews-studio-live-style">` e usar somente seletores `.vn-live-*` e `#voznews-live-*`.

- [ ] **Step 4: Adicionar somente o loader ao `v33-did-player.js`**

Adicionar ao final do arquivo, sem modificar o bloco visual existente:
```js
(()=>{if(!document.getElementById('voznews-studio-live-runtime')){const s=document.createElement('script');s.id='voznews-studio-live-runtime';s.src='/studio-live-player.js?v=20260905-live1';s.defer=true;document.head.appendChild(s)}})();
```

- [ ] **Step 5: Rodar GREEN + regressão existente**

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

### Task 6: Adicionar CI específica e proteção contra vazamento

**Files:**
- Create: `.github/workflows/studio-live.yml`

**Interfaces:**
- Consumes: testes `studio-live-*` + `studio-motion-v36-test.js`.
- Produces: gate automático em pushes do módulo AO VIVO.

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

- [ ] **Step 2: Rodar todos os testes**

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

### Task 7: Teste funcional e ativação segura em produção

**Files:**
- No source changes unless verification reveals a bug; any fix returns to a new RED-GREEN cycle.

**Interfaces:**
- Consumes: deployment Vercel do `main` com environment vars configuradas.
- Produces: domínio oficial com botão AO VIVO funcional e baseline intacto.

- [ ] **Step 1: Fazer deploy e aguardar READY**

Expected: deployment do commit final com `readyState=READY`, `aliasError=null`, aliases `www.voznewsbrasil.com.br` e `voznewsbrasil.com.br`.

- [ ] **Step 2: Verificar baseline sem clicar**

Open:
```text
https://www.voznewsbrasil.com.br/?studio-live=baseline
```
Confirmar imagem aprovada idêntica, LEDs ativos, Mercado correndo, Notícias Quentes suave, nenhuma faixa branca e nenhum áudio automático.

- [ ] **Step 3: Verificar preparação do bloco**

`POST https://www.voznewsbrasil.com.br/api/studio-live-prepare`

Expected: HTTP 202, `status=preparing`, `token` presente, sem chave/ID privado.

- [ ] **Step 4: Verificar estado até `ready`**

Consultar `GET /api/studio-live-state?token=...`.

Expected: cada turn pronto contém somente `speaker`, `mode`, `text`, `url`.

- [ ] **Step 5: Testar interação completa**

Clicar `AO VIVO / OUVIR AGORA` e confirmar:
- Deijanete usa a voz de Deijanete;
- Paulo usa a voz de Paulo;
- áudio nunca se sobrepõe;
- turnos alternam;
- falante fica em estado `camera` e ouvinte em reação `partner`;
- rodapés e LEDs continuam durante a fala;
- próximo bloco pode ser preparado sem reload.

- [ ] **Step 6: Testar fallback**

Usar token inválido em preview ou interromper o endpoint de estado.

Expected: camada AO VIVO desativa; imagem, rodapés e LEDs permanecem intactos.

- [ ] **Step 7: Verificação final**

Confirmar no domínio oficial:
- `studio-live-player.js` retorna 200;
- `v33-did-player.js` carrega runtime versionado;
- endpoints respondem;
- GitHub Actions `studio-live` conclui com `success`.

Só então considerar a funcionalidade implantada.
