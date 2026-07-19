const fs = require('fs');
const path = require('path');
const { dIdFetch, dIdUploadImage } = require('../_did');

async function resolveVoice(presenter) {
    const upperPresenter = presenter ? presenter.toUpperCase() : 'PAULO';
    const explicitId = process.env[`${upperPresenter}_VOICE_ID`];
    const explicitProvider = process.env[`${upperPresenter}_VOICE_PROVIDER`];
    
    if (explicitId) return { id: explicitId, provider: explicitProvider || 'elevenlabs', cloned: true };

    try {
        const voices = await dIdFetch('/tts/voices');
        const list = Array.isArray(voices) ? voices : (voices.voices || []);
        const term = presenter === 'deijanete' ? ['deijanete', 'deija', 'fayad'] : ['paulo', 'fayad', 'paulo'];
        const match = list.find(v => term.some(t => String(v.name || v.display_name).toLowerCase().includes(t)));
        if (match) return { id: match.id || match.voice_id, provider: match.provider || match.type || 'elevenlabs', cloned: true };
    } catch (e) {}

    return presenter === 'deijanete' 
        ? { id: 'pt-BR-FranciscaNeural', provider: 'microsoft', cloned: false }
        : { id: 'pt-BR-AntonioNeural', provider: 'microsoft', cloned: false };
}

function localImageFor(presenter) {
    const filename = presenter === 'deijanete' ? 'studio-deijanete-source.jpg' : 'studio-paulo-source.jpg';
    const absolutePath = path.join(process.cwd(), filename);
    if (!fs.existsSync(absolutePath)) throw new Error(`Imagem do apresentador não encontrada: ${filename}`);
    return { filename, absolutePath };
}

function sanitizeNewsText(value) {
    let text = String(value || '')
        .replace(/https?:\/\/\S+/gi, '')
        .replace(/www\.\S+/gi, '')
        .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, '')
        .replace(/\b[0-9]{1,4}[./-][0-9]{1,4}[./-][0-9]{1,4}\b/g, '')
        .replace(/\b[0-9]{1,2}:[0-9]{1,2}(?::[0-9]{1,2})?\b/g, '')
        .replace(/\[[^\]]*\]/g, '')
        .replace(/\([^)]*\)/g, '')
        .replace(/[#*_\-+=~|\\/<>]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
        
    const textTest = text.replace(/[^a-zA-Z]/g, '');
    if (textTest.length / text.length < 0.3) {
        return "Notícia com conteúdo inválido.";
    }
    return text;
}

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Método não permitido." });
    }

    try {
        const { text: rawText, presenter } = req.body;
        if (!rawText) return res.status(400).json({ error: "O texto da notícia é obrigatório." });

        const text = sanitizeNewsText(rawText);
        const { filename, absolutePath } = localImageFor(presenter);
        
        let sourceUrl = await dIdUploadImage(filename, absolutePath);
        if (!sourceUrl) throw new Error("A API do D-ID recebeu a imagem, mas não devolveu uma URL utilizável.");

        const voice = await resolveVoice(presenter);
        
        const payload = {
            source_url: sourceUrl,
            script: {
                type: 'text',
                input: text,
                provider: { type: voice.provider, voice_id: voice.id }
            },
            config: {
                stitch: true,
                result_format: 'mp4',
                fluent: true,
                pad_audio: 0
            }
        };

        const talk = await dIdFetch('/talks', { method: 'POST', body: JSON.stringify(payload) });
        if (!talk || !talk.id) throw new Error("Falha ao iniciar a criação do vídeo no D-ID.");

        return res.status(200).json({ success: true, talkId: talk.id, message: "Vídeo enviado para processamento no D-ID com sucesso." });
    } catch (error) {
        return res.status(500).json({ error: error.message || "Erro interno no servidor." });
    }
};
