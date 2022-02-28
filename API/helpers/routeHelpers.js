const Joi = require('joi');

module.exports = {
  validateRequest: (schema) => {
    return (req, res, next) => {

      if(req.headers.transaction_id==null){
        next(new Error("No Transaction Id"));
      }


      console.log("::::::::::Start Validating Request for "+req.headers.transaction_id+" :::::::::::::")
      let result

      if(schema.querySchema!=undefined){
         result = Joi.validate(req.query, schema.querySchema);
        if (result.error) {
          return res.status(400).json(result.error);
        }
      }else{
         result = Joi.validate(req.query, {});
        if (result.error) {
          return res.status(400).json(result.error);
        }
      }

      if(schema.bodySchema!=undefined){
        result = Joi.validate(req.body, schema.querySchema);
        if (result.error) {
          return res.status(400).json(result.error);
        }
      }else{
        result = Joi.validate(req.body, {});
        if (result.error) {
          return res.status(400).json(result.error);
        }
      }


      if(schema.uriSchema!=undefined){
        result = Joi.validate(req.params, schema.uriSchema);
        if (result.error) {
          return res.status(400).json(result.error);
        }
      }else{
        result = Joi.validate(req.params, {});
        if (result.error) {
          return res.status(400).json(result.error);
        }
      }

      console.log("::::::::::End Validating Request for "+req.headers.transaction_id+" :::::::::::::")

      next();
    }
  },
  validateAssertions:(schema)=>{
    return (req,res,next)=>{
      console.log("::::::::::Start Validating Assertions for "+req.headers.transaction_id+" :::::::::::::");
      var result
      schema.assertSchema.forEach(assertions => {
        result=assertions(req)
        if(result.error){
          return res.status(400).json({"Error":result.error.toString()});
        }
      });
      console.log("::::::::::End Validating Assertions for "+req.headers.transaction_id+" :::::::::::::");
      next();
    }
  }
}