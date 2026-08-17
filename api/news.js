const items = [
  {
    title: 'Campanha eleitoral de 2026 entra oficialmente nas ruas e na internet',
    summary: 'A propaganda eleitoral começou neste fim de semana. Candidatos à Presidência iniciam atos públicos pelo país e o TSE inaugura nesta segunda-feira o Centro de Divulgação das Eleições 2026.',
    source: 'Política • 17/08/2026'
  },
  {
    title: 'Casas Bahia entra com pedido de recuperação judicial',
    summary: 'A companhia cita juros elevados, restrição de crédito, aumento do custo financeiro e pressão sobre o consumo no pedido apresentado nesta segunda-feira.',
    source: 'Economia • 17/08/2026'
  },
  {
    title: 'Dólar abre a semana pressionado após forte alta e Ibovespa tenta reagir',
    summary: 'O mercado brasileiro inicia a semana após uma sequência de nove quedas do Ibovespa e avanço recente do dólar, com investidores atentos ao cenário fiscal, fluxo estrangeiro e indicadores econômicos.',
    source: 'Mercados • 17/08/2026'
  },
  {
    title: 'PIS/Pasep libera último lote do abono salarial para 4,1 milhões de trabalhadores',
    summary: 'O pagamento contempla nascidos em novembro e dezembro e movimenta cerca de R$ 5,2 bilhões, segundo informações divulgadas nesta segunda-feira.',
    source: 'Brasil • 17/08/2026'
  },
  {
    title: 'Novo terremoto de magnitude 5,7 atinge a Indonésia',
    summary: 'O novo tremor atingiu a ilha de Flores após o forte terremoto registrado no fim de semana. Autoridades mantêm ações de emergência e assistência à população afetada.',
    source: 'Mundo • 17/08/2026'
  },
  {
    title: 'Brasília tem manutenção programada na rede elétrica nesta segunda-feira',
    summary: 'A Neoenergia Brasília conclui o cronograma de manutenção e modernização da rede previsto entre 11 e 17 de agosto, com intervenções programadas no Distrito Federal.',
    source: 'Brasília • 17/08/2026'
  }
];

export default function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
  res.status(200).json({
    updatedAt: '2026-08-17T08:46:00-03:00',
    edition: 'VOZ NEWS • 17 de agosto de 2026',
    items
  });
}
