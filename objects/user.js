class User{

    // create user object w/ existing profile
    constructor(userID, username, email, profile){
        
        this.userID = userID;
        this.username = username;
        this.email = email;
        this.profile = profile;
        
    }


}

module.exports = User