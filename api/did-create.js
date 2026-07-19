module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Método não permitido." });
    }

    try {
        const { text, presenter } = req.body;
        if (!text) return res.status(400).json({ error: "O texto é obrigatório." });

        // Retorna sucesso puro e limpo para o front-end disparar o áudio do navegador
        return res.status(200).json({ 
            success: true, 
            status: "done",
            message: "Motor de áudio pronto." 
        });
    } catch (error) {
        return res.status(500).json({ error: error.message || "Erro interno." });
    }
};
