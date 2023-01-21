const Profile = require("./profile");

class user{

    // create user object w/ existing profile
    user(userID, username, email, profile){
        
        this.userID = userID;
        this.username = username;
        this.email = email;
        this.profile = profile;
        
    }

    // create user object and profile
    user(userID, username, email, display, fname, lname, pfp, colour){

        this.userID = userID;
        this.username = username;
        this.email = email;
        this.profile = new Profile(display, fname, lname, pfp, colour);

    }




}

module.exports = {
    user

}