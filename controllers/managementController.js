const utilities = require("../utilities/")

async function buildManagement(req, res){
  const nav = await utilities.getNav()
  // req.flash("notice", "This is a flash message.")
  res.render("inventory/management", {
    title: "Vehicle Management", 
    nav,
 })
}

module.exports = {buildManagement}