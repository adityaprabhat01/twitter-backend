const { v4: uuidv4 } = require("uuid");
var mysql = require("mysql");
const mongoose = require("mongoose");
var db = require("../database");
var moment = require("moment");
const Comment = require("../model/comment");

// post
const postTweet = async (req, res) => {
  let data = {
    tweet_id: uuidv4(),
    tweet: req.body.tweet,
    user_id: req.body.user_id,
    author_id: req.body.author_id,
    self_liked: false,
    self_retweeted: false,
    posted_on: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    likes_count: 0,
    retweet_count: 0,
    comment_count: 0,
  };

  let sql = "INSERT INTO TWEETS SET ?";
  try {
    db.query(sql, data, (err, result) => {
      if (err) {
        res.status(502).send({
          error: "Tweet was not posted",
        });
      } else {
        data["name"] = req.body.name;
        data["username"] = req.body.user_name;
        res.send(data);
      }
    });
  } catch (err) {}
};

// tweets on profile page
const ownTweets = async (req, res) => {
  let user_id = req.body.user_id;
  let user_name = req.body.user_name;

  function fetchUserId() {
    let sql = "SELECT * FROM USERS WHERE username = ?";
    try {
      db.query(sql, [user_name], (err, result) => {
        if (err) {
          res.status(502).send({
            error: "Unable to fetch tweets",
          });
        } else {
          user_id = result[0].user_id;
          fetchTweets();
        }
      });
    } catch (err) {}
  }

  function fetchTweets() {
    let sql =
      "SELECT * FROM TWEETS INNER JOIN USERS WHERE USERS.user_id = ? and TWEETS.user_id = ?";
    db.query(sql, [user_id, user_id], (err, result) => {
      if (err) {
        res.status(502).send({
          error: "Unable to fetch tweets",
        });
      } else {
        res.send(result);
      }
    });
  }

  if (user_id === "" || user_id === undefined || user_id === null) {
    fetchUserId();
  } else {
    fetchTweets();
  }
};

// tweets on homepage
const homeTweets = (req, res) => {
  let user_id = req.body.user_id;
  let user_name = req.body.user_name;

  function fetchTweets() {
    let sql =
      "select * from FOLLOWING INNER JOIN TWEETS ON FOLLOWING_ID = USER_ID INNER JOIN USERS ON FOLLOWING_ID = USERS.user_id WHERE follower_id = ?";
    db.query(sql, [user_id, user_id], (err, result) => {
      if (err) {
        res.status(502).send({
          error: "Unable to fetch tweets",
        });
      }
      res.send(result);
    });
  }
  try {
    fetchTweets();
  } catch (err) {}
};

// tweets a user retweeted
const ownRetweetedTweets = (req, res) => {
  const { user_id } = req.body;
  let sql =
    "select * from RETWEETS INNER JOIN USERS ON RETWEETS.author_id = USERS.user_id INNER JOIN TWEETS ON TWEETS.tweet_id = RETWEETS.tweet_id where RETWEETS.user_id = ? and RETWEETS.author_id <> ?";
  try {
    db.query(sql, [user_id, user_id], (err, result) => {
      if (err) {
        res.status(502).send({
          error: "Unable to fetch tweets",
        });
      } else {
        res.send(result);
      }
    });
  } catch (err) {}
};

// delete tweet
const deleteTweet = (req, res) => {
  const { tweet_id, user_id, profile_id } = req.body;
  let data = {
    tweet_id,
    user_id,
    profile_id,
  };
  let sql = "delete from TWEETS where tweet_id = ?";
  if (user_id !== profile_id) {
    let obj = {
      err: "Cannot delete tweet",
    };
    res.send(obj);
  } else {
    try {
      db.query(sql, [tweet_id], (err, result) => {
        if (err) {
          res.status(502).send({
            error: "Unable to delete tweet",
          });
        } else {
          res.send(data);
        }
      });
    } catch (err) {}
  }
};

const likeCount = (req, res) => {
  const tweet_id = req.params.tweet_id;
  let sql = "select count(*) from LIKES WHERE LIKES.tweet_id = ?";
  try {
    db.query(sql, [tweet_id], (err, result) => {
      if (err) {
        res.status(502).send({
          error: "Unable to fetch likes",
        });
      } else {
        let obj = {
          count: result[0]["count(*)"],
        };
        res.send(obj);
      }
    });
  } catch (err) {}
};

module.exports = {
  postTweet,
  ownTweets,
  homeTweets,
  ownRetweetedTweets,
  deleteTweet,
  likeCount,
};
