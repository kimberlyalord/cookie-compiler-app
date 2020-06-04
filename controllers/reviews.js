const Recipe = require('../models/recipe');

module.exports = {
    create,
    delete: deleteReview
};

function create(req, res) {
    req.body.user = req.user;
    Recipe.findById(req.params.id, function(err, recipe) {
        recipe.reviews.push(req.body);
        recipe.save(function(err) {
            res.redirect(`/recipes/${recipe._id}`);
        });
    });
}

function deleteReview(req, res) {
    Review.findById(req.params.id, function(err, review) {
        if(!review.user.equals(req.user._id)) return res.redirect(`/recipes/${recipe._id}`);
        Review.findByIdAndRemove(req.params.id, function(err, review) {
            res.redirect(`/recipes/${recipe._id}`);
        });
    });
}