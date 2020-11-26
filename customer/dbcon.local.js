let mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',          // Change this to the IP address of the local MySQL server
    user: 'username',           // Change this to the username for the local server
    password: 'password',           // Change this to the password for the user on the local server
    database: 'coffee_shop'         // Change this to the name of the database on the local server
});

module.exports.pool = pool;