var mysql = require('mysql');
var db = require('../database')
const mongoose = require('mongoose')
const Comment = require('../model/comment')

// fetch tweet data and comments
const fetchThread = (req, res) => {
  const tweet_id = req.params.tweet_id;
  let sql = "select * from TWEETS INNER JOIN USERS ON TWEETS.user_id = USERS.user_id and TWEETS.tweet_id =  ?"

  db.query(sql, [tweet_id], async (err, result) => {
    if(err) throw err;
    await Comment.find({
      tweet_id
    })
    .then(data => {
      result.push(data)
      res.send(result)
    })
    .catch(err => {
      console.log(err)
    })
  })
}

module.exports = { fetchThread }