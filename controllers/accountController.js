const utilities = require("../utilities/")


/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    // const loginForm = utilities.buildLoginForm()
    res.render("account/login", {
      title: "Login",
      nav
      // loginForm
    })
  }

  /* ****************************************
*  Deliver Registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  // const registerForm = utilities.buildRegistrationForm()
  res.render("account/register", {
    title: "Register",
    nav
    // registerForm
  })
}
  
  module.exports = { buildLogin, buildRegister }







/* ***************************
 * Building the login controller function
 * ************************** */
// const accountCont = {}
// accountCont.buildLogin = async function(req, res, next){
//     let nav = await utilities.getNav()
//     res.render("account/login", {
//       title: "Login",
//       nav,
//     }) 
// }

// module.exports = accountCont