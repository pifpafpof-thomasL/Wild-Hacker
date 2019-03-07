const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'toulouse',
  database : 'user'
});
module.exports  =  connection;
