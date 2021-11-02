const express = require('express')
const router = express.Router()

const { postTweet } = require('./controller/tweets');
const { addUser } = require('./controller/users');

// tweets
router.post('/postTweet', postTweet)

// users
router.post('/addUser', addUser)

module.exports = router