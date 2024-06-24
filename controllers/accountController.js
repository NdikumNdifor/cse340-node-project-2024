const utilities = require("../utilities/")


/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    const loginForm = utilities.buildLoginForm()
    res.render("account/login", {
      title: "Login",
      nav,
      loginForm
    })
  }
  
  module.exports = { buildLogin }







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