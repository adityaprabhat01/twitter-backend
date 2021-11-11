var mysql = require('mysql');
var db = require('../database')

// retweet a tweet
const retweet = (req, res) => {
  const { author_id, user_id, tweet_id } = req.body;
  let data = {
    author_id,
    user_id,
    tweet_id,
    status: true
  }
  let sql = 'INSERT INTO RETWEETS SET ?'
  db.query(sql, data, (err, result) => {
    if(err) throw err;
    res.send(data);
  })
}

// unretweet a tweet
const unretweet = (req, res) => {
  const { user_id, author_id, tweet_id } = req.body;
  let data = {
    user_id,
    author_id,
    tweet_id,
    status: false
  }
  let sql = 'DELETE FROM RETWEETS WHERE user_id = ? AND author_id = ? AND tweet_id = ?'
  db.query(sql, [user_id, author_id, tweet_id], (err, result) => {
    if(err) throw err;
    res.send(data);
  })
}

const allRetweeted = (req, res) => {
  const { user_id } = req.body;
  let sql = "SELECT tweet_id FROM RETWEETS WHERE user_id = ?"
  db.query(sql, user_id, (err, result) => {
    if(err) throw err;
    res.send(result)
  })
}

module.exports = { retweet, unretweet, allRetweeted }