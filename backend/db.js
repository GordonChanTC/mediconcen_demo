const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

var con = mysql.createConnection({
    host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB_database,
    port: process.env.DB_port
  });

con.connect(function(err) {
    if (err) throw err;
    console.log('Database Connected!');
  });


module.exports = con;