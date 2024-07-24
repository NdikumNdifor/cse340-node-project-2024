const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");
const invCont = {};
/* ***************************
 * Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  let finalNav = await utilities.getCategoryNavigation()
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    finalNav,
    grid,
  });
};

invCont.buildManagement = async function (req, res) {
  let nav = await utilities.getNav();
  let finalNav = await utilities.getCategoryNavigation()
  // Call a function and store the results that will create
  // a select list to be displayed in the inventory management view.
  const classificationSelect = await utilities.buildClassificationList();
  res.render("inventory/inv", {
    title: "Vehicle Management",
    nav,
    finalNav,
    classificationSelect,
  });
};

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id);
  console.log(classification_id);
  const invData = await invModel.getInventoryByClassificationId(
    classification_id
  );
  console.log(invData);
  if (invData[0].inv_id) {
    return res.json(invData);
  } else {
    next(new Error("No data returned"));
  }
};

// /* ***************************
//  *  Build edit inventory view
//  * ************************** */
invCont.buildEditClassificationListItemsByIdView = async function (
  req,
  res,
  next
) {
  const inv_id = parseInt(req.params.inv_id);
  let nav = await utilities.getNav();
  let finalNav = await utilities.getCategoryNavigation()
  const itemData = await invModel.displayItemDetailsByItemId(inv_id);
  console.log(itemData);
  const classificationSelect = await utilities.buildClassificationList(
    itemData.classification_id
  );
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`;
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    finalNav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id,
  });
};

// /* ***************************
//  *  Update Inventory Data
//  * ************************** */
// invCont.updateInventory = async function (req, res, next) {
//   let nav = await utilities.getNav();
//   let finalNav = await utilities.getCategoryNavigation()
//   const {
//     inv_id,
//     inv_make,
//     inv_model,
//     inv_description,
//     inv_image,
//     inv_thumbnail,
//     inv_price,
//     inv_year,
//     inv_miles,
//     inv_color,
//     classification_id,
//   } = req.body;
//   const updateResult = await invModel.updateInventory(
//     inv_id,
//     inv_make,
//     inv_model,
//     inv_description,
//     inv_image,
//     inv_thumbnail,
//     inv_price,
//     inv_year,
//     inv_miles,
//     inv_color,
//     classification_id
//   );

//   if (updateResult) {
//     const itemName = updateResult.inv_make + " " + updateResult.inv_model;
//     req.flash("notice", `The ${itemName} was successfully updated.`);
//     res.redirect("/inv/");
//   } else {
//     const classificationSelect = await utilities.buildClassificationList(
//       classification_id
//     );
//     const itemName = `${inv_make} ${inv_model}`;
//     req.flash("notice", "Sorry, the insert failed.");
//     res.status(501).render("inventory/edit-inventory", {
//       title: "Edit " + itemName,
//       nav,
//       finalNav,
//       classificationSelect: classificationSelect,
//       errors: null,
//       inv_id,
//       inv_make,
//       inv_model,
//       inv_year,
//       inv_description,
//       inv_image,
//       inv_thumbnail,
//       inv_price,
//       inv_miles,
//       inv_color,
//       classification_id,
//     });
//   }
// };

// /* ***************************
//  *  Build Delete Confirmation View For Item Deletion
//  * ************************** */
// invCont.buildDeleteConfirmationView = async function (req, res, next) {
//   const inv_id = parseInt(req.params.inv_id);
//   let nav = await utilities.getNav();
//   let finalNav = await utilities.getCategoryNavigation()
//   const itemData = await invModel.displayItemDetailsByItemId(inv_id);
//   // const classificationSelect = await utilities.buildClassificationList(itemData.classification_id) // Maybe be removed
//   const itemName = `${itemData.inv_make} ${itemData.inv_model}`;
//   res.render("./inventory/delete-confirm", {
//     title: "Delete " + itemName,
//     nav,
//     finalNav,
//     // classificationSelect: classificationSelect,
//     errors: null,
//     // inv_id: itemData.inv_id,
//     inv_make: itemData.inv_make,
//     inv_model: itemData.inv_model,
//     inv_year: itemData.inv_year,
//     // inv_description: itemData.inv_description,
//     // inv_image: itemData.inv_image,
//     // inv_thumbnail: itemData.inv_thumbnail,
//     inv_price: itemData.inv_price,
//     // inv_miles: itemData.inv_miles,
//     // inv_color: itemData.inv_color,
//     // classification_id: itemData.classification_id
//   });
// };

// /* ***************************
//  *  Delete Inventory Item
//  * ************************** */
// invCont.deleteItemProcessing = async function (req, res, next) {
//   let nav = await utilities.getNav();
//   let finalNav = await utilities.getCategoryNavigation()
//   const {
//     // inv_id,
//     inv_make,
//     inv_model,
//     inv_description,
//     inv_image,
//     inv_thumbnail,
//     inv_price,
//     inv_year,
//     inv_miles,
//     inv_color,
//     classification_id,
//   } = req.body;
//   const inv_id = parseInt(req.body.inv_id);
//   const updateResult = await invModel.deleteInventoryItem(inv_id);

//   if (updateResult) {
//     const itemName = updateResult.inv_make + " " + updateResult.inv_model;
//     req.flash("notice", `The ${itemName} was successfully deleted.`);
//     res.redirect("/inv/");
//   } else {
//     const classificationSelect = await utilities.buildClassificationList(
//       classification_id
//     );
//     const itemName = `${inv_make} ${inv_model}`;
//     req.flash("notice", "Sorry, the deletion failed.");
//     res.status(501).render("inventory/delete-confirm", {
//       title: "Edit " + itemName,
//       nav,
//       finalNav,
//       classificationSelect: classificationSelect,
//       errors: null,
//       inv_id,
//       inv_make,
//       inv_model,
//       inv_year,
//       inv_description,
//       inv_image,
//       inv_thumbnail,
//       inv_price,
//       inv_miles,
//       inv_color,
//       classification_id,
//     });
//   }
// };

module.exports = invCont;
