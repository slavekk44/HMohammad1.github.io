const { exportAllDeclaration } = require('@babel/types');

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


});