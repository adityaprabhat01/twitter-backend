var mysql = require("mysql");
var db = require("../database");

// like a tweet
const like = (req, res) => {
  const { user_id, author_id, tweet_id } = req.body;
  const data = {
    user_id,
    author_id,
    tweet_id,
    status: true,
  };
  let sql1 = "INSERT INTO LIKES SET ?";
  let sql2 =
    "UPDATE TWEETS SET likes_count = likes_count + 1 where tweet_id = ?";
  try {
    db.query(sql1, data, (err, result1) => {
      if (err) {
        res.status(502).send({
          error: "unable to like tweet",
        });
      } else {
        db.query(sql2, [tweet_id], (err, result2) => {
          if (err) {
            res.status(502).send({
              error: "unable to increment like count",
            });
          } else {
            res.send(data);
          }
        });
      }
    });
  } catch (err) {}
};

// unlike a tweet
const unlike = (req, res) => {
  const { user_id, author_id, tweet_id } = req.body;
  const data = {
    user_id,
    author_id,
    tweet_id,
    status: false,
  };
  let sql1 =
    "DELETE FROM LIKES WHERE user_id = ? AND author_id = ? AND tweet_id = ?";
  let sql2 =
    "UPDATE TWEETS SET likes_count = likes_count - 1 where tweet_id = ?";
  try {
    db.query(sql1, [user_id, author_id, tweet_id], (err, result1) => {
      if (err) {
        res.status(502).send({
          error: "unable to unlike tweet",
        });
      } else {
        db.query(sql2, [tweet_id], (err, result2) => {
          if (err) {
            res.status(502).send({
              error: "unable to decremenmt like count",
            });
          } else {
            res.send(data);
          }
        });
      }
    });
  } catch (err) {}
};

// send all liked tweet
const allLiked = (req, res) => {
  const { user_id } = req.body;
  let sql = "SELECT tweet_id FROM LIKES WHERE user_id = ?";
  try {
    db.query(sql, user_id, (err, result) => {
      if (err) {
        res.status(502).send({
          error: "unable to fetch all liked tweets",
        });
      } else {
        res.send(result);
      }
    });
  } catch (err) {}
};

// liked tweets + user details
const likedTweetsWithDetails = (req, res) => {
  const { user_id } = req.params;
  let sql =
    "select * from LIKES INNER JOIN TWEETS ON LIKES.tweet_id = TWEETS.tweet_id INNER JOIN USERS ON LIKES.author_id = USERS.user_id where LIKES.user_id = ?";
  try {
    db.query(sql, user_id, (err, result) => {
      if (err) {
        res.status(502).send({
          error: "unable to fetch all liked tweets",
        });
      } else {
        res.send(result);
      }
    });
  } catch (err) {}
};

module.exports = { like, allLiked, unlike, likedTweetsWithDetails };
