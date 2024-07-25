const finalModel = require("../models/final-model");
const utilities = require("../utilities/");
const invCont = {};

invCont.buildByTypeId = async function (req, res, next) {
  const category_id = req.params.category_id;
  const data = await finalModel.getTypeByCategoryId(category_id);
  let typeGrid = await utilities.buildTypeGrid(data);
  let nav = await utilities.getNav();
  let finalNav = await utilities.getCategoryNavigation();
  // const className = data[0].type_name
  res.render("./final/typeView", {
    title: "Electronic Types",
    nav,
    finalNav,
    typeGrid,
  });
};

invCont.buildProductGrid = async function (req, res, next) {
  const type_id = req.params.type_id;
  const data = await finalModel.getProductByTypeId(type_id);
  let productGrid = await utilities.buildProductGrid(data);
  let nav = await utilities.getNav();
  let finalNav = await utilities.getCategoryNavigation();
  const className = data[0].product_name;
  res.render("./final/productView", {
    title: className,
    nav,
    finalNav,
    productGrid,
  });
};

invCont.buildByProductId = async function (req, res, next) {
  const product_id = req.params.product_id;
  const data = await finalModel.getProductByProductId(product_id);
  console.log(data);
  const productDetails = await utilities.buildProductDetails(data[0]);
  const nav = await utilities.getNav();
  let finalNav = await utilities.getCategoryNavigation();
  const className = data[0].product_name;
  res.render("./final/product-details", {
    title: className,
    nav,
    finalNav,
    productDetails,
  });
};

// Buid the category form for receiving new category
invCont.buildCategoryForm = async function (req, res) {
  let nav = await utilities.getNav();
  let finalNav = await utilities.getCategoryNavigation();
  // req.flash("notice", "This is a flash message.")
  res.render("final/category", {
    title: "Add Category",
    nav,
    finalNav,
    errors: null,
  });
};

// Buid the classification form for Entering
// new classification into the database
/* ****************************************
 *  Process category entery
 * *************************************** */
invCont.addNewCategory = async function (req, res) {
  // let nav = await utilities.getNav()
  const { category_name } = req.body;

  const regResult = await finalModel.addCategory(category_name);

  if (regResult) {
    req.flash(
      "notice",
      `You have successfuly entered ${category_name} as a category.`
    );

    // Refresh the nav data after successfully adding a classification and category
    let nav = await utilities.getNav();
    let finalNav = await utilities.getCategoryNavigation();

    let classificationSelect = await utilities.buildClassificationList();

    res.status(201).render("inventory/inv", {
      title: "Manage Category",
      nav,
      finalNav,
      classificationSelect,
    });
  } else {
    req.flash("notice", "Sorry, the operation failed.");
    res.status(501).render("final/category", {
      title: "Add New Category",
      nav,
      finalNav,
      classificationSelect
    });
  }
};

module.exports = invCont;
