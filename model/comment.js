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
  replies: [{
    reply_id: {
      type: mongoose.Schema.Types.ObjectId
    },
    reply: {
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
    replies: [{
      type: Array
    }]
  }]
})

const Comment = mongoose.model('Comments', commentSchema)
module.exports = Comment