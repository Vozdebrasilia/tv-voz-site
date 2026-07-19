export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido.' });
    }
    const { presenter, text } = req.body;
    return res.status(200).json({ id: "offline_voice", result_url: text });
}
