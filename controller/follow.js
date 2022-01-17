var mysql = require("mysql");
var db = require("../database");

const follow = (req, res) => {
  const { follower_id, following_id } = req.body;
  let data = {
    follower_id,
    following_id,
  };

  let sql = "INSERT INTO FOLLOWING SET ?";
  try {
    db.query(sql, data, (err, result) => {
      if (err) {
        res.status(502).send({
          error: "Unable to follow",
        });
      } else {
        res.send(data);
      }
    });
  } catch (err) {}
};

const unfollow = (req, res) => {
  const { follower_id, following_id } = req.body;
  let data = {
    follower_id,
    following_id,
  };

  let sql = "DELETE FROM FOLLOWING WHERE follower_id = ? and following_id = ?";
  try {
    db.query(sql, [follower_id, following_id], (err, result) => {
      if (err) {
        res.status(502).send({
          error: "Unable to unfollow",
        });
      } else {
        res.send(data);
      }
    });
  } catch (err) {}
};

// check for follow
const checkFollow = (req, res) => {
  const { follower_id, following_id } = req.body;
  let sql =
    "SELECT * FROM FOLLOWING WHERE follower_id = ? and following_id = ?";
  db.query(sql, [follower_id, following_id], (err, result) => {
    try {
      if (err) {
        res.status(502).send({
          error: "Unable to check for follow",
        });
      } else {
        res.send(result);
      }
    } catch (err) {}
  });
};

// following list
const followingList = (req, res) => {
  const { follower_id } = req.params;
  let sql =
    "select * from FOLLOWING INNER JOIN USERS ON following_id = user_id WHERE follower_id = ?";
  try {
    db.query(sql, [follower_id], (err, result) => {
      if (err) {
        res.status(502).send({
          error: "Unable to fetch the following list",
        });
      } else {
        res.send(result);
      }
    });
  } catch (err) {}
};

// follower list
const followerList = (req, res) => {
  const { following_id } = req.params;
  let sql =
    "select * from FOLLOWING INNER JOIN USERS ON follower_id = user_id WHERE following_id = ?";
  try {
    db.query(sql, [following_id], (err, result) => {
      if (err) {
        res.status(502).send({
          error: "Unable to fetch the followers list",
        });
      } else {
        res.send(result);
      }
    });
  } catch (err) {}
};

module.exports = { follow, unfollow, checkFollow, followingList, followerList };
