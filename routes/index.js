var express = require('express');
var router = express.Router();

// render index page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cookie Compiler' });
});

module.exports = router;