const express = require('express');
const router = require('express-promise-router')();

const CountriesController = require("../controllers/country");

const { validateRequest } = require('../helpers/routeHelpers');
const { schemas } = require("../helpers/schema/countries/schema")


router.route('/').get(validateRequest(schemas.getCountriesSchema),
                      CountriesController.getCountries  );


module.exports = router;