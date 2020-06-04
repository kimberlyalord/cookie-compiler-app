const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: String,
    rating: {type: Number, min: 1, max: 5, default: 5},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const recipeSchema = new Schema({
    recipeName: String,
    image: String,
    ingredients: String,
    directions: String,
    attributes: [{
        type: Schema.Types.ObjectId,
        ref: 'Attribute'
    }],
    reviews: [reviewSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);