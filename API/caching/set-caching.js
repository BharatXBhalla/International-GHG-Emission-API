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
        await client.set(cachehash,JSON.stringify(res.locals.body));
        await client.expire(cachehash, 300);
    }catch(err){
        console.log(err);
        next()
    }
}