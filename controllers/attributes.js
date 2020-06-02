const Attribute = require('../models/attribute');
const Recipe = require('../models/recipe');

module.exports = {
    addToRecipe
};

function addToRecipe(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        recipe.attribute.push(req.body.attributeId);
        recipe.save(function(err) {
            res.redirect(`/recipes/${recipe._id}`);
        });
    });
}