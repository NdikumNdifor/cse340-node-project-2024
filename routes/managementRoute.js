const express = require("express")
const router = new express.Router()
const managementController = require("../controllers/managementController")
// const addClassificationController = require("../controllers/buildClassificationForm")
const utilities = require("../utilities/")

// Routes to management view
router.get("/management", utilities.handleErrors(managementController.buildManagement));
module.exports = router;

// Routes to Add classification view
router.get("/inventory/add-classification", utilities.handleErrors(managementController.buildClassificationForm));
module.exports = router;
