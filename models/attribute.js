const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attributeSchema = new Schema({
    attributeName: String
});

module.exports = mongoose.model('Attribute', attributeSchema);