const { query } = require("express");
const DB = require("./queryHandler");



// take user details and insert them  
const registerUser = () =>{






}


// ret
const emailExists = (email) => {

    let query = "SELECT count(userID) WHERE email = ?";
    let params = [email];

    DB.executeQuery(query, params);

    return false;

    return true;

}