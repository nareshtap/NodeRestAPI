var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/demo');

var empschema = mongoose.Schema({
    name : { type:String },
    occupation: { type:String },
    gender : { type:String },
    age : { type:Number }
});

var orderSchema = new mongoose.Schema({
        item_id: {type: mongoose.Schema.Types.ObjectId, ref: 'items'}
    });

var itemSchema = new mongoose.Schema({
    price: Number,
    quantity: Number
});

exports.em = mongoose.model('employees', empschema);

exports.order=mongoose.model('order', orderSchema);

exports.item=mongoose.model('items', itemSchema);

exports.employeeList = function(condition, fields, callback) {
    if (!fields)
        fields = {};

    empschema.find(condition, fields, callback);
}

//update employee
exports.employeeEdit = function(condition, data, callback) {
    empschema.update(condition, data, callback);

}
//save employee
exports.employeeAdd = function(data, callback) {
    console.log("data"+data);
    new empschema(data).save(callback);

}
//delete employee
exports.employeeDelete =function(condition, callback) {
    empschema.remove(condition, callback);
}