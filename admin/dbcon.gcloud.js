// dbcon.js file for gcloud. Will rename this file as dbcon.js
// when deploying to gcloud.
let mysql = require('mysql');

let pool;
const is_gcloud = process.env.IS_GCLOUD || false;
if (is_gcloud) {
    // GCP
    const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql"
    pool = mysql.createPool({
        connectionLimit: 10,
        user: process.env.DB_USER, // e.g. 'my-db-user'
        password: process.env.DB_PASS, // e.g. 'my-db-password'
        database: process.env.DB_NAME, // e.g. 'my-database'
        // If connecting via unix domain socket, specify the path
        socketPath: `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
        // Specify additional properties here.
    });
} else {
    // Gcloud local test
    pool = mysql.createPool({
        connectionLimit: 10,
        host: '127.0.0.1',
        user: 'coffee',
        password: 'coffee',
        database: 'coffee_local'
    });    
}

module.exports.pool = pool;