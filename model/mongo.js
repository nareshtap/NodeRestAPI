var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/demo');

var empschema = new mongoose.Schema({
    name: String,
    location:String
});

module.exports = mongoose.model('employee', empschema);