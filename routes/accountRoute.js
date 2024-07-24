const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const baseController = require("../controllers/baseController")
const utilities = require("../utilities/")
// add a require statement to bring the account-validation page into scoppe
const regValidate = require('../utilities/account-validation')
const { route } = require("./static")
const jwt = require("jsonwebtoken")


// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));
// module.exports = router;

// Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister));
// module.exports = router;

//Routes for registration processing
router.post("/register",
regValidate.registationRules(),
regValidate.checkRegData,
utilities.handleErrors(accountController.registerAccount))


// Process the login attempt
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
    // (req, res) => {
    //   res.status(200).send('login process')
    // }
  )

// After  successful login, this is the rout
// router.get("/account-managementView", utilities.checkLogin, utilities.handleErrors(accountController.buildManagementView))

// // Get view to change account information.
// router.get("/changeAccountInfo/:account_id", utilities.handleErrors(accountController.buildChangeAccountInfoView))

// // Update personal account informations
// router.post("/changeAccountInfo",
//   regValidate.changeAccountInfoRules(),
//   regValidate.checkAccountData, 
//   utilities.handleErrors(accountController.UpdatePersonalInfo))

// router.post("/changeAccountPassword",
//   regValidate.accountPasswordRules(),
//   regValidate.checkAccountPasswordData, 
//   utilities.handleErrors(accountController.updateAccountPassword))

// router.get('/logout', (req, res) => {
//   res.clearCookie('jwt');
//   res.redirect('/');
//   req.flash('notice', 'You have logged out successfully');
// });
  

module.exports = router