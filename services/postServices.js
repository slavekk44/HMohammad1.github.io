// import user + profile objects
var User = require ('../objects/user.js');
var Profile = require ('../objects/profile.js');
var Post = require('../objects/post.js');

const session = require("express-session");

const userServices = require('../services/userServices.js');
const app = require('../app.js');

const postDAO = require ('../DAOs/postDAO.js');
const { res } = require('express');

// import upload library
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const { array } = require('yargs');

// moves an image/video into a public folder that corresponds to its postID
function uploadMedia(postID, data, callback){

    // init array for holding uploaded paths
    links = [];

    var rawIMG = fs.readFileSync(data.path);
    var filename = encodeURIComponent(data.name.replace(/\s/g, "-"));
    var newPath = path.join(__dirname, `../public/img/${postID}/${filename}`);

    fs.writeFile(newPath, rawIMG, function(err){
        if(err){
            return callback(err, null);
        }
        else{
            // insert new image link to link array
            links.push(`/img/${postID}/${filename}`);
            return callback(null, links);
        }

    });
}


// create a new post
const createPost = (req, res) => {

    // generate a new postID
    var postID;
    do{
        postID = Math.floor(Math.random() * 2147483646);

    } while(postDAO.postIDexists(postID));

    // get current location of user
    if(req.session != null && req.session.user){
        var user = req.session.user;
        coords = [55.909095, -3.319584];
        //coords = user.getCoords();
        userID = user.userID;
    }
    else{
        res.send("You must be logged in to create a post");
    }

    // make directory for new post
    fs.mkdir(path.join(__dirname, `../public/img/${postID}`), function(err){

        if(err){
            throw err;
        }

    });

    // TESTING VARS
    // userID = 2005151994;
    // coords = [55.909095, -3.319584];

    postDAO.insertPost(postID, userID, req.fields.title, req.fields.description, coords[0], coords[1], function(err, result){

        if(err){
            throw err;
        }

        if(!req.files.myfile.length){

            uploadMedia(postID, req.files.myfile, function(err, links){

                if(err){
                    throw err;
                }

                // if all files uploaded okay then insert links to DB
                postDAO.insertPostMedia(postID, links, function(err, result){

                    if(err){
                        throw err;
                    }
                    else{

                        // get request to fetch post
                        res.redirect(`/API/post/${postID}`);
                    }

                });
            });
        }
        else{
            res.send("Multiple file uploads are not currently supported");
        }

    });


}


// fetch all media associated with a post and return them as a link of arrays
function getPostMedia(postID, callback){

    // init array
    var links = [];

    postDAO.getPostMediaByID(postID, function(err, rows){

        if(!err){

            rows.forEach(row => {
            
                links.push(row.link);

            });

            // return populated array
            return callback(links);

        }
        else{
            throw err;
        }
        
    });


}


// returns an array with all of a users posts
const getUserPosts = (req, res) =>{

    // userID from GET request
    var userID = req.params.userID;

    postDAO.getAllUserPostIDs(userID, function(rows){

        if(!rows){
            res.send(404);
        }
        else{

            // init post array
            posts = [];
            
            // counter for posts to fetch
            var postsToFetch = rows.length;

            rows.forEach(row =>{

                // get post object and add to array
                fetchPostByID(row.postID, function(post){

                    // error check
                    if(post){

                        posts.push(post);
                        if(posts.length === postsToFetch){
                            // once all IDs processed return the array
                            res.send(JSON.stringify(posts));
                        }

                    }
                    else{
                        // allows to fail gracefully if a post cannot be retrieved for some reason
                        postsToFetch--;
                    }

                });
            });


        }

    });

}


// returns a post object complete with poster profile
const getPostByID = (req, res) => {

    // postID from the GET request
    postID = req.params.ID;

    try{

        postDAO.getPostByID(postID, function(err, postData){
            // error check
            if(!err){

                // post doesn't exist -- 404
                if(postData === undefined){
                    return res.send("404");
                }

                console.log(postData);

                // assign userID
                userID = postData.userID;

                // get profile
                userServices.getProfileByID(userID, function(profile){

                    // fetch media links
                    getPostMedia(postID, function(links){;

                        // create post w/ profile & media links
                        var post = new Post(postID, [postData.lat, postData.long], links, postData.title, postData.descr, postData.posted, profile);

                        res.send(JSON.stringify(post));
                    });
                });

            }
            else{
                console.log(err);
                throw err;
            }
        });
    }
    catch(err){
        return res.send(err);
    }

}

// returns a post object complete with poster profile
function fetchPostByID(postID, callback){

    try{

        postDAO.getPostByID(postID, function(err, postData){
            // error check
            if(!err){

                // post doesn't exist -- 404
                if(postData === undefined){
                    return res.send("404");
                }

                console.log(postData);

                // assign userID
                userID = postData.userID;

                // get profile
                userServices.getProfileByID(userID, function(profile){

                    // fetch media links
                    getPostMedia(postID, function(links){;

                        // create post w/ profile & media links
                        var post = new Post(postID, [postData.lat, postData.long], links, postData.title, postData.descr, postData.posted, profile);

                        return callback(post);
                    });
                });

            }
            else{
                console.log(err);
                throw err;
            }
        });
    }
    catch(err){
        callback(false);
    }

}


const addComment = (req, res) =>{

    // get vars from POST
    var userID = req.fields.userID;
    var postID = req.fields.postID;
    var comment = req.fields.comment;

    postDAO.addComment(postID, userID, comment, function(result){

        if(result){
            res.send("comment succesfully posted");
        }
        else{
            res.send(500);
        }
    });

};

// returns an array of 
const getPostComments = (req, res) =>{

    var postID = req.params.postID;


    postDAO.getPostComments(postID, function(rows){

        // error check
        if(!rows){
            res.send(500);
        }
        else{

            // init comment array
            comments = [];

            rows.forEach(row =>{

                // fetch profile for commenter
                userServices.getProfileByID(row.userID, function(profile){

                    comments.push([rows.text, profile]);

                });
            });

            // return populated comment array
            res.send(JSON.stringify(comments));

        }
    });

}


module.exports = {

    getPostByID,
    getUserPosts,
    createPost,
    addComment,
    getPostComments

}