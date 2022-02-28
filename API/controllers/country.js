const db=require("../dbconnection");
const sqliteHelper = require("../helpers/sqlite/select")

module.exports = {
    getCountries:async (req,res,next)=>{
        console.log("::::::::::Start Get Countries Controller for "+req.headers.transaction_id+" :::::::::::::");
        try{
            console.log("::::::::::Start Fetching Data from Database for "+req.headers.transaction_id+" :::::::::::::");
            
            result=await sqliteHelper.selectAndCondition(db,"*","Countries");

            console.log("::::::::::End Fetching Data from Database for "+req.headers.transaction_id+" :::::::::::::");


            responsebody={
                "CountriesResponse":{
                    "Countries":result
                }
            };

            res.status(200).json(responsebody);
            res.locals.body=responsebody;

            next();
        }catch(err){
            next(err);
        }
        console.log("::::::::::End Get Countries Controller for "+req.headers.transaction_id+" :::::::::::::");
    },
    getCountryData: async (req,res,next)=>{
        console.log("::::::::::Start Get Country Data Controller for "+req.headers.transaction_id+" :::::::::::::");

        const categories=req.query.category;
        const id=req.params.id
        const startYear=req.query.startYear
        const endYear=req.query.endYear
        var result={"CountryId":id}

        endingclause="country_id=$id "+(startYear!=undefined?" AND year>=$startYear":"") + (endYear!=undefined?" AND year<=$endYear":"")
        variables={$id:id,$startYear:startYear,$endYear:endYear}

        try{
            console.log("::::::::::Start Fetching Data from Database for "+req.headers.transaction_id+" :::::::::::::");
            
            for(let i=0;i<categories.length;i++){
                tmp=await sqliteHelper.selectAndCondition(db,"YEAR,VALUE",categories[i],endingclause,variables);
                result[categories[i]]=tmp
            }

            console.log("::::::::::End Fetching Data from Database for "+req.headers.transaction_id+" :::::::::::::");
            responsebody={
                "CountryResponse":{
                    "Country":result
                }
            };  

            res.status(200).json(responsebody);
            res.locals.body=responsebody;

            next();
        }catch(err){
            next(err);
        }
        console.log("::::::::::End Get Country Data Controller for "+req.headers.transaction_id+" :::::::::::::");
    }
}