const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
// add a require statement to bring the account-validation page into scoppe
const regValidate = require('../utilities/account-validation')

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));
module.exports = router;

// Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister));
module.exports = router;

//Routes for registration processing
router.post("/register",
regValidate.registationRules(),
regValidate.checkRegData,
utilities.handleErrors(accountController.registerAccount))
module.exports = router