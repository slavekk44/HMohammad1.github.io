const express = require("express");
var bodyParser = require("body-parser");
const session = require("cookie-session");
//creating app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// setup session to track user details
app.use(
  session({
    secret: "f00bar",
    user: "TESTING",
    maxAge: 60 * 1000 * 60 * 24 //24HRS
  })
);

//handling static HTML and EJS templates
//app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index"); //no need for ejs extension
});

//route for login
app.get("/login", (req, res) => {
  res.render("login");
});

//route for signup
app.get("/signup", (req, res) => {
    res.render("signup");
});

const router = require("./API/routes.js");
// router.get("/view", clientController.fetchAllClients);
app.use(router);

//make the app listen on port
const port = process.argv[2] || process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Scrapmap listening at http://localhost:${port}`);
});