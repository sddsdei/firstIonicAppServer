var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    shortDesc: {type: String},
    description: {type: String},
    quantity: {type: Number},
    price: {type: Number},
    images: {type: Array},
    cat_id: {type: mongoose.Schema.Types.ObjectId, ref:'Category', required: true},
    subCat_id: {type: mongoose.Schema.Types.ObjectId, ref:'subCategory', required: true},
    created: {type: "Date", default: Date.now()}
});

module.exports = mongoose.model('Product', productSchema);