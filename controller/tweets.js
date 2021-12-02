const { v4: uuidv4 } = require('uuid');
var mysql = require('mysql');
const mongoose = require('mongoose')
var db = require('../database')
var moment = require('moment');
const Comment = require('../model/comment')

// post
const postTweet = async (req, res) => {
  let data = {
    tweet_id: uuidv4(),
    tweet: req.body.tweet,
    user_id: req.body.user_id,
    author_id: req.body.author_id,
    self_liked: false,
    self_retweeted: false,
    posted_on: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    likes_count: 0,
    retweet_count: 0
  }

  let sql = 'INSERT INTO TWEETS SET ?'
  db.query(sql, data, (err, result) => {
    if(err) throw err;
    data['name'] = req.body.name;
    data['user_name'] = req.body.user_name;
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
    let sql = 'SELECT * FROM TWEETS INNER JOIN USERS WHERE USERS.user_id = ? and TWEETS.user_id = ?';
    db.query(sql, [user_id, user_id], (err, result) => {
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

// tweets a user retweeted
const ownRetweetedTweets = (req, res) => {
  const { user_id } = req.body;
  let sql = "select * from RETWEETS INNER JOIN USERS ON RETWEETS.author_id = USERS.user_id INNER JOIN TWEETS ON TWEETS.tweet_id = RETWEETS.tweet_id where RETWEETS.user_id = ? and RETWEETS.author_id <> ?"
  db.query(sql, [user_id, user_id], (err, result) => {
    if(err) throw err;
    res.send(result)
  }) 
}

// delete tweet
const deleteTweet = (req, res) => {
  const { tweet_id, user_id, profile_id } = req.body
  let data = {
    tweet_id,
    user_id,
    profile_id
  }
  let sql = "delete from TWEETS where tweet_id = ?"
  if(user_id !== profile_id) {
    let obj = {
      err: 'Cannot delete tweet'
    }
    res.send(obj)
  } else {
    db.query(sql, [tweet_id], (err, result) => {
      if(err) throw err;
      res.send(data)
    })
  }
}

const likeCount = (req, res) => {
  const tweet_id = req.params.tweet_id
  let sql = "select count(*) from LIKES WHERE LIKES.tweet_id = ?"
  db.query(sql, [tweet_id], (err, result) => {
    let obj = {
      count: result[0]['count(*)']
    }
    res.send(obj)
  })
}

const commentCount = async (req, res) => {
  const tweet_id = req.params.tweet_id
  await Comment.find({
    tweet_id
  })
  .then(data => {
    let obj = {
      count: data.length
    }
    res.send(obj)
  })
  .catch(err => {
    console.log(err)
  })
}

module.exports = { postTweet, ownTweets, homeTweets, ownRetweetedTweets, deleteTweet, likeCount, commentCount }