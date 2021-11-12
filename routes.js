const express = require('express');
const router = express.Router()

const { postTweet, ownTweets, homeTweets, ownRetweetedTweets } = require('./controller/tweets');
const { signIn, signUp, search } = require('./controller/users');
const { follow, unfollow, checkFollow } = require('./controller/follow');
const { like, allLiked, unlike } = require('./controller/likes');
const { retweet, unretweet, allRetweeted } = require('./controller/retweet');

// tweets
router.post('/postTweet', postTweet);
router.post('/ownTweets', ownTweets);
router.post('/homeTweets', homeTweets);
router.post('/ownRetweetedTweets', ownRetweetedTweets);

// users
router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/search', search);

// follow
router.post('/follow', follow);
router.post('/unfollow', unfollow);
router.post('/checkFollow', checkFollow);

// likes
router.post('/like', like);
router.post('/allLiked', allLiked);
router.post('/unlike', unlike);

// retweet
router.post('/retweet', retweet);
router.post('/unretweet', unretweet);
router.post('/allRetweeted', allRetweeted);

module.exports = router