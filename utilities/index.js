const invModel = require("../models/inventory-model")
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
  details += `<div id="mileage-container"><span class="para">MILEAGE</span><span class="format">${new Intl.NumberFormat('en-US').format(data.inv_miles)}</span></p></div>`
  details += `<h3 id="heading">Sale Price</h3>`
  details += `<h3 id="heading">${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.inv_price)}</h3>`
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

/* **************************************
* Build the Login view HTML
* ************************************ */
 Util.buildLoginForm = function(){
  return `
    <div class="form-container">
      <form>
          <label for="email">Email:</label>
          <input type="email" id="email" name="account_email" required>
          <br>
          <label for="password">Password:</label>
          <input type="password" id="password" name="account_password" required>
          <br>
          <button type="submit">Login</button>
      </form>
      <p>No account?<a href="/account/register">Sign-up</a>
    </div>`
 }

/* **************************************
* Build the Register view HTML
* ************************************ */
 Util.buildRegistrationForm = function() {
  return `
    <div id="registerForm">
        <form>
            <label for="first-name">First Name</label>
            <input type="text" id="first-name" name="account_firstName" required>
            <br>
            <label for="last-name">Last Name</label>
            <input type="text" id="last-name" name="account_lastName" required>
            <br>
            <label for="email">Email</label>
            <input type="email" id="email" name="account_email" required>
            <br>
            <label for="password">Password</label>
            <input type="password" id="password" name="account_password" required>
            <br>
            <button type="submit">Register</button>
        </form>
    </div>`;
};

 /* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
 
module.exports = Util