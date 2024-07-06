const express = require("express")
const router = new express.Router()
const createError = require("../controllers/errorController")
const utilities = require("../utilities/")

// Intentional errror routes
router.get("/triggeredError", utilities.handleErrors(createError.createIntentionalError))
module.exports = router