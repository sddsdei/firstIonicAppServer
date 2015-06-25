var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    shortDesc: {type: String},
    desc: {type: String},
    catImage: {type: String},
    created: {type: "Date", default: Date.now()}
});

module.exports = mongoose.model('Category', categorySchema);
