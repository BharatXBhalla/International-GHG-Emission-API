const express = require('express');
const router = require('express-promise-router')();


const { validateRequest ,validateAssertions} = require('../helpers/routeHelpers');
const { schemas } = require("../helpers/schema/country/schema")
const CountryController = require('../controllers/country');



router.route('/:id').get(validateRequest(schemas.getCountrySchema), 
                                        validateAssertions(schemas.getCountrySchema),
                                        CountryController.getCountryData );

module.exports = router;