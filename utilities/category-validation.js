const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  const validate = {}

  /*  **********************************
  *  Category Data Validation Rules
  * ********************************* */
  validate.addCategoryRules = () => {
    return [
      // Category name is required and must be string
      body("category_name")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a category with atleast 3 characters.") // on error this message is sent.
    ]
  }


  /* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkCategoryData = async (req, res, next) => {
    const {category_name} = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      let finalNav = await utilities.getCategoryNavigation()
      res.render("final/category", {
        errors,
        title: "Add Category",
        category_name,
        nav,
        finalNav
      })
      return
    }
    next()
  }
  
  module.exports = validate