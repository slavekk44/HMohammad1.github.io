const express = require("express");
var bodyParser = require("body-parser");
const session = require("express-session");
//creating app
const app = express();

const {config} = require('dotenv');




// get environment
config({path: `.env.${process.env.NODE_ENV}`});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// setup session to track user details
app.use(
  session({
    secret: "f00bar",
    user: false,
    maxAge: 60 * 1000 * 60 * 24, //24HRS
    saveUninitialized: true,
    resave: true
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

app.get("/application", (req, res) => {
    res.render("application");
});

app.get("/addPost", (req, res) => {
    res.render("addPost");
});


//dynamic routing for public files
app.use(express.static(__dirname + "/public"));


const router = require("./API/routes.js");
app.use(router);

// server global
var server;

// try to assign port value
const port = process.argv[2] || process.env.APP_PORT || 3000;

// start listening at env port
function startServer(){
  //make the app listen on port
  server = app.listen(port, () => {
    console.log(`Scrapmap listening @ http://localhost:${port}`);
  });
}

// kills currently running server
function killServer(){
  server.close(() =>{
    console.log(`Scrapmap no longer listening @ http://localhost:${port}`);
  });
}

startServer();

// export functions for use elsewhere
module.exports = {
  startServer,
  killServer
}