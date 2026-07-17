const { didFetch } = require('./_did');
module.exports=async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  try{
    const data=await didFetch('/credits');
    res.status(200).json({ok:true,credits:data});
  }catch(error){
    res.status(error.status||500).json({ok:false,error:error.message,details:error.data||null});
  }
};
