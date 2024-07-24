const invModel = require("../models/inventory-model")
const finalModel = require("../models/final-model")
// Requiring needed packages
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list += '<a href="/inv/type/' + row.classification_id +'" title="See our inventory of ' +row.classification_name +' vehicles">' +row.classification_name + "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
  grid = '<ul id="inv-display">'
  data.forEach(vehicle => {
  grid += '<li>'
  grid += '<a href="../../inv/detail/'+ vehicle.inv_id 
  + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
  + 'details"><img src="' + vehicle.inv_thumbnail 
  +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
  +' on CSE Motors" /></a>'
  grid += '<div class="namePrice">'
  grid += '<hr />'
  grid += '<h2>'
  grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View '
  + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
  + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
  grid += '</h2>'
  grid += '<span>$'
  + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
  grid += '</div>'
  grid += '</li>'
  })
  grid += '</ul>'
  } else {
  grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
 }


 /* **************************************
* Build the Details view HTML
* ************************************ */
 Util.builItemDetails = async function(data){
  let details
  details = `<div id="detail-grid">`

  details += `<div id="img-container">`
  details += `<img src="${data.inv_image}" alt="${data.inv_make} car">`
  details += `</div>`

  details += `<div id="h2-container">`
  details += `<h2 id="heading">${data.inv_year} ${data.inv_make} ${data.inv_model}</h2>`
  details += `</div>`

  details += `<div id="prominent">`
  details += `<div id="mileage-container"><span class="para">MILEAGE</span><span class="format">${new Intl.NumberFormat('en-US').format(data.inv_miles)}</span></div>`
  details += `<h3>Sale Price</h3>`
  details += `<h3>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.inv_price)}</h3>`
  details += `</div>`
  

  details += `<div id="car-details">`
  details += `<p class="details"><span class="para">Make</span>: <span class="format">${data.inv_make}</span></p>`
  details += `<p class="details"><span class="para">Model</span>: <span class="format">${data.inv_model}</span></p>`
  details += `<p class="details"><span class="para">Year</span>: <span class="format">${data.inv_year}</span></p>`
  details += `<p class="details"><span class="para">Price</span>: <span class="format">${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.inv_price)}</span></p>`
  details += `<p class="details"><span class="para">Mileage</span>: <span class="format">${new Intl.NumberFormat('en-US').format(data.inv_miles)}</span></p>`
  details += `<p class="details"><span class="para">Color</span>: <span class="format">${data.inv_color}</span></p>`
  details += `</div>`
  
  details += `</div>`
  
  return details 
 }


 // For classification ID selection
 Util.buildClassificationList = async function (classification_id = null) {
    let data = await invModel.getClassifications()
    let classificationList =
      '<select name="classification_id" id="classificationList" required>'
    classificationList += "<option value=''>Choose a Classification</option>"
    data.rows.forEach((row) => {
      classificationList += '<option value="' + row.classification_id + '"'
      if (
        classification_id != null &&
        row.classification_id == classification_id
      ) {
        classificationList += " selected "
      }
      classificationList += ">" + row.classification_name + "</option>"
    })
    classificationList += "</select>"
    return classificationList
  }
 
 Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

 /* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
 }


 /* ****************************************
 *  Check Login (Authorization)
 * ************************************ */
 Util.checkLogin = (req, res, next) => {
  console.log("loggedin is", res.locals.loggedin)
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
 }

 
 



/* ****************************************
 *  FINAL PROJECT
 * ************************************ */

Util.getCategoryNavigation = async function () {
    let data = await finalModel.getCategory()
    let list = "<ul>"
    data.rows.forEach((row) => {
      list += `
        <li>
          <a href="/product/types/${row.category_id}" title="See our category ${row.category_name} vehicles">
            ${row.category_name}
          </a>
        </li>
      `
    });
    list += "</ul>"
    return list
  } 


Util.buildTypeGrid = async function(data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="type-display">';
    data.forEach(type => {
      grid += `
        <li>
          <a href="../../product/items/${type.type_id}" title="View ${type.type_name} details">
            <img src="${type.type_image}" alt="Image of ${type.type_name} on CSE Motors" />
          </a>
        </li>
      `;
    });
    grid += '</ul>';
  } else {
    grid = '<p class="notice">Sorry, no matching types could be found.</p>';
  }
  return grid;
}

Util.buildProductGrid = async function(data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach(product => {
      grid += `
        <li>
          <a href="../../product/details/${product.product_id}" title="View ${product.product_name}">
            <img src="${product.product_image}" alt="Image of ${product.product_name} on CSE Motors" />
          </a>
          <div class="namePrice">
            <hr />
            <h2>
              <a href="../../product/details/${product.product_id}" title="View ${product.product_name}">
                ${product.product_name} 
              </a>
            </h2>
            <span>$${new Intl.NumberFormat('en-US').format(product.product_price)}</span>
          </div>
        </li>
      `;
    });
    grid += '</ul>';
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
}


/* **************************************
* Build the Details view HTML For products
* ************************************ */
Util.buildProductDetails = async function(product){
  let details
  details = `<div id="detail-grid">`

  details += `<div id="img-container">`
  details += `<img src="${product.product_image}" alt="${product.product_name} car">`
  details += `</div>`

  details += `<div id="h2-container">`
  details += `<h2 id="heading">${product.product_name} ${product.product_model}</h2>`
  details += `</div>`

  details += `<div id="prod-details">`
  details += `<p class="details"><span class="para">Make</span>: <span class="format">${product.product_name}</span></p>`
  details += `<p class="details"><span class="para">Price</span>: <span class="format">${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.product_price)}</span></p>`
  details += `<p class="details"><span class="para">Year</span>: <span class="format">${product.product_description}</span></p>`
  details += `</div>`
  
  details += `</div>`
  
  return details 
 }


/* ****************************************
 *  Check Login (Authorization Middleware)
 * ************************************ */
Util.checkIfAdminOrEmployee = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET, (err, accountData) => {
      if (err) {
        req.flash("notice", "Please log in");
        res.clearCookie('jwt');
        console.log("Cookies doesn't exist!")
        return res.redirect('/account/login');
      }

      if (accountData.account_type === 'Employee' || accountData.account_type === 'Admin') {
        console.log("notice", "Successfuly Checked if Admin or Employee!")
        res.locals.accountData = accountData;
        next();
      } else {
        req.flash("notice", "You do not have permission to access this resource");
        console.log("This account can't acces this enviroment!")
        res.redirect('/account/login');
      }
    });
  } else {
    req.flash("notice", "Please log in");
    console.log("Sorry, I didn't find any cookies, you will have to log in !")
    res.redirect('/account/login');
  }
};

// Util.checkIfAdminOrEmployee = (req, res, next) => {
//   // Check if the JWT cookie exists
//   if (req.cookies.jwt) {
//     // Verify the JWT token
//     jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET, (err, accountData) => {
//       if (err) {
//         req.flash("Please log in");
//         res.clearCookie('jwt');
//         return res.redirect('/account/login');
//       }

//       // Check account type
//       if (accountData.account_type === 'Employee' || accountData.account_type === 'Admin') {
//         // Store account data in response locals
//         res.locals.accountData = accountData;
//         next();
//       } else {
//         req.flash("You do not have permission to access this resource");
//         res.redirect('/account/login');
//       }
//     });
//   } else {
//     req.flash("Please log in");
//     res.redirect('/account/login');
//   }
// };
// Util.checkIfAdminOrEmployee = (req, res, next) => {
//   const accountData = res.locals.accountData;
//   if (!accountData) {
//     req.flash("You must be logged in to view this page");
//     return res.redirect("/account/login");
//   }

//   const accountType = accountData.account_type
//   if (accountType === 'Admin' || accountType === 'Employee') {
//     return next();
//   }

//   req.flash("You do not have permission to view this page");
//   return res.redirect("/account/login");
// };


module.exports = Util