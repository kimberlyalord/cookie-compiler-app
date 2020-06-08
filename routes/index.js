const express = require('express');
const router = express.Router();

// render index page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cookie Compiler' });
});

module.exports = router;