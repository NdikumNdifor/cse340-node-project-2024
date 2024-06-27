const utilities = require("../utilities/")
// const addClassificationModel = require("../addClassification")

async function buildManagement(req, res){
  let nav = await utilities.getNav()
  // req.flash("notice", "This is a flash message.")
  res.render("inventory/management", {
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
 })
}

// Buid the classification form for Entering
// new classification into the database
/* ****************************************
*  Process classification entery
* *************************************** */
// async function AddNewClassification(req, res) {
//     let nav = await utilities.getNav()
//     const {classification_name} = req.body
  
//     const regResult = await addClassificationModel.AddClassification(
//       classification_name,

//     )
  
//     if (regResult) {
//       req.flash(
//         "notice",
//         `You have successfuly entered ${classification_name} as a classification.`
//       )
//       res.status(201).render("inventory/management", {
//         title: "Add New Classificatio",
//         nav,
//       })
//     } else {
//       req.flash("notice", "Sorry, the operation failed.")
//       res.status(501).render("inventory/add-classification", {
//         title: "Registration",
//         nav,
//       })
//     }
//   }


module.exports = {buildManagement, buildClassificationForm}