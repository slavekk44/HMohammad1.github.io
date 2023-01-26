class User{

    // create user object w/ existing profile
    constructor(userID, email, profile){
        
        this.userID = userID;
        this.email = email;
        this.profile = profile;
        
    }

    getCoords() {
        // TESTING VARS ONLY
        return [55.909095, -3.319584];

    }


}

module.exports = User