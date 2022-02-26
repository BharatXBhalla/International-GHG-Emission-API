const Joi = require('joi');
module.exports={
    schemas: {
        getCountrySchema: {
          querySchema: Joi.object().keys({
            startYear: Joi.number().min(1990).max(9999).required(),
            endYear: Joi.number().min(1990).max(9999),
            category:Joi.array().required()
          }),
          uriSchema: Joi.object().keys({
            id: Joi.number().required()
          }),
          // asset Schema are layer 2 Schema Checkers
          assertSchema:[
              (req)=>{
                    if((req.query.startYear!=undefined && req.query.endYear==undefined) || req.query.startYear<=req.query.endYear){
                        return {}
                    }else{
                        return {error:new Error('Start Year has to be Less than Equal to End Year')};
                    }
                },
              (req)=>{
                valid_category=new Set(["CO2","GHG","CH4","N2O","SF6","HFC", "GHG_Indirect_CO2", "PFCs", "HF3", "HFC_Mix_PFC" ])
                var not_valid
                req.query.category.every(element => {
                      if(!valid_category.has(element)){
                        not_valid=element
                        return false;
                      }
                      return true;
                  });

                if(not_valid==undefined){
                    return {}
                }else{
                    return {error:new Error(not_valid+" is a Invalid Category")};
                }
              }
            ]
        }
      }
}