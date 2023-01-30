const { query } = require("express");
const DB = require("./queryHandler");

// inserts a post with the given postID
function insertPost(postID, userID, title, desc, lat, long, callback){

    let query = "INSERT INTO posts (postID, userID, title, descr, lat, long) VALUES (?,?,?,?,?,?)"
    let params = [postID, userID, title, desc, lat, long];
    DB.executeQuery(query, params, function(err, rows){
        if(err){
            return callback(err, false);
        }
        else{
            return callback(null, true);
        }
    });
}


// add media to an existing post -- media is an array containing links to the media that has been uploaded to the server
function insertPostMedia(postID, media, callback){

    let query = "INSERT INTO post_media (postID, link, pos) VALUES (?,?,?)";

    // init counter
    var pos = 1;
    media.forEach(link => {
        
        // populate params array with new variables
        params = [postID, link, pos];
        // exectute query
        DB.executeQuery(query, params, function(err, rows){
            if(err){
                // if error return here
                return callback(err, false)
            }
            else{
                // if not move to next item in array
                pos++;
            }
        });
    });

    // if all media inserted then return true
    return callback(null, true);

}

function postIDexists(postID){

    let query = "SELECT count(postID) AS count FROM posts WHERE postID = ?";
    let params = [postID];

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


function getPostMediaByID(postID, callback){

    let query = "SELECT link FROM post_media WHERE postID = ? ORDER BY pos ASC";
    let params = [postID];

    DB.executeQuery(query, params, function(err, rows, fields){

        if(!err){
            return callback(null, rows);
        }
        else{
            return callback(err, false);
        }

    });

}


function getPostByID(postID, callback){

    let query = `
        SELECT  postID AS postID,
                posted_by as userID,
                posted as posted,
                latitude as 'lat',
                longitude as 'long'
        FROM posts
        WHERE postID = ?`

    let params = [postID];

    DB.executeQuery(query, params, function(err, rows, fields){

        if(!err){
            console.log(rows);
            return callback(false, rows[0]);
        }
        else{
            console.log(err);
            return callback(err, false);
        }

    });

}

function addPostComment(postID, userID, comment){

    let query = `INSERT INTO post_comments (postID, comment_from, text) VALUES (?,?,?)`;
    let params = [postID, userID, comment];

    DB.executeQuery(query, params, function(err, rows, fields){

        if(!err){
            console.log(rows);
            return callback(true);
        }
        else{
            console.log(err);
            return callback(false);
        }

    });


}

// get all comments and their associated userIDs
function getPostComments(postID){

    let query = `SELECT text AS TEXT, comment_from as userID FROM post_comments WHERE postID = ?`
    let params = [postID];

    DB.executeQuery(query, params, function(err, rows, fields){

        if(!err){
            return callback(rows);
        }
        else{
            console.log(err);
            return callback(false);
        }

    });

}


module.exports = {

    postIDexists,
    getPostByID,
    insertPost,
    insertPostMedia,
    getPostMediaByID,
    addPostComment,
    getPostComments

}