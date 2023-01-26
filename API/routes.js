console.log("OPENING ROUTER");

//require ('../entities/client.js');
const express = require("express");
const userServices = require("../services/userServices");
const postServices = require("../services/postServices");

//define a router and create routes
const router = express.Router();


//route for signups & login
router.post("/API/signup", userServices.createAccount);
router.post("/API/login", userServices.login);

// route to get & create a post
router.get("/API/post/:ID", function(req, res){
    postServices.getPostByID(req.params.ID);
});

router.post("/API/upload", postServices.createPost());


console.log("EXPORTING ROUTER");
//export router
module.exports = router;