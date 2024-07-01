const express = require("express")
const router = new express.Router()
const managementController = require("../controllers/managementController")
// const addClassificationController = require("../controllers/buildClassificationForm")
const utilities = require("../utilities/")
const regValidate = require("../utilities/addClassification-validation")

// Routes to management view
router.get("/management", utilities.handleErrors(managementController.buildManagement));
// module.exports = router;

// Routes to Add classification view
router.get("/inventory/add-classification", utilities.handleErrors(managementController.buildClassificationForm));
// module.exports = router;

// Routes for "Add Classification" processing
router.post("/inventory/add-classification",
    regValidate.addClassificationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(managementController.addNewClassification));


module.exports = router