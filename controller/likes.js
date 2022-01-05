var mysql = require('mysql');
var db = require('../database')

// like a tweet
const like = (req, res) => {
  const { user_id, author_id, tweet_id } = req.body;
  const data = {
    user_id,
    author_id,
    tweet_id,
    status: true
  }
  let sql = "INSERT INTO LIKES SET ?"
  db.query(sql, data, (err, result) => {
    if(err) throw err;
    res.send(data)
  })
}

// unlike a tweet
const unlike = (req, res) => {
  const { user_id, author_id, tweet_id } = req.body;
  const data = {
    user_id,
    author_id,
    tweet_id,
    status: false
  }
  let sql = "DELETE FROM LIKES WHERE user_id = ? AND author_id = ? AND tweet_id = ?"
  db.query(sql, [user_id, author_id, tweet_id], (err, result) => {
    if(err) throw err;
    res.send(data)
  })
}

// send all liked tweet
const allLiked = (req, res) => {
  const { user_id } = req.body;
  let sql = "SELECT tweet_id FROM LIKES WHERE user_id = ?"
  db.query(sql, user_id, (err, result) => {
    if(err) throw err;
    res.send(result)
  })
}

// liked tweets + user details
const likedTweetsWithDetails = (req, res) => {
  const { user_id } = req.params;
  let sql = "select * from LIKES INNER JOIN TWEETS ON LIKES.tweet_id = TWEETS.tweet_id INNER JOIN USERS ON LIKES.author_id = USERS.user_id where LIKES.user_id = ?"
  db.query(sql, user_id, (err, result) => {
    if(err) throw err;
    res.send(result)
  })
}
 
module.exports = { like, allLiked, unlike, likedTweetsWithDetails }