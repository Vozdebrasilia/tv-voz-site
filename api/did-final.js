const { didFetch } = require('./_did');

const SCRIPT = [
  {
    presenter:'paulo',
    voice:'U6LxHR0vu0MhG5Nqp5ID',
    image:'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/studio-paulo-source.jpg',
    text:'Seja muito bem-vindo. O portal do futuro já chegou.'
  },
  {
    presenter:'deijanete',
    voice:'Dimf6681ffz3PTVPPAEX',
    image:'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/studio-deijanete-source.jpg',
    text:'Você está em um ambiente criado para mostrar a Brasília, ao Brasil e ao mundo o que há de mais relevante, inovador e inspirador.'
  },
  {
    presenter:'paulo',
    voice:'U6LxHR0vu0MhG5Nqp5ID',
    image:'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/studio-paulo-source.jpg',
    text:'Aqui, informação, credibilidade e visão de futuro caminham juntas.'
  },
  {
    presenter:'deijanete',
    voice:'Dimf6681ffz3PTVPPAEX',
    image:'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/studio-deijanete-source.jpg',
    text:'E agora, vamos ao destaque viral do dia.'
  },
  {
    presenter:'paulo',
    voice:'U6LxHR0vu0MhG5Nqp5ID',
    image:'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/studio-paulo-source.jpg',
    text:'O assunto que domina o debate neste momento é a política brasileira.'
  },
  {
    presenter:'deijanete',
    voice:'Dimf6681ffz3PTVPPAEX',
    image:'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/studio-deijanete-source.jpg',
    text:'Segundo o Tribunal Superior Eleitoral, a propaganda eleitoral geral, inclusive na internet, começa amanhã, dezesseis de agosto.'
  },
  {
    presenter:'paulo',
    voice:'U6LxHR0vu0MhG5Nqp5ID',
    image:'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/studio-paulo-source.jpg',
    text:'Isso marca o início oficial de uma nova fase da disputa eleitoral, com mais visibilidade para candidaturas, agendas, discursos e estratégias de campanha.'
  },
  {
    presenter:'deijanete',
    voice:'Dimf6681ffz3PTVPPAEX',
    image:'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/studio-deijanete-source.jpg',
    text:'No VOZ NEWS, você acompanha esse processo com presença, credibilidade e visão de futuro.'
  },
  {
    presenter:'paulo',
    voice:'U6LxHR0vu0MhG5Nqp5ID',
    image:'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/studio-paulo-source.jpg',
    text:'Fique conosco.'
  },
  {
    presenter:'deijanete',
    voice:'Dimf6681ffz3PTVPPAEX',
    image:'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/studio-deijanete-source.jpg',
    text:'O futuro da informação já começou.'
  }
];

module.exports = async function handler(req,res){
  try{
    const token = String(req.query?.token || '');
    if(token !== process.env.V33_GENERATE_TOKEN){
      return res.status(401).json({error:'Não autorizado'});
    }

    const results=[];

    for(let i=0;i<SCRIPT.length;i++){
      const s=SCRIPT[i];

      const payload={
        source_url:s.image,
        script:{
          type:'text',
          input:s.text,
          provider:{
            type:'elevenlabs',
            voice_id:s.voice,
            voice_config:{
              stability:0.62,
              similarity_boost:0.86
            }
          }
        },
        config:{
          stitch:true,
          fluent:true,
          result_format:'mp4',
          pad_audio:0
        },
        name:`V33 FINAL ${String(i+1).padStart(2,'0')} ${s.presenter}`,
        user_data:JSON.stringify({
          project:'V33',
          order:i+1,
          presenter:s.presenter
        })
      };

      const data=await didFetch('/talks',{
        method:'POST',
        body:JSON.stringify(payload)
      });

      results.push({
        order:i+1,
        presenter:s.presenter,
        id:data.id,
        status:data.status,
        text:s.text
      });
    }

    res.setHeader('Cache-Control','no-store');
    res.status(200).json({count:results.length,results});

  }catch(e){
    res.status(e.status||500).json({
      error:e.message,
      details:e.data||null
    });
  }
};
