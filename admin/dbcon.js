// // GCP
// const mysql = require('promise-mysql');
//
// const DB_USER='coffee';
// const DB_PASS='coffee';
// const DB_NAME='coffee_local';
// const CLOUD_SQL_CONNECTION_NAME='coffee-shop-admin:us-west2:coffee-shop-db';
//
// const createTcpPool = async (config) => {
//     // Extract host and port from socket address
//     const dbSocketAddr = DB_HOST.split(":")
//
//     // Establish a connection to the database
//     return await mysql.createPool({
//         user: DB_USER, // e.g. 'my-db-user'
//         password: DB_PASS, // e.g. 'my-db-password'
//         database: DB_NAME, // e.g. 'my-database'
//         host: dbSocketAddr[0], // e.g. '127.0.0.1'
//         port: dbSocketAddr[1], // e.g. '3306'
//         // ... Specify additional properties here.
//         ...config
//     });
// };
//
// const createUnixSocketPool = async (config) => {
//     const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql"
//
//     // Establish a connection to the database
//     return await mysql.createPool({
//         user: DB_USER, // e.g. 'my-db-user'
//         password: DB_PASS, // e.g. 'my-db-password'
//         database: DB_NAME, // e.g. 'my-database'
//         // If connecting via unix domain socket, specify the path
//         socketPath: `${dbSocketPath}/${CLOUD_SQL_CONNECTION_NAME}`,
//         // Specify additional properties here.
//         ...config
//     });
// };
//
// const createPool = async () => {
//     const config = {
//         // [START cloud_sql_mysql_mysql_limit]
//         // 'connectionLimit' is the maximum number of connections the pool is allowed
//         // to keep at once.
//         connectionLimit: 5,
//         // [END cloud_sql_mysql_mysql_limit]
//
//         // [START cloud_sql_mysql_mysql_timeout]
//         // 'connectTimeout' is the maximum number of milliseconds before a timeout
//         // occurs during the initial connection to the database.
//         connectTimeout: 10000, // 10 seconds
//         // 'acquireTimeout' is the maximum number of milliseconds to wait when
//         // checking out a connection from the pool before a timeout error occurs.
//         acquireTimeout: 10000, // 10 seconds
//         // 'waitForConnections' determines the pool's action when no connections are
//         // free. If true, the request will queued and a connection will be presented
//         // when ready. If false, the pool will call back with an error.
//         waitForConnections: true, // Default: true
//         // 'queueLimit' is the maximum number of requests for connections the pool
//         // will queue at once before returning an error. If 0, there is no limit.
//         queueLimit: 0, // Default: 0
//         // [END cloud_sql_mysql_mysql_timeout]
//
//         // [START cloud_sql_mysql_mysql_backoff]
//         // The mysql module automatically uses exponential delays between failed
//         // connection attempts.
//         // [END cloud_sql_mysql_mysql_backoff]
//     };
//     if (process.env.DB_HOST) {
//         return await createTcpPool(config);
//     } else {
//         return await createUnixSocketPool(config);
//     }
// };
// module.exports.createPool = createPool;


let mysql = require('mysql');
// // Lijie
// let pool = mysql.createPool({
//   connectionLimit : 10,
//   host            : 'localhost',
//   user            : 'root',
//   password        : 'password',
//   database        : 'coffee_shop'
// });

// // Gabby
// let pool = mysql.createPool({
//   connectionLimit : 10,
//   host            : 'localhost',
//   user            : 'weilianshan',
//   password        : 'jiayou2014',
//   database        : 'coffee_local'
// });

// GCP
// let pool = mysql.createPool({
//     connectionLimit: 10,
//     host: '172.17.0.1',
//     user: 'coffee',
//     password: 'coffee',
//     database: 'coffee_local',
//     port: process.env.PORT
// });

const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql"
let pool = mysql.createPool({
    connectionLimit: 10,
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    // If connecting via unix domain socket, specify the path
    socketPath: `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
    // Specify additional properties here.
});


// // GCP local
// let pool = mysql.createPool({
//     connectionLimit : 10,
//     host            : 'localhost',
//     user            : 'coffee',
//     password        : 'coffee',
//     database        : 'coffee_local'
// });

module.exports.pool = pool;
