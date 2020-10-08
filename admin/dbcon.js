var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'password',
  database        : 'coffee_shop'
});

module.exports.pool = pool;
