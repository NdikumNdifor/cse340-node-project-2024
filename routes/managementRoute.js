const express = require("express")
const router = new express.Router()
const managementController = require("../controllers/managementController")
const utilities = require("../utilities/")

router.get("/management", utilities.handleErrors(managementController.buildManagement));

module.exports = router;