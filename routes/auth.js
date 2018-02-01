const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('../middlewares/passport');

const User = require('../models/user');

/* GET home page. */
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  if (username === '' || password === '') {
    const error = 'Usuario y password no pueden estar vacios';
    res.render('auth/signup', { error });
  } else {
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync(password, salt);

          const newUser = {
            username,
            password: hashPass,
          };

          User.create(newUser)
            .then((doc) => {
              res.redirect('/');
            })
            .catch((err) => {
              req.flash('error', 'Problema al crear el usuario')
              res.redirect('/signup');
            });
        } else {
          req.flash('error', 'Usuario ya existente')
          res.redirect('/signup')
        }
      })
      .catch((err) => {
        next(err);
      });
  }
});

router.get('/login', (req, res, next) => {
  res.render('auth/login', { message: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true,
}));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
