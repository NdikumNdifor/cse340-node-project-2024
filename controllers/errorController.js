const utilities = require("../utilities/")
// const erroCont = {}

// erroCont.createIntentionalError = async function (req, res, next){
//     const nav = await utilities.getNav()
//     res.render("./errors/triggeredError", {
//         title: "500 Error",
//         nav, 
//     })
// }

async function createIntentionalError(req, res, next){
    const nav = await utilities.getNav()
    next(new Error("Intentional Error for Testing"));
    // res.render("./errors/triggeredError", {
    //     // title: "500 Error",
    //     nav, 
    // })
}

module.exports = {createIntentionalError}