class Post{

    constructor(postID, coords, media, desc, date, profile){

        // set the ID of the post
        this.postID = postID;
        // touple containing the lat and long the post was made at
        this.coords = coords;
        // set media to contain an image array
        this.media = media;
        // post description
        this.desc = desc;
        // date post was made
        this.date = date;
        // profile of the user who created the post
        this.profile = profile;

    }



}

module.exports = Post;