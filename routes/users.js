var express = require('express');
var router = express.Router();
const passport = require('passport');

// Google OAuth login route
router.get('/auth/google', passport.authenticate('google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate('google',
  {
    successRedirect: '/recipes',
    failureRedirect: '/recipes'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/recipes');
});

module.exports = router;