const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    recipeName: String,
    image: String,
    ingredients: String,
    directions: String,
    attribute: [{
        type: Schema.Types.ObjectId,
        ref: 'Attribute'
    }],
    // reviews: [reviewSchema]
});

module.exports = mongoose.model('Recipe', recipeSchema);