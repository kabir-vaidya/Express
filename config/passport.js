//Passport config file
//Create under "configs" folder, then import into app.js

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , bcrypt = require('bcryptjs')
  , User = require('../models/user');

module.exports = function(passport){
  passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password, user.password, (err, isMatch)=> {  
        if(err) throw err;
        //Password matches
        if(isMatch) {
          return done(null, user);
        }
        else
          return done(null, false, {message: "Incorrect password"})
      });
  }
 ));
 }
