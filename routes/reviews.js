const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.post('/recipes/:id/reviews', reviewsCtrl.create);
router.delete('/recipes/:id/reviews', reviewsCtrl.delete);

module.exports = router;