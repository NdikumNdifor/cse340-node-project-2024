const itemDetailsModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const itemDetailsCont = {}

itemDetailsCont.buildByItemId = async function (req, res, next){
    const inv_id = req.params.inventoryId
    const data = await itemDetailsModel.displayItemDetailsByItemId(inv_id)
    console.log(data)
    const itemDetailsTemplate = await utilities.builItemDetails(data[0])
    const nav = await utilities.getNav()
    const className = data[0].inv_make +' '+data[0].inv_model
    res.render("./inventory/details", {
        title: className,
        nav,
        itemDetailsTemplate
    })
}

module.exports = itemDetailsCont