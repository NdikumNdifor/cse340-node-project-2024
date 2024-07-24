const utilities = require("../utilities/");
const accountModel = require("../models/account-model");
// Requiring bcrypts for password hashing
const bcrypt = require("bcryptjs");
// Requiring the "jsonwebtoken" and "dotenv" packages
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ****************************************
 *  Deliver login view
 * *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav();
  let finalNav = await utilities.getCategoryNavigation()
  // const loginForm = utilities.buildLoginForm()
  res.render("account/login", {
    title: "Login",
    nav,
    finalNav,
    errors: null,
  });
}

/* ****************************************
 *  Deliver Registration view
 * *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav();
  let finalNav = await utilities.getCategoryNavigation()
  // const registerForm = utilities.buildRegistrationForm()
  res.render("account/register", {
    title: "Register",
    nav,
    finalNav,
    errors: null,
  });
}

/* ****************************************
 *  Process Registration
 * *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav();
  let finalNav = await utilities.getCategoryNavigation()
  const {
    account_firstname,
    account_lastname,
    account_email,
    account_password,
  } = req.body;

  // Hash the password before storing
  let hashedPassword;
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10);
  } catch (error) {
    req.flash(
      "notice",
      "Sorry, there was an error processing the registration."
    );
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      finalNav,
      errors: null,
    });
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  );

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    );
    res.status(201).render("account/login", {
      title: "Login",
      errors: null,
      finalNav,
      nav,
    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("account/register", {
      title: "Registration",
      errors: null,
      finalNav,
      nav,
    });
  }
}

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav();
  let finalNav = await utilities.getCategoryNavigation()
  const { account_email, account_password } = req.body;
  const accountData = await accountModel.getAccountByEmail(account_email);
  console.log(accountData);
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.");
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      finalNav,
      errors: null,
      account_email,
    });
    return;
  }
  try {
    console.log("Starting password check." + account_password);
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      console.log("Password Check Completed.");
      delete accountData.account_password;
      const accessToken = jwt.sign(
        accountData,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 3600 }
      );
      if (process.env.NODE_ENV === "development") {
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 });
      } else {
        res.cookie("jwt", accessToken, {
          httpOnly: true,
          secure: true,
          maxAge: 3600 * 1000,
        });
      }
      console.log("Redirecting to account.");
      return res.redirect("/account/account-managementView");  // I have changed the route from "/" to "/account-managementView" and also at the header partial.
    }
    else{
      req.flash("notice", "Please check your credentials and try again.");
      res.render("account/login", {
        errors: null,
        title: "Login",
        nav,
        finalNav,
        account_email,
      })
    }
  } catch (error) {
    return new Error("Access Forbidden");
  }
}

async function buildManagementView(req, res) {
  let nav = await utilities.getNav();
  let finalNav = await utilities.getCategoryNavigation()
  res.render("account/account-managementView", {
    title: "Manage Account",
    nav,
    finalNav,
    errors: null,
  });
}


// Retrieve account info from account table
// load into form for account information change.
async function buildChangeAccountInfoView( req, res, nex) {
  const account_id = parseInt(req.params.account_id);
  let nav = await utilities.getNav();
  let finalNav = await utilities.getCategoryNavigation()
  const itemData = await accountModel.getAccountById(account_id);
  console.log(itemData);

  const itemName = `${itemData.account_firstname} ${itemData.account_lastname}'s Information`;
  res.render("./account/changeAccountInfo", {
    title: "Change " + itemName,
    nav,
    finalNav,
    errors: null,
    account_id: itemData.account_id,
    account_firstname: itemData.account_firstname,
    account_lastname: itemData.account_lastname,
    account_email: itemData.account_email,
  });
}


/* ***************************
 *  Update Personal account Info
 * ************************** */
async function UpdatePersonalInfo (req, res, next) {
  let nav = await utilities.getNav();
  let finalNav = await utilities.getCategoryNavigation()
  const {
    account_firstname,
    account_lastname,
    account_email,
    account_id
  } = req.body;
  const updateResult = await accountModel.updateAccountInfo(
    account_firstname,
    account_lastname,
    account_email,
    account_id
  );

  if (updateResult) {
    const itemName = updateResult.account_firstname + " " + updateResult.account_lastname;
    req.flash("notice", `Congratulations, ${itemName} information was successfully updated.`);
    res.redirect("/account/account-managementView");
  } else {
    const itemName = `${account_firstname} ${account_lastname}`;
    req.flash("notice", "Sorry, the change failed.");
    res.status(501).render("account/changeAccountInfo", {
      title: "Change " + itemName,
      nav,
      finalNav,
      errors: null,
      account_firstname,
      account_lastname,
      account_email,
      account_id
      
    });
  }
};


// Account password change Processing
async function updateAccountPassword(req, res, next){
  let nav = await utilities.getNav();
  let finalNav = await utilities.getCategoryNavigation()
  const {
    account_password,
    account_id
  } = req.body;

  // Hash the password before storing
  let hashedPassword;
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10);
  } catch (error) {
    req.flash(
      "notice",
      "Sorry, there was an error processing the Password Change."
    );
    return res.status(500).render("account/changeAccountInfo", {
      title: "Password Change Error",
      nav,
      finalNav,
      errors: null,
    });
  }


  const updateResult = await accountModel.updateAccountPasswordInfo(
    hashedPassword,
    account_id
    
  );

  if (updateResult) {
    const itemName = updateResult.account_firstname + " " + updateResult.account_lastname;
    req.flash("notice", `Congratulation, the password for ${itemName} was successfully changed.`);
    res.redirect("/account/account-managementView/");
  } else {
    const itemName = `${updateResult.account_firstname} ${updateResult.account_lastname}`;
    req.flash("notice", "Sorry, the change failed.");
    res.status(501).render("account/changeAccountInfo", {
      title: "Change " + itemName,
      nav,
      finalNav,
      hashedPassword,
      account_id
      
    });
  }

}




module.exports = {
  buildLogin,
  buildRegister,
  registerAccount,
  accountLogin,
  buildManagementView,
  buildChangeAccountInfoView,
  UpdatePersonalInfo,
  updateAccountPassword
};

/* ***************************
 * Building the login controller function
 * ************************** */
// const accountCont = {}
// accountCont.buildLogin = async function(req, res, next){
//     let nav = await utilities.getNav()
//     res.render("account/login", {
//       title: "Login",
//       nav,
//     })
// }

// module.exports = accountCont
