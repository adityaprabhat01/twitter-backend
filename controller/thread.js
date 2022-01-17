var mysql = require("mysql");
var db = require("../database");
const mongoose = require("mongoose");
const Comment = require("../model/comment");

// fetch tweet data and comments
const fetchThread = (req, res) => {
  const tweet_id = req.params.tweet_id;
  let sql =
    "select * from TWEETS INNER JOIN USERS ON TWEETS.user_id = USERS.user_id and TWEETS.tweet_id =  ?";
  try {
    db.query(sql, [tweet_id], async (err, result) => {
      if (err || result.length === 0) {
        res.status(502).send({
          error: "Unable to fetch thread",
        });
      } else {
        result[0]["comments"] = [];
        res.send(result);
      }
    });
  } catch (err) {}
};

module.exports = { fetchThread };
