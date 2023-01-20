// -- TODO --
//  1. create account function
//  2. login function
//  3. logout function
//  4. update pfp function
//  5. update bio function
//  6. update display name function
//  6. update settings functions



// import client object 
const user = require ('../objects/user.js');

const userDAO = require ('../db/userDAO.js');
const { response } = require('express');


// hashing library and function
const bcrypt = require("bcryptjs");
function hashPassword(password) {
    //set the complexity of the salt generation
    const saltRounds = 10;
    //generate random salt (to be added to the password to generate random hash)
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) {
            throw err;
        } else {
            //hash the password using the generated salt
            bcrypt.hash(pass, salt, function(err, hash) {
                if (err) {
                    throw err;
                } else {
                    //console.log(`hash -> ${hash}`);
                    //return the computed hash
                    return hash;
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

    // check if email already exists in DB
    if(userDAO.emailExists(req.body.email)){
        res.render("signup", {emailError: true, message: "This email is already linked to a Scrapmap account. <a href='/login'> Log-in here! </a>"});
    }

    // check if username is already taken
    if(userDAO.usernameExists(req.body.username)){
        res.render("signup", {usernameError: true, message: "This username is already taken."});
    }

    // hash password
    let hash = hashPassword(req.body.pw1);

    // DAO request 

    

}


function login(){


    
}


// export member functions for use elsewhere
module.exports = {

    createAccount

}