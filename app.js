const express = require("express");
const mongoose = require('mongoose')
const mysql = require('mysql');
const routes = require('./routes')
const cors = require('cors')
var cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express()
app.use(express.json());
app.use(cors({
  origin : 'http://localhost:3000',
  credentials: true,
}))

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(cookieParser());

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


mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(process.env.DB_PORT_MONGODB);
    console.log("Connected to MongoDB, server up on port " + process.env.DB_PORT_MONGODB);
  })
  .catch((err) => {
    console.log(err);
});

app.use('', routes);
app.listen(process.env.SERVER_PORT);
console.log("Server running on port", process.env.SERVER_PORT);