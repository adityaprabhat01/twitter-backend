const { v4: uuidv4 } = require('uuid');
var mysql = require('mysql');
var db = require('../database')

// sign up
const signUp = (req, res) => {
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
    let response = {
      user_id: data.user_id,
      name: data.name,
      username: data.username
    }
    res.send(response);
  })
}

// sign in
const signIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let sql = 'SELECT * FROM USERS WHERE email = ? and password = ?'
  db.query(sql, [email, password], (err, result) => {
    if(err) throw err;
    const response = {
      user_id: result[0].user_id,
      user_name: result[0].username,
      name: result[0].name
    }
    res.send(response)
  })
}

// search
const search = (req, res) => {
  const user_name = req.body.user_name;
  let sql = 'SELECT * FROM USERS WHERE username = ?';
  db.query(sql, [user_name], (err, result) => {
    if(err) throw err;
    res.send(result[0]);
  })
}

// check user existence
const checkExistence = (req, res) => {
  const user_name = req.params.user_name;
  console.log(user_name)
  let sql = 'SELECT * FROM USERS WHERE username = ?';
  db.query(sql, [user_name], (err, result) => {
    if(err) throw err;
    if(result.length === 0) {
      const obj = {
        found: false
      }
      res.send(obj);
    }
    else {
      const obj = {
        found: true
      }
      res.send(obj);
    }
  })
}

module.exports = { signUp, signIn, search, checkExistence };