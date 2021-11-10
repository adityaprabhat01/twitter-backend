const { v4: uuidv4 } = require('uuid');
var mysql = require('mysql');
var db = require('../database')
var moment = require('moment');

// post
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
    res.send(data)
  })
}

// tweets on profile page
const ownTweets = async (req, res) => {
  let user_id = req.body.user_id;
  let user_name = req.body.user_name;

  function fetchUserId() {
    let sql = "SELECT * FROM USERS WHERE username = ?";
    db.query(sql, [user_name], (err, result) => {
      if(err) throw err;
      user_id = result[0].user_id
      fetchTweets();
    })
  }
  
  function fetchTweets() {
    let sql = 'SELECT * FROM TWEETS WHERE user_id = ?';
    db.query(sql, [user_id], (err, result) => {
      if(err) throw err;
      res.send(result)
    })
  }

  if(user_id === "" || user_id === undefined || user_id === null) {
    fetchUserId();
  } else {
    fetchTweets();
  }
}

// tweets on homepage
const homeTweets = (req, res) => {
  let user_id = req.body.user_id;
  let user_name = req.body.user_name;
  
  function fetchTweets() {
    let sql = "select * from FOLLOWING INNER JOIN TWEETS ON FOLLOWING_ID = USER_ID INNER JOIN USERS ON FOLLOWING_ID = USERS.user_id WHERE follower_id = ?";
    db.query(sql, [user_id, user_id], (err, result) => {
      if(err) throw err;
      res.send(result)
    })
  }
  fetchTweets()
}

module.exports = { postTweet, ownTweets, homeTweets }