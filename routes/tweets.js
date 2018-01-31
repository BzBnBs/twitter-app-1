const express = require('express');
const router = express.Router();

const Tweet = require('../models/tweet');

const auth = require('../middlewares/auth');

router.get('/new', auth('/login'), (req, res, next) => {
  const { username } = req.session.currentUser;
  res.render('tweets/new', { username });
})

router.post('/', (req, res, next) => {
  const user = req.session.currentUser;
  const newTweet = {
    tweet: req.body.tweetText,
    user_id: user._id,
    user_name: user.username,
  }

  Tweet.create(newTweet)
    .then((doc) => {
      res.redirect('/profile')
    })
    .catch((err) => {
      next(err);
    })
})

module.exports = router;
