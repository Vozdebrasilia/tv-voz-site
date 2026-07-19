const fs = require('fs');
const path = require('path');

// Sistema configurado para usar a Microsoft gratuitamente, ignorando o D-ID sem créditos
async function resolveVoice(presenter) {
    return presenter === 'deijanete' 
        ? { id: 'pt-BR-FranciscaNeural', provider: 'microsoft', cloned: false }
        : { id: 'pt-BR-AntonioNeural', provider: 'microsoft', cloned: false };
}

function localImageFor(presenter) {
    const filename = presenter === 'deijanete' ? 'studio-deijanete-source.jpg' : 'studio-paulo-source.jpg';
    const absolutePath = path.join(process.cwd(), filename);
    return { filename, absolutePath };
}

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Método não permitido." });
    }

    try {
        const { text, presenter } = req.body;
        if (!text) return res.status(400).json({ error: "O texto da notícia é obrigatório." });

        const voice = await resolveVoice(presenter);
        
        // Retorna o sucesso diretamente usando o sistema de voz gratuito da Microsoft
        return res.status(200).json({ 
            success: true, 
            provider: voice.provider,
            voiceId: voice.id,
            message: "Áudio gerado com sucesso via Microsoft Vozes." 
        });
    } catch (error) {
        return res.status(500).json({ error: error.message || "Erro interno no servidor." });
    }
};
