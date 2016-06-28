var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    console.log('serialize called now');
    done(null, user.id)  ;
  });

  passport.deserializeUser(function (id, done) {
    console.log('deserialize called now');
    User.findById(id, function (err, user){
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
      process.nextTick(function (){
        User.findOne({ 'local.email': email }, function (err, user){
          if(err) return done(err);
          if(user) {
            return done(null, false, req.flash('signupMessage', 'The email-id is already taken, try another...'));
          } else {
            var newUser = new User();

            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);

            newUser.save(function (err){
              if(err) throw err;

              return done(null, newUser);
            });
          }

        });
      });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done){
      User.findOne({ 'local.email': email }, function (err, user){
        if(err) return done(err);

        if(!user) return done(null, false, req.flash('loginMessage', 'No user found'));

        if(!user.validatePassword(password)) return done(null, false, req.flash('loginMessage', 'Oops...!!! Wrong password'));

        return done(null, user);
      });
  }));
}
