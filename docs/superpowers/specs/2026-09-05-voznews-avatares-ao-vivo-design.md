# VOZ NEWS — Avatares de Bancada Automáticos

## Objetivo

Transformar o estúdio VOZ NEWS já aprovado em uma bancada com Deijanete e Paulo animados, usando suas vozes reais clonadas, em blocos automáticos de aproximadamente 45 segundos baseados nas notícias exibidas no rodapé.

## Regra inviolável de preservação

O visual atual do estúdio é a camada-base oficial e não será redesenhado nem substituído. A implementação não altera:

- imagem aprovada do estúdio;
- logos e marcas;
- textos institucionais;
- proporções e enquadramento;
- bancada;
- LEDs já aprovados;
- faixa Mercado & Clima;
- faixa Notícias Quentes;
- estrutura dos demais portais e seções do site.

A nova funcionalidade entra exclusivamente como uma camada funcional sobre o módulo `#tv-ao-vivo`. Se a camada de avatar falhar, o estúdio atual permanece visível e funcional.

## Experiência do usuário

1. A página abre silenciosamente, preservando o estúdio atual.
2. O usuário vê o controle `🔴 AO VIVO / OUVIR AGORA` sobre o módulo do estúdio.
3. O áudio só começa após clique do usuário.
4. Ao iniciar, o sistema reproduz blocos de aproximadamente 45 segundos.
5. Deijanete e Paulo alternam falas.
6. Quem fala dirige a atenção prioritariamente para a câmera.
7. Quem escuta usa movimento/reação visual orientado para o colega quando o motor de avatar suportar esse gesto.
8. As notícias do rodapé continuam correndo normalmente durante a apresentação.
9. Ao terminar um bloco, o próximo bloco já preparado pode ser reproduzido sem recarregar a página.

## Tom editorial

O estilo escolhido é conversa jornalística natural, não uma leitura seca.

O sistema pode usar frases de ligação e reação como:

- “Paulo, olha só esta informação.”
- “Deijanete, este assunto chama atenção.”
- “Vamos acompanhar os próximos desdobramentos.”
- “E agora, outro destaque que está no nosso noticiário.”

Regras editoriais:

- fatos, nomes, números, cargos, locais e acontecimentos devem vir das manchetes disponíveis;
- o sistema não cria fatos adicionais;
- comentários de ligação não podem afirmar informação factual nova;
- nenhuma opinião política partidária é atribuída aos apresentadores;
- a conversa pode ser mais solta, mas permanece compatível com um telejornal.

## Fonte das notícias

A fonte primária é o endpoint existente `/api/news`, já utilizado pelo rodapé Notícias Quentes.

O gerador de roteiro:

1. busca as manchetes atuais;
2. remove itens vazios e duplicados;
3. seleciona quantidade suficiente para um bloco de cerca de 45 segundos;
4. intercala manchetes entre Deijanete e Paulo;
5. adiciona apenas frases de ligação não factuais;
6. gera uma sequência estruturada de turnos.

Formato interno previsto:

```json
{
  "blockId": "string",
  "generatedAt": "ISO-8601",
  "sourceHeadlines": ["..."],
  "turns": [
    {
      "speaker": "deijanete",
      "mode": "camera",
      "text": "..."
    },
    {
      "speaker": "paulo",
      "mode": "partner",
      "text": "..."
    }
  ]
}
```

## Avatares e vozes

Serão criados dois perfis privados no provedor de avatar:

- Deijanete — usando o vídeo enviado nesta conversa em 05/09/2026;
- Paulo — usando o vídeo enviado nesta conversa em 05/09/2026.

Cada perfil terá:

- identidade visual própria;
- voz clonada própria;
- consentimento exigido pelo provedor;
- identificadores privados armazenados somente em configuração de servidor, nunca expostos diretamente em HTML público.

Os arquivos brutos enviados pelos apresentadores não serão commitados no repositório GitHub.

## Estratégia visual

A imagem oficial do estúdio permanece como fundo fixo e fallback.

A camada animada utilizará dois slots independentes, alinhados às posições de Deijanete e Paulo no estúdio. Cada slot poderá reproduzir um clipe de avatar do respectivo apresentador sem modificar a imagem-base.

A preferência técnica é vídeo de avatar com fundo removido/transparente. Caso o perfil treinado não ofereça transparência, será usada uma máscara/recorte restrito à região de cada apresentador, preservando o restante do estúdio.

O sistema não deverá cobrir logos, títulos, rodapés ou elementos de marca.

## Direção de olhar e reação

Estados visuais previstos:

- `camera`: apresentador ativo, atenção dirigida ao público;
- `partner`: reação visual direcionada ao colega;
- `idle`: movimento mínimo e natural sem fala;
- `transition`: troca suave de turno.

A precisão do olhar depende das capacidades do motor de avatar. A implementação solicitará a direção por prompt/motion control quando suportada. Quando o motor não permitir gaze control explícito, o fallback será movimento corporal/cabeça sutil no mesmo sentido, sem falsificar controle inexistente.

## Geração dos blocos

A geração será assíncrona e em fila curta:

1. o site consulta o estado do bloco atual;
2. se não houver bloco pronto, solicita preparação;
3. o servidor cria o roteiro usando `/api/news`;
4. cada turno é sintetizado com a voz correta;
5. o vídeo de cada turno é gerado pelo avatar correto;
6. os assets finalizados são registrados no manifesto do bloco;
7. o cliente reproduz os turnos em sequência;
8. enquanto um bloco toca, o servidor pode preparar o próximo.

Isso evita depender de geração instantânea no momento exato do clique.

## Endpoints previstos

### `GET /api/studio-live-state`

Retorna estado seguro para o navegador:

```json
{
  "status": "ready|preparing|unavailable",
  "block": {
    "id": "...",
    "duration": 45,
    "turns": []
  }
}
```

Nenhuma chave de API ou identificador secreto é retornado.

### `POST /api/studio-live-prepare`

Dispara ou reutiliza a preparação do próximo bloco. Deve ser idempotente dentro de uma janela curta para impedir múltiplas gerações simultâneas.

### `GET /api/studio-live-block?id=...`

Retorna apenas URLs temporárias/públicas necessárias à reprodução e metadados de turnos.

## Cliente do estúdio

A lógica de reprodução ficará isolada da lógica visual existente.

Responsabilidades do cliente:

- criar o botão `AO VIVO / OUVIR AGORA`;
- solicitar o bloco disponível;
- alternar presenter slots;
- reproduzir áudio/vídeo somente após gesto do usuário;
- sincronizar o estado visual `camera`, `partner`, `idle`;
- manter rodapés e LEDs independentes;
- voltar ao estúdio estático se houver erro.

## Segurança e privacidade

- chaves do provedor de avatar ficam somente no backend/Vercel;
- nenhum segredo é incluído no JavaScript público;
- IDs sensíveis serão minimizados no payload cliente;
- mídia bruta de Deijanete e Paulo não será publicada no GitHub;
- o módulo não grava visitantes nem solicita microfone/câmera;
- o botão inicia apenas reprodução, não captura de mídia.

## Falhas e fallback

Se qualquer etapa falhar:

- avatar ainda em treinamento;
- consentimento pendente;
- geração demorando;
- API do provedor indisponível;
- notícia indisponível;
- mídia não reproduzível no navegador;

então:

1. a imagem atual do estúdio continua aparecendo;
2. os rodapés continuam funcionando;
3. LEDs continuam funcionando;
4. o controle mostra estado discreto de indisponibilidade/preparação;
5. nenhum layout aprovado é removido.

## Desempenho

- não baixar vídeos antes de o usuário clicar;
- pré-carregar apenas o próximo turno necessário;
- evitar múltiplas gerações do mesmo bloco;
- cachear manifesto de bloco por período curto;
- manter o carregamento inicial do site independente da API de avatar.

## Critérios de aceitação

A funcionalidade só será considerada pronta quando todos estes itens forem verificados:

1. O estúdio visual atual permanece idêntico quando a camada AO VIVO está desligada.
2. `AO VIVO / OUVIR AGORA` inicia áudio somente após clique.
3. Deijanete usa a voz clonada de Deijanete.
4. Paulo usa a voz clonada de Paulo.
5. As falas usam manchetes atuais do mesmo feed do rodapé.
6. Os apresentadores alternam turnos sem sobrepor áudio.
7. Há estado visual de câmera e reação ao colega quando suportado pelo motor.
8. Cada bloco dura aproximadamente 45 segundos, aceitando variação causada pela duração natural das falas.
9. O rodapé Mercado & Clima permanece funcional.
10. O rodapé Notícias Quentes permanece funcional e suave.
11. Os LEDs aprovados permanecem funcionais.
12. Falha do serviço de avatar nunca remove ou quebra o estúdio estático.
13. Nenhum arquivo bruto de voz/vídeo dos apresentadores é commitado no repositório.
14. Nenhuma chave secreta fica exposta no navegador.

## Implantação segura

A implantação será feita em etapas verificáveis:

1. criar e validar identidades/vozes;
2. criar gerador determinístico de roteiro;
3. criar geração e manifesto de blocos;
4. criar cliente AO VIVO isolado;
5. testar com o estúdio atual protegido;
6. publicar apenas após testes passarem;
7. verificar a versão publicada no domínio oficial.

A imagem e o código visual atual do estúdio serão tratados como baseline protegido durante toda a implementação.
