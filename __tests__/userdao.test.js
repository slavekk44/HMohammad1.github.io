


describe('Testing functionality for the userDAO handler', ()=> {

    // import user + profile objects
    var User = require ('../objects/user.js');
    var Profile = require ('../objects/profile.js');

    const userDAO = require ('../DAOs/userDAO.js');

    it('positive test for finding an existing userID', done =>{
        userDAO.userIDexists(8112001, function(err, result){
            if(err){
                done(err);
            }
            else{

                console.log(result.count != 0);
                expect(result.count).not.toBe(0);
                done();
            }
        });
    });

    it('negative test for finding an existing userID', done =>{
        userDAO.userIDexists(777, function(err, result){
            if(err){
                done(err);
            }
            else{
                expect(result.count).toBe(0);
                done();
            }
        });
    });

    it('positive test for finding an existing username', done =>{
        userDAO.usernameExists("lachlan", function(err, result){
            if(err){
                done(err);
            }
            else{
                expect(result).toBe(true);
                done();
            }
        });
    });

    it('negative test for finding an existing username', done =>{
        userDAO.usernameExists("foobar", function(err, result){
            if(err){
                done(err);
            }
            else{
                expect(result).toBe(false);
                done();
            }
        });
    });

    it('positive test for finding an existing email', done =>{
        userDAO.emailExists("example@outlook.com", function(err, result){
            if(err){
                done(err);
            }
            else{
                expect(result).toBe(true);
                done();
            }
        });
    });

    it('negative test for finding an existing email', done =>{
        userDAO.emailExists("foo@bar.com", function(err, result){
            if(err){
                done(err);
            }
            else{
                expect(result).toBe(false);
                done();
            }
        });
    });

    it('positive test for inserting a new login', done =>{
        userDAO.insertLogin(0, "test_name", "example@mail.com", "f00bar", function(err, result){
            if(err){
                done(err);
            }
            else{
                expect(result).toBe(true);
                done();
            }
        });
    });

    it('negative test for inserting login with an existing email', done =>{
        userDAO.insertLogin(0, "test_name", "example@outlook.com", "f00bar", function(err, result){
            expect(err).not.toBe(null);
            done();
        });
    });


    it('negative test for inserting login with an existing username', done =>{
        userDAO.insertLogin(0, "lachlan", "test@outlook.com", "f00bar", function(err, result){
            expect(err).not.toBe(null);
            done();
        });
    });


    it('positive test for inserting a profile', done =>{
        userDAO.insertProfile(811, "f00bar", "foo", "bar", function(err, result){
            if(err){
                done(err);
            }
            else{
                expect(result).toBe(true);
                done();
            }
        });
    });

    it('negative test for inserting profile without an existing login', done =>{
        userDAO.insertProfile(777, "f00bar", "foo", "bar", function(err, result){
            expect(err).not.toBe(null);
            done();
        });
    });


    it('positive test for inserting a pfp', done =>{
        userDAO.insertPFP(811, function(err, result){
            if(err){
                done(err);
            }
            else{
                expect(result).toBe(true);
                done();
            }
        });
    });

    it('negative test for inserting pfp without an existing login', done =>{
        userDAO.insertPFP(777, function(err, result){
            expect(err).not.toBe(null);
            done();
        });
    });


    it('positive test for fetching a hash', done =>{
        userDAO.fetchPaswordByUsername("lachlan", function(err, result){
            if(err){
                done(err);
            }
            else{
                expect(result.hash).toBe("$2a$10$pBwghRmsXYbP/GGWwD00eubZUvEp87chnlp3gMDFE23CtG3CfN9ba");
                done();
            }
        });
    });

    it('negative test for fetching hash without an existing userID', done =>{
            userDAO.fetchPaswordByUsername("f00bar", function(err, result){
            if(err){
                done(err);
            }
            expect(result).toBe(false);
            done();
        });
    });

    it('positive test for fetching a user', done =>{
        userDAO.getUserByID(8112001, function(err, result){
            if(err){
                done(err);
            }
            else{
                expect(result.username).toBe("lachlan");
                done();
            }
        });
    });

    it('negative test for fetching non existant user', done =>{
            userDAO.getUserByID(777, function(err, result){
            if(err){
                done(err);
            }
            expect(result).toBe(false);
            done();
        });
    });

});