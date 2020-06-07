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
    req.body.user = req.user;
    Recipe.findByIdAndRemove(req.params.id, function(err, recipe, review) {
        console.log(req.params.id);
        let idx = recipe.reviews.indexOf(review);
        console.log(idx);
        recipe.reviews.splice(idx, 1);
        recipe.save(function(err) {
            res.redirect(`/recipes/${recipe._id}`);
        });
    });
}