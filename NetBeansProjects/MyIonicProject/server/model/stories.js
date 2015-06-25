var mongoose = require('mongoose');

var storySchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    heading: {type: String, required: true},
    shortDesc: {type: String, required: true},
    story: {type: String, required: true},
    created: {type: "Date", default: Date.now()}
});

module.exports = mongoose.model('Story', storySchema);
