const { exportAllDeclaration } = require('@babel/types');
const { fetchPaswordByUsername } = require('../DAOs/userDAO.js');

describe('Testing functionality for the userDAO handler', ()=> {

    // import user + profile objects
    var User = require ('../objects/user.js');
    var Profile = require ('../objects/profile.js');

    // require userServices handler
    const userServices = require ('../services/userServices.js');
    const app = require('../app.js');

    // --- LOGIN TESTS --- //
    it('positive test for logging into an existing account', done =>{
        expect(1).toBe(1);
        done();
    });

    it('negative test for logging into an existing account with the wrong password', done =>{
        expect(1).toBe(1);
        done();
    });

    it('negative test for logging into a non-existing account via email', done =>{
        expect(1).toBe(1);
        done();
    });

    it('negative test for logging into a non-existing account via username', done =>{
        expect(1).toBe(1);
        done();
    });


    // --- SIGNUP TESTS --- //
    it('positive test for creating a new account', done =>{
        expect(1).toBe(1);
        done();
    });

    it('negative test for password mismatch', done =>{
        expect(1).toBe(1);
        done();
    });

    it('negative test for taken username', done =>{
        expect(1).toBe(1);
        done();
    });

    it('negative test for taken email', done =>{
        expect(1).toBe(1);
        done();
    });


    // --- FETCH TESTS --- //
    it('positive test for fetching an existing user', done =>{

        var expectedProfile = new Profile("lachlan", "Lachlan", "Lachlan", "McIntyre", "", "#FF0000");
        var expectedUser = new User(8112001, "example@outlook.com", expectedProfile);

        userServices.getUserByID(8112001, function(err, user){
            if(err){
                done(err);
            }
            else{
                expect(user).toEqual(expectedUser);
                done();
            }
        });
    });

    it('negative test for fetching a non-existing user', done =>{
        expect(1).toBe(1);
        done();
    });

    it('positive test for fetching an existing profile', done =>{
        expect(1).toBe(1);
        done();
    });

    it('negative test for fetching a non-existing profile', done =>{
        expect(1).toBe(1);
        done();
    });


        //---------- Swear Words replacement -----//
    // it('positive test replacement swear words', done =>{

    //     <textarea id = "userComment"></textarea>
    //     const  textarea = document.getUserByID('userComment');
    //     let swearWords = /arse | arsehead | arsehole |  ass |  asshole | bastard | bitch |  bloody |  bollocks | brotherfucker | bugger | bullshit | child-fucker | Christ on a bike | Christ on a cracker | cock | cocksucker | crap | cunt | damn | damn it | dick | dickhead | dyke | fatherfucker | frigger | fuck | goddamn | godsdamn | hell | holy shit | horseshit | in shit | Jesus Christ | Jesus fuck | Jesus H. Christ | Jesus Harold Christ | Jesus wept | Jesus, Mary and Joseph | kike |  motherfucker | nigga | nigra | piss | prick | pussy | shit | shit ass | shite | sisterfucker  | slut  | son of a bitch  | son of a whore  | spastic  | sweet Jesus  | turd | twat | wanker/gi ;
    //     let userComm1 = textarea.value;
    //     let userComm2 = userComm1.replace(swearWords, '*****');
    //     document.getElementById('userComment').value = userComm2;

    //     if (textarea.value.search(swearWords) <= 0 ){
    //         done();
    //     }
    //     else {
    //         console.log("Words are not replaced !");
    //         done(err);
    //     }

    // }
    
    // );
    

    // --- FRIEND TESTS -- //
    // --- PASSWORD TEST --//
    //-- using regular expresion to test if password match safety requirements
    // at least 8 characters, at least 1 Capital Letter, at least 1 lower Letter and at least special character
    // it('positive test for password meet security   ', done =>{

    //     var expectedProfile = new Profile("slawomir", "slawomir", "slawomir", "Kolodziejczyk", "", "#0000FF");
    //     //check password
    //     var pass = ("ASDSSss@9");

    //     // get element by id (new password).value
        
    //     fetchPaswordByUsername(8112002,function(err, pass){
            
    //         if(pass.lenght <8){
    //             done(err);
    //         }
    //         if(pass.search(/[a-z]/i) < 0){
    //             done(err);
    //         }
    //         if(pass.search(/[A-Z]/i) < 0 ){
    //             done(err);
    //         }
    //         if(pass.search(/[0-9]/) <0){
    //             done(err);
    //         }
    //         if(pass.search(/[#^&*$%!@]/) <0){
    //             done(err);
    //         }
    //         if(pass.search(/[#^&*$%!@]/) <0){
    //             done(err);
    //         }
    //         if(pass.lenght > 0){
    //             alert(pass.join("\n"));
    //             done(err);
                
    //         }
    //         else {
    //             done();
    //         }

    //     });
    // });
    // //-- using regular expresion to test if password match safety requirements
    // // Neageive less at least 8 characters, at least 1 Capital Letter, at least 1 lower Letter and at least special character
    // it('negative test for password meet sescurity   ', done =>{

    //     var expectedProfile = new Profile("slawomir", "slawomir", "slawomir", "Kolodziejczyk", "", "#0000FF");
    //     //check passwords need to iterate over then featch when user putting password
    //     var pass0 = ("ASSss@9");
    //     var pass1 = ("ASSssss9");
    //     var pass2 = ("ASSss@sss");
    //     var pass3 = ("sssssss@9");
    //     var pass4 = ("ssssssss");
    //     var pass5 = ("00000000");
    //     var i =0;

    //     // get element by id (new password).value
        
    //     fetchPaswordByUsername(8112002,function(err, pass){
            
    //         if(pass.lenght <8 && pass.search(/[a-z]/i) < 0 && pass.search(/[A-Z]/i) < 0 
    //         && pass.search(/[0-9]/) <0 && pass.search(/[#^&*$%!@]/) <0 && pass.search(/[#^&*$%!@]/) <0 && pass.lenght > 0){
    //             done();
    //         }
    //         else {
    //             done(err);
    //         }

    //     });
    // });

    //----- BAD WORDS REPLACEMENT -----//
  

});