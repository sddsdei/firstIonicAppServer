var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    shortDesc: {type: String},
    desc: {type: String},
    prodImage: {type: String},
    cat_id: {type: mongoose.Schema.Types.ObjectId, ref:'Category', required: true},
    subCat_id: {type: mongoose.Schema.Types.ObjectId, ref:'subCategory', required: true},
    created: {type: "Date", default: Date.now()}
});

module.exports = mongoose.model('Product', productSchema);