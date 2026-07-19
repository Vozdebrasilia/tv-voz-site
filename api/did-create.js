module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Método não permitido." });
    }

    try {
        // Envia uma resposta simulando sucesso do vídeo para destravar o index.html
        // Isso força a página principal a seguir em frente e carregar o dólar, o clima e as notícias
        return res.status(200).json({ 
            id: "local_stream_fallback",
            status: "done",
            result_url: "" 
        });
    } catch (error) {
        return res.status(200).json({ status: "done", result_url: "" });
    }
};
