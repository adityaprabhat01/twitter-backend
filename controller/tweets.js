const { v4: uuidv4 } = require('uuid');
var mysql = require('mysql');
var db = require('../database')
var moment = require('moment');

const postTweet = (req, res) => {
  let data = {
    tweet_id: uuidv4(),
    tweet: req.body.tweet,
    user_id: req.body.user_id,
    self_liked: false,
    self_retweeted: false,
    posted_on: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    likes_count: 0,
    retweet_count: 0
  }
 
  let sql = 'INSERT INTO TWEETS SET ?'
  db.query(sql, data, (err, result) => {
    if(err) throw err;
    res.send('Tweet posted')
  })
}

module.exports = { postTweet }