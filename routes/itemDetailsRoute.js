const express = require("express")
const router = new express.Router()
const itemDetailsController = require("../controllers/itemDetailsController")
const utilities = require("../utilities/")

router.get("/detail/:inventoryId", utilities.handleErrors(itemDetailsController.buildByItemId));

module.exports = router;