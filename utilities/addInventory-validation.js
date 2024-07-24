const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

  /*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
  validate.addInventoryRules = () => {
    return [
      // Classification name is required and must be string
      body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide an inv_make."), // on error this message is sent.

      body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide an inv_model."), // on error this message is sent.

        body("inv_year")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide an inv_year."), // on error this message is sent.

        body("inv_description")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide an inv_description."), // on error this message is sent.

        body("inv_image")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide an inv_image."), // on error this message is sent.

        body("inv_thumbnail")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide an inv_thumbnail."), // on error this message is sent.

        body("inv_price")
        .trim()
        .notEmpty()
        .isFloat({ min: 0 })
        .toFloat()
        .withMessage("Please provide a valid inv_price."), // on error this message is sent.

        body("inv_miles")
        .trim()
        .notEmpty()
        .isInt()
        .toInt()
        .withMessage("Please provide a valid inv_miles."), // on error this message is sent.

        body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide an inv_color."), // on error this message is sent.

        body("classification_id")
        .trim()
        .notEmpty()
        .isInt({ min: 1 })
        .toInt()
        .withMessage("Please provide a valid classification_id.")  // on error this message is sent
    ]
  }


  /* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
    const {inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id} = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      let finalNav = await utilities.getCategoryNavigation()
      res.render("inventory/add-inventory", {
        errors,
        title: "Add Inventory",
        nav,
        finalNav,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        classification_id
      })
      return
    }
    next()
  }


  /*  **********************************
  *  Update Data Validation Rules
  * ********************************* */
  validate.addUpdateRules = () => {
    return [
      // Classification name is required and must be string
      body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide an inv_make."), // on error this message is sent.

      body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide an inv_model."), // on error this message is sent.

        body("inv_year")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide an inv_year."), // on error this message is sent.

        body("inv_description")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide an inv_description."), // on error this message is sent.

        body("inv_image")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide an inv_image."), // on error this message is sent.

        body("inv_thumbnail")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide an inv_thumbnail."), // on error this message is sent.

        body("inv_price")
        .trim()
        .notEmpty()
        .isFloat({ min: 0 })
        .toFloat()
        .withMessage("Please provide a valid inv_price."), // on error this message is sent.

        body("inv_miles")
        .trim()
        .notEmpty()
        .isInt()
        .toInt()
        .withMessage("Please provide a valid inv_miles."), // on error this message is sent.

        body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide an inv_color."), // on error this message is sent.

        body("classification_id")
        .trim()
        .notEmpty()
        .isInt({ min: 1 })
        .toInt()
        .withMessage("Please provide a valid classification_id."),  // on error this message is sent

        body("inv_id")
        .trim()
        .notEmpty()
        .isInt({ min: 1 })
        .toInt()
        .withMessage("Please provide a valid classification_id.")  // on error this message is sent
    ]
  }



  /* ******************************
 * Check data and return errors or continue to edit view
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
  const {inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id, inv_id} = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let finalNav = await utilities.getCategoryNavigation()
    res.render("inventory/edit-inventory", {
      errors,
      title: `Edit ${inv_make} ${inv_model}`,
      nav,
      finalNav,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
      inv_id
    })
    return
  }
  next()
}

  
module.exports = validate