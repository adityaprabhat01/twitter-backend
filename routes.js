const express = require('express');
const router = express.Router()

const { postTweet, ownTweets } = require('./controller/tweets');
const { signIn, signUp, search } = require('./controller/users');
const { follow, unfollow } = require('./controller/follow');

// tweets
router.post('/postTweet', postTweet)
router.post('/ownTweets', ownTweets)

// users
router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/search', search);

// follow
router.post('/follow', follow);
router.post('/unfollow', unfollow);

module.exports = router