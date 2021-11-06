const express = require("express");
const mysql = require('mysql');
const routes = require('./routes')
const cors = require('cors')
require('dotenv').config();

const app = express()
app.use(express.json());
app.use(cors());

var db;
function connectDatabase() {
  db = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    port     : process.env.DB_PORT
  });

  db.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database.');
    app.listen(process.env.SERVER_PORT);
    console.log("Server running on port", process.env.SERVER_PORT);
  });
  
  return db;
}

app.use('', routes);
app.listen(process.env.SERVER_PORT);
console.log("Server running on port", process.env.SERVER_PORT);
