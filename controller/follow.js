var mysql = require('mysql');
var db = require('../database')

const follow = (req, res) => {
  const { follower_id, following_id } = req.body;
  let data = {
    follower_id,
    following_id
  }

  let sql = "INSERT INTO FOLLOWING SET ?"
  db.query(sql, data, (err, result) => {
    if(err) throw err;
    res.send(data)
  })
}

const unfollow = (req, res) => {
  const { follower_id, following_id } = req.body;
  let data = {
    follower_id,
    following_id
  }

  let sql = "DELETE FROM FOLLOWING WHERE follower_id = ? and following_id = ?"
  db.query(sql, [follower_id, following_id], (err, result) => {
    if(err) throw err;
    console.log(result)
    res.send(data)
  })
}

module.exports = { follow, unfollow }