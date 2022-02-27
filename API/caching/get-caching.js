const redis = require("redis")

var client; 

(async () => {
    client = redis.createClient();
  
    client.on('error', (err) => console.log('Redis Client Error', err));
  
    await client.connect();
})();

module.exports=async (req,res,next)=>{

    cachehash = req.originalUrl;
    
    try{
        var result=await client.get(cachehash);
        if(result==null){
            next();
        }else{
            res.status(200).json(JSON.parse(result));
        }
        
    }catch(err){
        console.log(err);
        next()
    }
}