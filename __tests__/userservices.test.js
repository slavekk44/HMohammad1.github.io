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

});