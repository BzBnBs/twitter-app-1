const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user, cb) => {
  console.log(`
    💥💥💥💥💥💥
    ***** passport.serializeUser *****
    SerializeUser se encarga de coger los datos que enviamos de LocalStrategy en este caso user.username ${user.username}
    y meterlos dentro de la sesion.
    Este metodo se llama al hacer login gracias al middleware passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: false,
      passReqToCallback: true,
    })
    💥💥💥💥💥💥
  `, user);
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  console.log(`
    💥💥💥💥💥💥 
    cada vez que hay una peticion que tiene que esta protegida pilla los datos de la session y me los mete en el objeto req 
    💥💥💥💥💥💥`);

  User.findOne({ _id: id }, (err, user) => {
    if (err) { return cb(err); }
    console.log('deserializeUser valor de user', user);
    cb(null, user);
  });
});

passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
  console.log(`
    💥💥💥💥💥💥
    ***** LocalStrategy *****
    Establecemos la estrategia que vamos a usar es decir que es lo que queremos hacer en el login.
    1. - Buscamos usuario segun lo que nos viene del form
    2. - Tratamos los errores y llamamos al siguiente middleware.
    en este caso llamamos a SerializeUser
    💥💥💥💥💥💥
  `);

  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: 'Incorrect username' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: 'Incorrect password' });
    }
    console.log('datos que enviamos al serializer', user);
    return next(null, user);
  });
}));

module.exports = passport;
