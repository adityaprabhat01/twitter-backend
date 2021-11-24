const mysql = require('mysql');
const mongoose = require('mongoose')
require('dotenv').config();

var db;
function connectDatabase() {
  db = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    port     : process.env.DB_PORT,
    database : process.env.DB_DATABASE
  });

  db.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database.');
  });
  
  return db;
}



module.exports = connectDatabase();