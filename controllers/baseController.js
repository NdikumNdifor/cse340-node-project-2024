const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  let nav = await utilities.getNav()
  let finalNav = await utilities.getCategoryNavigation()
  // req.flash("notice", "This is a flash message.")
  res.render("index", {
    title: "Home",
    nav,
    finalNav
  })
}

module.exports = baseController