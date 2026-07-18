const fs = require('fs');
const path = require('path');
const Replicate = require('replicate');

// Inicializa o cliente do Replicate usando a variável de ambiente salva
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function resolveVoice(presenter) {
  const upper = presenter === 'deijanete' ? 'DEIJANETE' : 'PAULO';
  const explicitId = process.env[`${upper}_VOICE_ID`];
  return { 
    id: explicitId || (presenter === 'deijanete' ? 'pt-BR-FranciscaNeural' : 'pt-BR-AntonioNeural')
  };
}

function localImageToDataURI(presenter) {
  const filename = presenter === 'deijanete' ? 'studio-deijanete-source.jpg' : 'studio-paulo-source.jpg';
  const absolutePath = path.join(process.cwd(), filename);
  
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Imagem do apresentador não encontrada: ${filename}`);
  }
  
  const imageBuffer = fs.readFileSync(absolutePath);
  const base64Image = imageBuffer.toString('base64');
  return `data:image/jpeg;base64,${base64Image}`;
}

function sanitizeNewsText(value = '') {
  let text = String(value || '')
    .replace(/https?:\/\/[^\s<>()]+/gi, ' ')
    .replace(/www\.[^\s<>()]+/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text && !/[.!?]$/.test(text)) text += '.';
  return text;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido.' });
  
  try {
    const presenter = req.body?.presenter === 'paulo' ? 'paulo' : 'deijanete';
    const text = sanitizeNewsText(req.body?.text || '').slice(0, 1500);
    
    if (!text) return res.status(400).json({ error: 'Texto da notícia ausente.' });

    // 1. Prepara a imagem local convertendo para Data URI para enviar ao Replicate
    const sourceImageURI = localImageToDataURI(presenter);

    // 2. Resolve a voz configurada (ElevenLabs ou Fallback)
    const voice = await resolveVoice(presenter);

    // 3. Aqui nós vamos integrar a sua chamada de áudio da ElevenLabs futuramente.
    // Por enquanto, passamos o link do áudio gerado para alimentar o SadTalker.
    const drivenAudioUrl = req.body?.audio_url || "URL_DO_AUDIO_GERADO_PELA_ELEVENLABS";

    console.log(`Iniciando renderização no SadTalker para o apresentador: ${presenter}`);

    // 4. Executa o modelo estável do SadTalker hospedado no Replicate
    const output = await replicate.run(
      "cjwbw/sadtalker:3aa3dac9353cc4d6bd62a8f95957bd844003b401ca4e4a9b33baa574c549d376",
      {
        input: {
          source_image: sourceImageURI,
          driven_audio: drivenAudioUrl,
          preprocess: "crop", // Mantém o foco quadrado no rosto do apresentador
          still: true,        // Evita movimentos bruscos mantendo a postura de bancada
          enhancer: "gfpgan"  // Melhora a nitidez do rosto do avatar gerado
        }
      }
    );

    // O Replicate retorna diretamente a URL do arquivo .mp4 final gerado
    res.status(200).json({
      success: true,
      status: "completed",
      result_url: output, 
      presenter: presenter
    });

  } catch (error) {
    console.error("Erro no processamento do SadTalker:", error);
    res.status(500).json({ error: error.message || 'Falha ao criar vídeo no SadTalker.' });
  }
};
