const { insertProfile } = require("../DAOs/userDAO");
// import user + profile objects
var User = require ('../objects/user.js');
var Profile = require ('../objects/profile.js');

const userDAO = require ('../DAOs/userDAO.js');
const app = require("../app.js");

// start test server before running tests
beforeAll(()=>{

    return app.startServer();

})

describe('Insert Login +', ()=> {
    it('positive test for inserting a new login', () =>{
        userDAO.insertLogin(0, "test_name", "example@mail.com", "f00bar", function(err, result){
            if(err){
                done(err);
            }
            else{
                expect(result).toBe(true);
            }
        });
    });
});

describe('Insert Login -I ', ()=> {
    it('negative test for inserting login with an existing email', () =>{
        userDAO.insertLogin(0, "test_name", "example@outlook.com", "f00bar", function(err, result){
            console.log(err);
            expect(result).toBe(false);
        });
    });
});

describe('Insert Login -II ', ()=> {
    it('negative test for inserting login with an existing username', () =>{
        userDAO.insertLogin(0, "lachlan", "example@mail.com", "f00bar", function(err, result){
            console.log(err);
            expect(result).toBe(false);
        });
    });
});



// positive test for inserting a profile with an existing userID

// negative test for inserting a profile with a non-existent userID


// positive test for inserting a pfp with an existing userID

// negative test for inserting a pfp with a non-existent userID


// positive test for checking an existing email
// negative test for checking a non-existing email

// positive test for checking an existing username
// negative test for checking a non-existing username

// positive test for checking an existing userID
// negative test for checking a non-existing userID

// pos test for fetching a hash from an existing email
// neg test for fetching a hash from a non-existing email

// pos test for fetching a hash from an existing username
// neg test for fetching a hash from a non-existing username


// pos test for fetching a full user details
// neg test for fetching a full user details


// after all tests have run kill the test server
afterAll(()=>{

    return app.killServer();

})