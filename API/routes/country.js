const express = require('express');
const router = require('express-promise-router')();


const { validateRequest ,validateAssertions} = require('../helpers/routeHelpers');
const { schemas } = require("../helpers/schema/country/schema")
const CountryController = require('../controllers/country');

const getCache=require("../caching/get-caching")
const setCache=require("../caching/set-caching")


router.route('/:id').get(validateRequest(schemas.getCountrySchema), 
                                        validateAssertions(schemas.getCountrySchema),
                                        getCache,
                                        CountryController.getCountryData,
                                        setCache );

module.exports = router;