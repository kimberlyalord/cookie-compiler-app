const express = require('express');
const router = express.Router();
const recipesCtrl = require('../controllers/recipes');

router.get('/', recipesCtrl.index);
router.get('/new', isLoggedIn, recipesCtrl.new);
router.post('/', isLoggedIn, recipesCtrl.create);
router.get('/:id', isLoggedIn, recipesCtrl.show);

// custom middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/google');
    }
  }

module.exports = router;