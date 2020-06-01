const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    recipeName: String,
    image: String,
    ingredients: String,
    directions: String,
    // attribute: [attibuteSchema],
    // reviews: [reviewSchema]
});

module.exports = mongoose.model('Recipe', recipeSchema);