const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Tweet = require('../models/tweet');

const authMiddleware = require('../middlewares/auth');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/profile', authMiddleware('/login'), (req, res, next) => {
  const { _id, username } = req.session.currentUser;

  Tweet.find({ user_id: _id })
    .populate('user_id')
    .exec((err, tweets) => {
      if (err) {
        next(err);
      } else {
        console.log('tweets', tweets);
        res.render('profile', { username, tweets });
      }
    });
});

router.get('/timeline', authMiddleware('/login'), (req, res, next) => {
  const { _id, username } = req.session.currentUser;
  Tweet.find({ user_id: _id })
    .populate('user_id')
    .exec()
    .then((tweets) => {
      res.render('profile', {
        username,
        tweets,
      });
    })
    .catch((err) => {
      next(err)
    });
});

module.exports = router;
