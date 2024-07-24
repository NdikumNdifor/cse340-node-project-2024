const express = require("express")
const router = new express.Router()
const managementController = require("../controllers/managementController")
// const addClassificationController = require("../controllers/buildClassificationForm")
const utilities = require("../utilities/")
const regValidate = require("../utilities/addClassification-validation")
const regValidateInv = require("../utilities/addInventory-validation")

// Routes to management view
// router.get("/inv", utilities.handleErrors(managementController.buildManagement));
// module.exports = router;

// Routes to Add classification view
router.get("/inventory/add-classification", utilities.checkIfAdminOrEmployee, utilities.handleErrors(managementController.buildClassificationForm));
// module.exports = router;

// Routes for "Add Classification" processing
router.post("/inventory/add-classification",
    regValidate.addClassificationRules(),
    regValidate.checkRegData,
    utilities.checkIfAdminOrEmployee,
    utilities.handleErrors(managementController.addNewClassification));

// Routes to Add inventory view
router.get("/inventory/add-inventory", utilities.checkIfAdminOrEmployee, utilities.handleErrors(managementController.buildInventoryForm));

// Routes for "Add Inventory" processing
router.post("/inventory/add-inventory",
    regValidateInv.addInventoryRules(),
    regValidateInv.checkInventoryData,
    // Controls access to only let in Admin or Employees
    utilities.checkIfAdminOrEmployee,
    utilities.handleErrors(managementController.insertInventory));


module.exports = router