const items = [
  { title: 'ELEIÇÕES 2026: propaganda eleitoral já está liberada nas ruas e na internet' },
  { title: 'TSE inaugura hoje o Centro de Divulgação das Eleições 2026' },
  { title: 'ECONOMIA: Casas Bahia entra com pedido de recuperação judicial' },
  { title: 'MERCADOS: dólar inicia semana pressionado e Ibovespa busca reação após nove quedas' },
  { title: 'TRABALHADORES: último lote do PIS/Pasep chega a 4,1 milhões de pessoas' },
  { title: 'MUNDO: novo terremoto de magnitude 5,7 atinge a Indonésia' },
  { title: 'BRASÍLIA: manutenção programada da rede elétrica segue no DF nesta segunda-feira' }
];

export default function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
  res.status(200).json({ updatedAt: '2026-08-17T08:46:00-03:00', items });
}
