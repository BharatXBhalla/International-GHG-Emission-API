const db=require("../dbconnection");
const sqliteHelper = require("../helpers/sqlite/select")

module.exports = {
    getCountries:async (req,res,next)=>{
        console.log("Get Countries")
        try{
        result=await sqliteHelper.selectAndCondition(db,"*","Countries");

        res.status(200).json({
            "CountriesResponse":{
                "Countries":result
            }
        });
        }catch(err){
            next(err);
        }
    },
    getCountryData: async (req,res,next)=>{
        console.log("Get Countries")
        const categories=req.query.category
        const id=req.params.id
        const startYear=req.query.startYear
        const endYear=req.query.endYear
        var result={"CountryId":id}

        endingclause="country_id=$id "+(startYear!=undefined?" AND year>=$startYear":"") + (endYear!=undefined?" AND year<=$endYear":"")
        console.log(endingclause)
        variables={$id:id,$startYear:startYear,$endYear:endYear}

        try{

            for(let i=0;i<categories.length;i++){
                tmp=await sqliteHelper.selectAndCondition(db,"YEAR,VALUE",categories[i],endingclause,variables);
                result[categories[i]]=tmp
            }

        res.status(200).json({
            "CountryResponse":{
                "Country":result
            }
        });

        }catch(err){
            next(err);
        }
    }
}