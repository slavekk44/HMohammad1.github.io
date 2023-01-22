console.log("OPENING ROUTER");

//require ('../entities/client.js');
const express = require("express");
const userServices = require("../services/userServices");

//define a router and create routes
const router = express.Router();


//route for signups
router.post("/API/signup", userServices.createAccount);

router.post("/API/login", userServices.login);


console.log("EXPORTING ROUTER");
//export router
module.exports = router;