/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/

/******** Adding seesions and acces to the database ************/
const session = require("express-session")
const pool = require('./database/')
/************ Below is for express and others ***********/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const itemDetailsRoute = require("./routes/itemDetailsRoute")
const accountRoute = require("./routes/accountRoute")
const managementRoute = require("./routes/managementRoute")
const intentionalErrorRoute = require("./routes/intentionalErrorRoute")
const finalProjectRoute = require("./routes/finalRoute")
const utilities = require("./utilities/")
// Calling body parser into scope
const bodyParser = require("body-parser")
// end
//Calling the cookie parser to bring it to scope
const cookieParser = require("cookie-parser")
const app = express()
const static = require("./routes/static")


/* ***********************
 * Middleware for express sessions
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))

// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// will allow the cookie parser to be
// implemented throughout the project.
app.use(cookieParser())

// JWT mildware
app.use(utilities.checkJWTToken)


/* ***********************
 * View Engine and Template
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Routes
 *************************/
app.use(static)

/****************** 
*  Gets and renders the index page at the root of the folder
*********************/
app.get("/", utilities.handleErrors(baseController.buildHome)
)

// Inventory routes
app.use("/inv", inventoryRoute)

// inv.ejs routes
app.use("/", inventoryRoute)


// Item details routes
app.use("/inv", itemDetailsRoute)

// Error routes
app.use("/errors", intentionalErrorRoute)

// Account's routes
app.use("/account", accountRoute)

// Account after succesful login
// app.use("/account", accountRoute)

// Management routes
app.use("/", managementRoute)

// Final Project Routes
app.use("/product", finalProjectRoute)

// inventory/inv.ejs management route
// inv.ejs routes
app.use("/inventory", inventoryRoute)

app.use("/final", finalProjectRoute)



// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
 })

// JWT mildware
app.use(utilities.checkJWTToken)

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  let finalNav = await utilities.getCategoryNavigation()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav,
    finalNav
  })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})