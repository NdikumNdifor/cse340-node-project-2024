const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  const validate = {}

  /*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
  validate.addClassificationRules = () => {
    return [
      // Classification name is required and must be string
      body("classification_name")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a classification with atleast 3 characters.") // on error this message is sent.
    ]
  }


  /* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
    const {classification_name} = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      let finalNav = await utilities.getCategoryNavigation()
      res.render("inventory/add-classification", {
        errors,
        title: "Add Classification",
        classification_name,
        nav,
        finalNav
      })
      return
    }
    next()
  }
  
  module.exports = validate