const { v4: uuidv4 } = require('uuid');
var mysql = require('mysql');
var db = require('../database')

const addUser = (req, res) => {
  
  let data = {
    user_id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username
  }

  let sql = 'INSERT INTO USERS SET ?'
  db.query(sql, data, (err, result) => {
    if(err) throw err;
    res.send('Account created');
  })
}

module.exports = { addUser };