var db = require('../database')

const plusComment = (req, res) => {
  const { tweet_id, count } = req.params;
  let sql1 = "SELECT comment_count FROM TWEETS WHERE tweet_id = ?"
  let sql2 = "UPDATE TWEETS SET comment_count = comment_count + 1 where tweet_id = ?"

  db.query(sql1, [tweet_id], (err, result1) => {
    if(err) throw err;
    db.query(sql2, [tweet_id], (err, result2) => {
      if(err) throw err;
      const obj = {
        comment_count: result1[0].comment_count + 1
      }
      res.send(obj);
    })
  }) 
}

const minusComment = (req, res) => {
  const { tweet_id, count } = req.params;
  let sql1 = "SELECT comment_count FROM TWEETS WHERE tweet_id = ?"
  let sql2 = "UPDATE TWEETS SET comment_count = comment_count - 1 where tweet_id = ?"

  db.query(sql1, [tweet_id], (err, result1) => {
    if(err) throw err;
    db.query(sql2, [tweet_id], (err, result2) => {
      if(err) throw err;
      const obj = {
        comment_count: result1[0].comment_count - 1
      }
      res.send(obj);
    })
  }) 
}

const commentCount = (req, res) => {
  const { tweet_id } = req.params;
  let sql = "SELECT comment_count FROM TWEETS WHERE tweet_id = ?"
  db.query(sql, [tweet_id], (err, result) => {
    if(err) throw err;
    res.send(result[0])
  })
}

module.exports = { plusComment, minusComment, commentCount }