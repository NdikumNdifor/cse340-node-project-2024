const express = require("express")
const router = new express.Router()
const finalController = require("../controllers/finalController")
const utilities = require("../utilities/")

// Router getting type by category
router.get("/types/:category_id", utilities.handleErrors(finalController.buildByTypeId))

// Router for getting product
router.get("/items/:type_id", utilities.handleErrors(finalController.buildProductGrid))

// Router for getting product details
router.get("/details/:product_id", utilities.handleErrors(finalController.buildByProductId) )

module.exports = router