const utilities = require("../utilities/")
const addClassificationModel = require("../models/management-model")
const insertInventoryModel = require("../models/management-model")



// async function buildManagement(req, res){
//   let nav = await utilities.getNav()
//   res.render("inventory/inv", {
//     title: "Vehicle Management", 
//     nav,
//  })
// }

// Buid the classification form for receiving new classification
async function buildClassificationForm(req, res){
  let nav = await utilities.getNav()
  let finalNav = await utilities.getCategoryNavigation()
  // req.flash("notice", "This is a flash message.")
  res.render("inventory/add-classification", {
    title: "Add Classification", 
    nav,
    finalNav,
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
      let finalNav = await utilities.getCategoryNavigation()

      res.status(201).render("inventory/inv", {
        title: "Manage Classification",
        nav,
        finalNav
      })
    } else {
      req.flash("notice", "Sorry, the operation failed.")
      res.status(501).render("inventory/add-classification", {
        title: "Add New Classification",
        nav,
        finalNav
      })
    }
  }


/* ****************************************
* Section for building inventory form
* *************************************** */
async function buildInventoryForm(req, res, next) {
  const selectList = await utilities.buildClassificationList()
  let nav = await utilities.getNav()
  let finalNav = await utilities.getCategoryNavigation()
  // const registerForm = utilities.buildRegistrationForm()
  res.render("inventory/add-inventory", {
    title: "Add New Inventory",
    nav,
    finalNav,
    selectList,
    errors: null,
  })
}
  
  
  /* ****************************************
  *  Process Registration
  * *************************************** */
  async function insertInventory(req, res) {
    let nav = await utilities.getNav()
    let finalNav = await utilities.getCategoryNavigation()
    const {inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id  } = req.body
    const inv_image_decoded = decodeURI(inv_image)
    const inv_image_thumbnail = decodeURI(inv_thumbnail)
    const regResult = await insertInventoryModel.insertInventory(
        inv_make, 
        inv_model, 
        inv_year, 
        inv_description, 
        inv_image_decoded, 
        inv_image_thumbnail, 
        inv_price, 
        inv_miles, 
        inv_color, 
        classification_id
    )
  
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations, you successfully added ${inv_make} to the inventory.`
      )
      res.status(201).render("inventory/inv", {
        title: "Manage Inventory",
        nav,
        finalNav
      })
    } else {
      req.flash("notice", `Sorry, there was an error in adding ${inv_make}, please try again.`)
      res.status(501).render("inventory/add-inventory", {
        title: "Add New Inventory",
        nav,
        finalNav
      })
    }
  }
    

module.exports = {buildClassificationForm,addNewClassification, buildInventoryForm, insertInventory}