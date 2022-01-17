var db = require("../database");

const plusComment = (req, res) => {
  const { tweet_id, count } = req.params;
  let sql1 = "SELECT comment_count FROM TWEETS WHERE tweet_id = ?";
  let sql2 =
    "UPDATE TWEETS SET comment_count = comment_count + 1 where tweet_id = ?";
  try {
    db.query(sql1, [tweet_id], (err, result1) => {
      if (err) {
        res.status(502).send({
          error: "Unable to increment comment count",
        });
      } else {
        db.query(sql2, [tweet_id], (err, result2) => {
          if (err) {
            res.status(502).send({
              error: "Unable to increment comment count",
            });
          } else {
            const obj = {
              comment_count: result1[0].comment_count + 1,
            };
            res.send(obj);
          }
        });
      }
    });
  } catch (err) {}
};

const minusComment = (req, res) => {
  const { tweet_id, count } = req.params;
  let sql1 = "SELECT comment_count FROM TWEETS WHERE tweet_id = ?";
  let sql2 =
    "UPDATE TWEETS SET comment_count = comment_count - 1 where tweet_id = ?";
  try {
    db.query(sql1, [tweet_id], (err, result1) => {
      if (err) {
        res.status(502).send({
          error: "Unable to decrement comment count",
        });
      } else {
        db.query(sql2, [tweet_id], (err, result2) => {
          if (err) {
            res.status(502).send({
              error: "Unable to decrement comment count",
            });
          } else {
            const obj = {
              comment_count: result1[0].comment_count - 1,
            };
            res.send(obj);
          }
        });
      }
    });
  } catch (err) {}
};

const commentCount = (req, res) => {
  const { tweet_id } = req.params;
  let sql = "SELECT comment_count FROM TWEETS WHERE tweet_id = ?";
  try {
    db.query(sql, [tweet_id], (err, result) => {
      if (err) {
        res.status(502).send({
          error: "Unable to fetch comment count",
        });
      } else {
        res.send(result[0]);
      }
    });
  } catch (err) {}
};

module.exports = { plusComment, minusComment, commentCount };
