var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/exam');
mongoose.connect('mongodb://192.155.246.146:27017/exam');

module.exports = mongoose.connection;