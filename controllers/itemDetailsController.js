const itemDetailsModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const itemDetailsCont = {}

itemDetailsCont.buildByItemId = async function (req, res, next){
    const inv_id = req.params.inventoryId
    const data = await itemDetailsModel.displayItemDetailsByItemId(inv_id)
    console.log(data)
    const itemDetailsTemplate = await utilities.builItemDetails(data)
    const nav = await utilities.getNav()
    let finalNav = await utilities.getCategoryNavigation()
    const className = data.inv_make +' '+data.inv_model
    res.render("./inventory/details", {
        title: className,
        nav,
        finalNav,
        itemDetailsTemplate
    })
}

module.exports = itemDetailsCont