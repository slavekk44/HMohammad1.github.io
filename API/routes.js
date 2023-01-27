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
router.get("/API/post/:ID", postServices.getPostByID);
router.post("/API/upload", postServices.createPost);

router.get("/API/sendRequest/:sendTo", userServices.sendFriendRequest);
router.post("/API/updateRequest", userServices.updateFriendRequest);
router.get("/API/getFriends", userServices.getFriendProfiles);


// comment functions
router.post("/API/addComment", postServices.addComment);
router.get("/API/postComments/:postID", postServices.getPostComments);

console.log("EXPORTING ROUTER");
//export router
module.exports = router;