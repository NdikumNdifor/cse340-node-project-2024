const utilities = require("../utilities/")

async function createIntentionalError(req, res, next){
    const nav = await utilities.getNav()
    let finalNav = await utilities.getCategoryNavigation()
    next(new Error("Intentional Error for Testing"));
    res.render("./error/triggeredError", {
        title: "500 Error",
        nav,
        finalNav 
    })
}

module.exports = {createIntentionalError}