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
const { mkdir } = require('fs');
const path = require('path');
const { array } = require('yargs');

// moves an image/video into a public folder that corresponds to its postID
function uploadMedia(postID, data, links){

    var rawIMG = fs.readFileSync(data.filepath);
    var filename = data.name;
    var newPath = `/public/img/${postID}/${filename}`

    fs.writeFile(newPath, rawIMG, function(err){

        if(err){
            throw err;
        }
        else{
            // insert new image link to link array
            links.push(newPath);
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
        coords = user.getCoords();
        userID = user.userID;
    }
    else{
        res.send("You must be logged in to create a post");
    }

    // parse form data 
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){

        // make directory for new post
        mkdir(`/public/img/${postID}`);

        // init array for holding uploaded paths
        links = array();

        // try and upload each file
        files.forEach(media =>{
            
            try{
                uploadMedia(postID, media, links);
            }
            catch (err){
                throw err;
            }
        });


        // if all files uploaded okay then insert links to DB
        postDAO.insertPostMedia(postID, links, function(err, result){

            if(err){
                throw err;
            }
            else{

                // fetch newly created post and display
                getPostByID(postID, function(post){
                   return res.send(JSON.stringify(post));
                });
            }

        });

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
                        var post = new Post(postID, [postData.lat, postData.long], links, postData.descr, postData.posted, profile);

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


const addComment = (req, res) =>{

    // get vars from POST
    var userID = req.body.userID;
    var postID = req.body.postID;
    var comment = req.body.comment;

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
    createPost,
    addComment,
    getPostComments

}