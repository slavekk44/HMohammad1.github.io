// -- TODO --
//  1. create account function
//  2. login function
//  3. logout function
//  4. update pfp function
//  5. update bio function
//  6. update display name function
//  6. update settings functions



// import user + profile objects
const User = require ('../objects/user.js');
const Profile = require ('../objects/profile.js');

const userDAO = require ('../DAOs/userDAO.js');
const { response } = require('express');


// hashing library and function
const bcrypt = require("bcryptjs");
function hashPassword(password, callback) {
    //set the complexity of the salt generation
    const saltRounds = 10;
    //generate random salt (to be added to the password to generate random hash)
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) {
            throw err;
        } else {
            //hash the password using the generated salt
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    throw err;
                } else {
                    //return the computed hash
                    callback(err, hash);
                }
            });
        }
    });
}


const createAccount = (req, res) => {

    // check passwords match
    if (req.body.pw1 != req.body.pw2){
        res.render("signup", {passwordError: true, message: "Passwords do not match"});
    }


    try{
        // check if email already exists in DB
        if(userDAO.emailExists(req.body.email)){
            res.render("signup", {emailError: true, message: "This email is already linked to a Scrapmap account. <a href='/login'> Log-in here! </a>"});
        }


        // check if username is already taken
        if(userDAO.usernameExists(req.body.username)){
            res.render("signup", {usernameError: true, message: "This username is already taken."});
        }

        // hash password -- callback prevents async errors
        hashPassword(req.body.pw1, function(err, hash){

            if(!err){
                // generate a random userID
                var userID; 
                do{
                    userID = Math.floor(Math.random() * 2147483646);
 
                } while(userDAO.userIDexists(userID));
                
                // inputs validated so start inserts
                if(userDAO.insertLogin(userID, req.body.username, req.body.email, hash)){
                    if( userDAO.insertProfile(userID, req.body.disp_name, req.body.fname, req.body.lname)){
                        userDAO.insertPFP(userID);
                    }
                }
               
                // retrive full user data from server
                user = getUserByID(userID);

                res.send(JSON.stringify(user));
            }
            else{
                throw err;
            }
        });
    }
    catch(err){
        console.log(err);
        res.render("signup", {serverError: true, message: "Oops something went wrong. Please try again later."});
    }

}

// returns a populated user object complete with profile -- if just a profile is needed user getProfile functions
function getUserByID(userID){


    try{
        // fetch row from DB
        data = userDAO.getUserByID(userID);
        // create profile
        var profile = new Profile(data.display, data.fname, data.lname, data.pfp, data.colour);
        // create user object
        var user = new User(userID, data.username, data.email, profile);
        return user;
    }
    catch{
        return false;
    }



}


function login(){


    
}


// export member functions for use elsewhere
module.exports = {

    createAccount

}