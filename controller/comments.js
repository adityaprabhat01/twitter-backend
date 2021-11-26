const mongoose = require('mongoose')
const Comments = require('../model/comment')

// post a comment
const postComment = async (req, res) => {
  const comment = new Comments({
    tweet_id: req.body.tweet_id,
    author_id: req.body.author_id,
    author_name: req.body.authorß_name,
    author_username: req.body.author_username,
    comment_text: req.body.comment_text,
    reply: []
  })

  await comment.save()
  .then(() => res.send(comment))
  .catch(err => res.send('error'))
}

module.exports = { postComment }