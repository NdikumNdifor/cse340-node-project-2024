const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/addInventory-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Routes to management view
router.get("/inv", utilities.handleErrors(invController.buildManagement));

// Route, that works with the URL in the JavaScript file "inventory.js" built
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Route that matches the path and 
// parameter to the end of the route to represent
// the inventory_id value that will be passed in through the URL
router.get("/edit/:inv_id", utilities.checkIfAdminOrEmployee, utilities.handleErrors(invController.buildEditClassificationListItemsByIdView))

// Route for update view.
router.post("/update/",  
    regValidate.addUpdateRules(),
    regValidate.checkUpdateData,
    utilities.checkIfAdminOrEmployee, 
    utilities.handleErrors(invController.updateInventory))

// Route for delete action.
router.get("/delete/:inv_id", utilities.checkIfAdminOrEmployee, utilities.handleErrors(invController.buildDeleteConfirmationView))

// Route for processing delete option.
router.post("/delete/",  // No need for validation rules here, we are just retrieving and deleting data.
    utilities.checkIfAdminOrEmployee,
    utilities.handleErrors(invController.deleteItemProcessing))

module.exports = router;