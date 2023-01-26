// import user + profile objects
var User = require ('../objects/user.js');
var Profile = require ('../objects/profile.js');

const session = require("express-session");

const userServices = require('../services/userServices.js');
const app = require('../app.js').app;

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


// // create a new post
// const createPost = (req, res) => {

//     // generate a new postID
//     var postID;
//     do{
//         postID = Math.floor(Math.random() * 2147483646);

//     } while(postDAO.postIDexists(postID));

//     // get current location of user
//     // if(req.session != null && req.session.user){
//     //     var user = req.session.user;
//     //     coords = user.getCoords();
//     //     userID = user.userID;
//     // }
//     // else{
//     //     res.send("You must be logged in to create a post");
//     // }

//     // parse form data 
//     const form = new formidable.IncomingForm();
//     form.parse(req, function(err, fields, files){

//         // make directory for new post
//         mkdir(`/public/img/${postID}`);

//         // init array for holding uploaded paths
//         links = array();

//         // try and upload each file
//         files.forEach(media =>{
            
//             try{
//                 uploadMedia(postID, media, links);
//             }
//             catch (err){
//                 throw err;
//             }
//         });


//         // if all files uploaded okay then insert links to DB
//         postDAO.insertPostMedia(postID, links, function(err, result){

//             if(err){
//                 throw err;
//             }
//             else{

//                 // fetch newly created post and display
//                 getPostByID(postID, function(post){
//                     res.send(JSON.stringify(post));
//                 });
//             }

//         });

//     });


// }


// fetch all media associated with a post and return them as a link of arrays
function getPostMedia(postID){

    // init array
    links = array();

    postDAO.getPostMediaByID(postID, function(err, rows){

        if(!err){

            rows.forEach(row => {
            
                links.push(row.link);

            });

            // return populated array
            return links;

        }
        else{
            throw err;
        }
        
    });


}

// returns a post object complete with poster profile
const getPostByID = (req, res) => {

    try{

        postDAO.getPostByID(postID, function(data){

            // assign userID
            userID = data.userID;
            // fetch profile from DB
            userDAO.getProfileByID(userID, function(err, data){

                if(!err){

                    // create profile
                    var profile = new Profile(data.display, data.fname, data.lname, data.pfp, data.colour);

                    // fetch media links
                    let links = getPostMedia(postID);

                    // create post w/ profile & media links
                    var post = new Post(postID, [data.lat, data.long], links, data.descr, data.posted, profile);

                    res.send(JSON.stringify(post));
                }
                else{
                    throw err;
                }
            });
        });
    }
    catch(err){
        return callback(false);
    }

}


module.exports = {

    getPostByID

}