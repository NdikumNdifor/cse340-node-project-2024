const utilities = require("../utilities/")
const addClassificationModel = require("../models/management-model")

async function buildManagement(req, res){
  let nav = await utilities.getNav()
  // req.flash("notice", "This is a flash message.")
  res.render("inventory/inv", {
    title: "Vehicle Management", 
    nav,
 })
}

// Buid the classification form for receiving new classification
async function buildClassificationForm(req, res){
  let nav = await utilities.getNav()
  // req.flash("notice", "This is a flash message.")
  res.render("inventory/add-classification", {
    title: "Add Classification", 
    nav,
    errors: null,
 })
}

// Buid the classification form for Entering
// new classification into the database
/* ****************************************
*  Process classification entery
* *************************************** */
async function addNewClassification(req, res) {
    // let nav = await utilities.getNav()
    const {classification_name} = req.body
  
    const regResult = await addClassificationModel.addClassification(classification_name)
  
    if (regResult) {
      req.flash(
        "notice",
        `You have successfuly entered ${classification_name} as a classification.`
      )

      // Refresh the nav data after successfully adding a classification
      let nav = await utilities.getNav();

      res.status(201).render("inventory/inv", {
        title: "Manage Classification",
        nav,
      })
    } else {
      req.flash("notice", "Sorry, the operation failed.")
      res.status(501).render("inventory/add-classification", {
        title: "Add New Classification",
        nav,
      })
    }
  }


module.exports = {buildManagement,buildClassificationForm,addNewClassification}