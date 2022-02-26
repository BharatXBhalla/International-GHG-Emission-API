module.exports={
    selectAndCondition: async (db,columnname,tablename,endingclause,variables)=>{
        query = "SELECT "+columnname+" FROM "+ tablename
        if(endingclause!=undefined){
            query+=" where "+endingclause
        }
        return new Promise((resolve,reject)=>{
            db.all(query,variables,(err,rows)=>{
                if(err){
                    reject(new Error(err));
                }
                resolve(rows)
            })
        });
    }
}