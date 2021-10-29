const express = require("express");
const mysql = require('mysql');
require('dotenv').config();

const app = express()

var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  port     : process.env.DB_PORT
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
  console.log("Server running on port", process.env.SERVER_PORT);
  app.listen(process.env.SERVER_PORT);
});
