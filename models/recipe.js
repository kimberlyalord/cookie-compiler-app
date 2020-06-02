const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    recipeName: String,
    image: String,
    ingredients: String,
    directions: String,
    attributes: [{
        type: Schema.Types.ObjectId,
        ref: 'Attribute'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    // reviews: [reviewSchema]
});

module.exports = mongoose.model('Recipe', recipeSchema);