const mysql = require('mysql');
const util = require('util');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'cms_db'
});
connection.connect();
// we give connection.query access to promises
// i.e. .then() and .catch()
connection.query = util.promisify(connection.query);
module.exports = connection;