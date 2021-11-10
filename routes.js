const express = require('express');
const router = express.Router()

const { postTweet, ownTweets, homeTweets } = require('./controller/tweets');
const { signIn, signUp, search } = require('./controller/users');
const { follow, unfollow } = require('./controller/follow');
const { like, allLiked, unlike } = require('./controller/likes');

// tweets
router.post('/postTweet', postTweet);
router.post('/ownTweets', ownTweets);
router.post('/homeTweets', homeTweets);

// users
router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/search', search);

// follow
router.post('/follow', follow);
router.post('/unfollow', unfollow);

// likes
router.post('/like', like);
router.post('/allLiked', allLiked);
router.post('/unlike', unlike);

module.exports = router