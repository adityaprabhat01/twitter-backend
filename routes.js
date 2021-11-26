const express = require('express');
const router = express.Router()

const { postTweet, ownTweets, homeTweets, ownRetweetedTweets, deleteTweet, likeCount, commentCount } = require('./controller/tweets');
const { signIn, signUp, search, checkExistence } = require('./controller/users');
const { follow, unfollow, checkFollow } = require('./controller/follow');
const { like, allLiked, unlike } = require('./controller/likes');
const { retweet, unretweet, allRetweeted } = require('./controller/retweet');
const { postComment } = require('./controller/comments');
const { fetchThread } = require('./controller/thread');

// tweets
router.post('/postTweet', postTweet);
router.post('/ownTweets', ownTweets);
router.post('/homeTweets', homeTweets);
router.post('/ownRetweetedTweets', ownRetweetedTweets);
router.post('/deleteTweet', deleteTweet);
router.get('/likeCount/:tweet_id', likeCount);
router.get('/commentCount/:tweet_id', commentCount);

// users
router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/search', search);
router.get('/checkExistence/:user_name', checkExistence);

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

// comments
router.post('/postComment', postComment);

// thread
router.get('/fetchThread/:tweet_id', fetchThread);

module.exports = router