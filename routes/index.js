const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Tweet = require('../models/tweet');

const authMiddleware = require('../middlewares/auth');
const ensureLogin = require('connect-ensure-login');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/profile', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const { _id, username } = req.user;
  console.log(`
    💣💣💣💣💣
    ahora tengo diferentes metodos
    - Para saber el usuario req.user ${req.user}
    - Saber si estoy logueado req.isAuthenticated() ${req.isAuthenticated()}
    `);
  console.log('session', req.session);
  Tweet.find({ user_id: _id })
    .populate('user_id')
    .exec((err, tweets) => {
      if (err) {
        next(err);
      } else {
        // console.log('tweets', tweets);
        res.render('profile', { username, tweets });
      }
    });
});

router.get('/timeline', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const { _id, username } = req.user;
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
      next(err);
    });
});

module.exports = router;
