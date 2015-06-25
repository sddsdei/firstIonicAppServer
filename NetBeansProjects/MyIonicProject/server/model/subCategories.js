var mongoose = require('mongoose');

var subCategorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    shortDesc: {type: String},
    desc: {type: String},
    subCatImage: {type: String},
    cat_id: {type: mongoose.Schema.Types.ObjectId, ref:'Category', required: true},
    created: {type: "Date", default: Date.now()}
});

module.exports = mongoose.model('subCategory', subCategorySchema);