const express = require("express")
const router = new express.Router()
const finalController = require("../controllers/finalController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/category-validation')

// Router getting type by category
router.get("/types/:category_id", utilities.handleErrors(finalController.buildByTypeId))

// Router for getting product
router.get("/items/:type_id", utilities.handleErrors(finalController.buildProductGrid))

// Router for getting product details
router.get("/details/:product_id", utilities.handleErrors(finalController.buildByProductId) )

// Router for getting category
router.get("/category", utilities.handleErrors(finalController.buildCategoryForm))

// Router for adding new category
router.post("/category",
    regValidate.addCategoryRules(),
    regValidate.checkCategoryData,
    utilities.handleErrors(finalController.addNewCategory))

module.exports = router