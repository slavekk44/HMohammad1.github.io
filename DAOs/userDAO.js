const { query } = require("express");
const DB = require("./queryHandler");

// creates a profile for the given userID
function insertProfile(userID, d_n, fname, lname){

    let query = "INSERT INTO user_profiles (userID, display_name, fname, lname) VALUES (?,?,?,?)";
    let params = [userID, d_n, fname, lname];

    DB.executeQuery(query, params, function(err){
        if(err){
            throw err;
            return false;
        }
        else{
            return true;
        }
    });

}

// insert login details
function insertLogin(userID, username, email, hash){

    let query = "INSERT INTO user_logins (userID, username, email, hash) VALUES (?,?,?,?)";
    let params = [userID, username, email, hash];

    DB.executeQuery(query, params, function(err){
        if(err){
            throw err;
            return false;
        }
        else{
            return true;
        }
    });

}

// assign default pfp
function insertPFP(userID){

    let query = "INSERT INTO user_pfp (userID) VALUES (?)";
    let params = [userID];

    DB.executeQuery(query, params, function(err){
        if(err){
            throw err;
            return false;
        }
        else{
            return true;
        }
    });

}


// links the current IP of a user to their account
function logIP(userID){



}


// return true if email exists
function emailExists(email){

    let query = "SELECT count(userID) AS count FROM user_logins WHERE email = ?";
    let params = [email];

    DB.executeQuery(query, params, function(err, rows, fields){
        if(!err){
            if(rows[0].count == 0){
                return false;
            }
            else{
                return true;
            }
        }
        // connection / query failed -- throw error
        else{
            throw(err);
        }

    });
}

function usernameExists(username){

    let query = "SELECT count(userID) AS count FROM user_logins WHERE username = ?";
    let params = [username];

    DB.executeQuery(query, params, function(err, rows, fields){

        if(!err){
            if(rows[0].count == 0){
                return false;
            }
            else{
                return true;
            }
        }
        else{
            throw(err);
        }

    });

}

function userIDexists(userID){

    let query = "SELECT count(userID) AS count FROM user_logins WHERE userID = ?";
    let params = [userID];

    DB.executeQuery(query, params, function(err, rows, fields){

        if(!err){
            if(rows[0].count == 0){
                return false;
            }
            else{
                return true;
            }
        }
        else{
            throw(err);
        }
    });


}

// returns all data for a user -- use getProfileByID to fetch user side details
function getUserByID(userID){

    let query = `
        SELECT  user_logins.username AS username,
                user_logins.email AS email,
                user_profiles.display_name AS display,
                user_profiles.fname AS fname,
                user_profiles.lname AS lname,
                user_profiles.colour AS colour,
                user_pfp.link AS pfp
        FROM user_logins
        INNER JOIN user_profiles ON user_logins.userID = user_profiles.userID
        INNER JOIN user_pfp ON user_logins.userID = user_pfp.userID
        WHERE user_logins.userID = ?    
        `;
    let params = [userID];

    DB.executeQuery(query, params, function(err, rows, fields){

        if(!err){
            return rows[0];
        }
        else{

            throw err;
        }
    });
}


module.exports = {

    getUserByID,
    emailExists,
    usernameExists,
    userIDexists,
    insertLogin,
    insertProfile,
    insertPFP
}