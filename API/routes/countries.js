const express = require('express');
const router = require('express-promise-router')();

const CountriesController = require("../controllers/country");

const { validateRequest } = require('../helpers/routeHelpers');
const { schemas } = require("../helpers/schema/countries/schema");

const getCache=require("../caching/get-caching")
const setCache=require("../caching/set-caching")

router.route('/').get(validateRequest(schemas.getCountriesSchema),getCache,
                      CountriesController.getCountries,setCache );


module.exports = router;