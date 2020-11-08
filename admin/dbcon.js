let mysql = require('mysql');

 // // Lijie
 // let pool = mysql.createPool({
 //   connectionLimit : 10,
 //   host            : 'localhost',
 //   user            : 'root',
 //   password        : 'password',
 //   database        : 'coffee_shop'
 // });

// Gabby
let pool = mysql.createPool({
 connectionLimit : 10,
 host            : 'localhost',
 user            : 'weilianshan',
 password        : 'password',
 database        : 'coffee_local'
});

// const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql"
// let pool = mysql.createPool({
//     connectionLimit: 10,
//     user: process.env.DB_USER, // e.g. 'my-db-user'
//     password: process.env.DB_PASS, // e.g. 'my-db-password'
//     database: process.env.DB_NAME, // e.g. 'my-database'
//     // If connecting via unix domain socket, specify the path
//     socketPath: `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
//     // Specify additional properties here.
// });

module.exports.pool = pool;
