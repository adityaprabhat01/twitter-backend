const mongoose = require('mongoose')
const Schema = mongoose.Schema


const commentSchema = new Schema({
  tweet_id: {
    type: String
  },
  author_id: {
    type: String
  },
  author_name: {
    type: String
  },
  author_username: {
    type: String
  },
  comment_text: {
    type: String
  },
  reply: [{
    reply_id: {
      type: mongoose.Schema.Types.ObjectId
    },
    reply: {
      type: String
    },
    replies: [{
      type: Array
    }],
    author_id: {
      type: String
    },
    author_name: {
      type: String
    },
    author_username: {
      type: String
    }
  }]
})

const Comment = mongoose.model('Comments', commentSchema)
module.exports = Comment