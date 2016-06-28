var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index.ejs');
});

router.get('/login', function (req, res) {
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get('/signup', function (req, res) {
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

router.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile.ejs', { user: req.user });
});

router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}),function () {
  console.log(arguments[0], arguments[1]);
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();

  res.redirect('/')
}

module.exports = router;
