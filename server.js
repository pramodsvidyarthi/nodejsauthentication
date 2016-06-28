var express = require('express');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var cookieparser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');

var mongoose = require('mongoose');
var passport = require('passport');
var passportsetting = require('./config/passport');

var database = require('./config/database');
mongoose.connect(database.url);

var app = express();
var port = process.env.PORT || 8000;
var defaultroute = require('./routes/routes');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieparser());
app.use(morgan('dev'));
app.use(flash());

app.use(session({ secret: 'nodetrials' }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use(defaultroute);
passportsetting(passport);

app.listen(port, function (){
  console.log("Express node authentication app running on port " + port);
});
