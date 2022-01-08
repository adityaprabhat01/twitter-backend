const { v4: uuidv4 } = require('uuid');
var db = require('../database')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, 'secret key', { 
    expiresIn: maxAge
  })
}

// sign up
const signUp = async (req, res) => {
  const { password } = req.body;
  const salt = await bcrypt.genSalt()
  hashedPassword = await bcrypt.hash(password, salt)
  let data = {
    user_id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    username: req.body.username
  }

  let sql = 'INSERT INTO USERS SET ?'
  try {
    db.query(sql, data, (err, result) => {
      if(err) throw err;
      const token = createToken(data.user_id)
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, Secure: true, SameSite: 'None' })
      let response = {
        user_id: data.user_id,
        name: data.name,
        username: data.username
      }
      res.status(201).send(response);
    })
  } catch(err) {

  }
}

// sign in
const signIn = (req, res) => {
  const { email, password } = req.body;
  let sql = 'SELECT * FROM USERS WHERE email = ?'

  try{
    db.query(sql, [email], async (err, result) => {
      if(err) throw err;
      if(result.length !== 0) {
        const auth = await bcrypt.compare(password, result[0].password)
        if(auth) {
          const response = {
            user_id: result[0].user_id,
            user_name: result[0].username,
            name: result[0].name
          }
          const token = createToken(result[0].user_id)
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, Secure: true, SameSite: 'None' })
          res.cookie('user_id', result[0].user_id, { maxAge: maxAge * 1000, Secure: true, SameSite: 'None' })
          res.cookie('user_name', result[0].username, { maxAge: maxAge * 1000, Secure: true, SameSite: 'None' })
          res.cookie('name', result[0].name, { maxAge: maxAge * 1000, Secure: true, SameSite: 'None' })
          res.status(200).send(response)
        } else {
          throw Error('incorrect password')
        }
      } else {
        throw Error('incorrect email')
      }
    })
  } catch(err) {
    
  }
}

// Log Out
const logOut = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  const obj = {
    redirect: true
  }
  res.send(obj)
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

module.exports = { signUp, signIn, search, checkExistence, logOut };