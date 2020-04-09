// include the packages needed to run the code in this file
const mysql = require('mysql');
const util = require('util');

// define a variable that holds the information needed to define a connection to a mysql database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  // declare which database to connect to
  database: 'cms_db'
});

// make the connection to the database
connection.connect();
// we give connection.query access to promises
// i.e. .then() and .catch()
connection.query = util.promisify(connection.query);

// export the connection for use in other files
module.exports = connection;