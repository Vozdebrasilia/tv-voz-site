# V33 — Integração D-ID

## Objetivo
Integrar os 10 clipes finais D-ID de Paulo Fayad e Dra. Deijanete Fayad à bancada já existente da V33.

## Regras
- Não alterar bancada, estúdio, enquadramento, nomes, ticker, mercado/clima ou identidade visual.
- Paulo e Deijanete permanecem exatamente nas posições atuais.
- Substituir apenas a fala/animação atual pelos clipes D-ID.
- Não usar `speechSynthesis` como fallback durante essa apresentação.
- Não exibir os vídeos de entrevista.
- Se um clipe falhar, manter o apresentador estático; nunca trocar por voz genérica.
- A reprodução utiliza os vídeos já gerados, sem consumir novos créditos a cada visita.
- Remover endpoints temporários capazes de gerar Talks ou expor dados D-ID após concluir a integração.

## Fluxo
1. Usuário inicia o jornal.
2. Os 10 clipes D-ID são reproduzidos em ordem.
3. Só o apresentador que fala recebe o vídeo animado.
4. O outro permanece na imagem estática da bancada.
5. Ticker e mercado/clima seguem funcionando.
6. Ao final, ambos retornam ao estado normal da bancada.
