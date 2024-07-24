const finalModel = require("../models/final-model")
const utilities = require("../utilities/")
const invCont = {}

invCont.buildByTypeId = async function (req, res, next) {
    const category_id = req.params.category_id
    const data = await finalModel.getTypeByCategoryId(category_id)
    let typeGrid = await utilities.buildTypeGrid(data)
    let nav = await utilities.getNav()
    let finalNav = await utilities.getCategoryNavigation()
    // const className = data[0].type_name
    res.render("./final/typeView", {
    title: "Electronic Types",
    nav,
    finalNav,
    typeGrid,
    })
}


invCont.buildProductGrid = async function (req, res, next) {
    const type_id = req.params.type_id
    const data = await finalModel.getProductByTypeId(type_id)
    let productGrid = await utilities.buildProductGrid(data)
    let nav = await utilities.getNav()
    let finalNav = await utilities.getCategoryNavigation()
    const className = data[0].product_name
    res.render("./final/productView", {
    title: className,
    nav,
    finalNav,
    productGrid,
    })
}

invCont.buildByProductId = async function (req, res, next){
    const product_id = req.params.product_id
    const data = await finalModel.getProductByProductId(product_id)
    console.log(data)
    const productDetails = await utilities.buildProductDetails(data[0])
    const nav = await utilities.getNav()
    let finalNav = await utilities.getCategoryNavigation()
    const className = data[0].product_name 
    res.render("./final/product-details", {
        title: className,
        nav,
        finalNav,
        productDetails
    })
}


module.exports = invCont

