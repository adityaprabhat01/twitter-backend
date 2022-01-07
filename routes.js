const express = require('express');
const router = express.Router()

const { postTweet, ownTweets, homeTweets, ownRetweetedTweets, deleteTweet, likeCount } = require('./controller/tweets');
const { signIn, signUp, search, checkExistence, logOut } = require('./controller/users');
const { follow, unfollow, checkFollow, followerList, followingList } = require('./controller/follow');
const { like, allLiked, unlike, likedTweetsWithDetails } = require('./controller/likes');
const { retweet, unretweet, allRetweeted } = require('./controller/retweet');
const { plusComment, minusComment, commentCount } = require('./controller/comments');
const { fetchThread } = require('./controller/thread');
const { verifyAuth } = require('./middleware/auth');

// tweets
router.post('/postTweet', verifyAuth, postTweet);
router.post('/ownTweets', verifyAuth, ownTweets);
router.post('/homeTweets', verifyAuth, homeTweets);
router.post('/ownRetweetedTweets', verifyAuth, ownRetweetedTweets);
router.post('/deleteTweet', verifyAuth, deleteTweet);
router.get('/likeCount/:tweet_id', verifyAuth, likeCount);

// users
router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/search', verifyAuth, search);
router.get('/checkExistence/:user_name', verifyAuth, checkExistence);
router.get('/logout', verifyAuth, logOut);

// follow
router.post('/follow', verifyAuth, follow);
router.post('/unfollow', verifyAuth, unfollow);
router.post('/checkFollow', verifyAuth, checkFollow);
router.get('/followerList/:following_id', verifyAuth, followerList);
router.get('/followingList/:follower_id', verifyAuth, followingList);

// likes
router.post('/like', verifyAuth, like);
router.post('/allLiked', verifyAuth, allLiked);
router.post('/unlike', verifyAuth, unlike);
router.get('/likedTweetsWithDetails/:user_id', verifyAuth, likedTweetsWithDetails);

// retweet
router.post('/retweet', verifyAuth, retweet);
router.post('/unretweet', verifyAuth, unretweet);
router.post('/allRetweeted', verifyAuth, allRetweeted);

// comments
router.get('/plusComment/:tweet_id', verifyAuth, plusComment);
router.get('/minusComment/:tweet_id', verifyAuth, minusComment);
router.get('/commentCount/:tweet_id', verifyAuth, commentCount)

// thread
router.get('/fetchThread/:tweet_id', verifyAuth, fetchThread);

module.exports = router