const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: "",
    user: "",
    password: "",
    database: "scrapmap",
    debug: true
});

function executeQuery(query, params, callback) {
    // try and get an avaliable connection from the pool
    pool.getConnection(function(err, connection) {
        // connection refused -- error
        if (err){
            return callback(err, null);
        } 
        // connection established -- try query
        else if (connection) {
            connection.query(query, params, function(err, rows, fields) {
                connection.release();
                if (err) {
                    return callback(err, null);
                }
                return callback(null, rows);
            });
        }
        //no connections avaliable -- DB at capacity
        else{
            return callback(true, "No Connection");
        }
    });
}

module.exports = {
    executeQuery
};