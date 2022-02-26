const Joi = require('joi');

module.exports = {
  validateRequest: (schema) => {
    return (req, res, next) => {
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


      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },
  validateAssertions:(schema)=>{
    return (req,res,next)=>{
      var result
      schema.assertSchema.forEach(assertions => {
        result=assertions(req)
        if(result.error){
          return res.status(400).json({"Error":result.error.toString()});
        }
      });
      next();
    }
  }
}