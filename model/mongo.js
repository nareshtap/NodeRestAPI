var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/d');

var empschema = new mongoose.Schema({
    name: String,
    location:String
});

var orderSchema = new mongoose.Schema({
        item_id: [{type: mongoose.Schema.ObjectId, ref: 'items'}]
    });

var itemSchema = new mongoose.Schema({
    price: Number,
    quantity: Number
});

exports.em = mongoose.model('employee', empschema);

exports.order=mongoose.model('order', orderSchema);

exports.item=mongoose.model('items', itemSchema);
