const passport = require('passport');
const User = require('../models/user');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({googleId: profile.id}, function(err, user) {
        if (err) return cb(err);
        if (user) {
            // existing user returning
            if (user.avatar) {
                return cb(null, user);
            } else {
                user.avatar = profile.photos[0].value;
                user.save(function(err) {                    
                    return cb(null, user);
                });
            }
        } else {
            //  new user!
            let newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            });
            newUser.save(function(err) {
                if (err) return cb(err);
                return cb(null, newUser);
            });
        }
    });
  }
));

// called everytime a user logs in
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

//  called everytime a request comes in
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});