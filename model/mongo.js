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


var regSchema = new mongoose.Schema({
    name : { type:String },
    image : { type:String },
    email : { type:String },
    status : { type:String },
    state : { type:String },
    city : {type:String},
    gender : { type:String }
});
var stateschema=new mongoose.Schema({
    Id: {type: Number },
    state: {type: String }
});

var cityschema=new mongoose.Schema({
    Id:{type: Number},
    city:{type:String},
    stateId:{type:String}
});

var itemSchema = new mongoose.Schema({
    price: Number,
    quantity: Number
});

exports.em = mongoose.model('employees', empschema);

exports.order=mongoose.model('order', orderSchema);

exports.city=mongoose.model('city', cityschema);

exports.state=mongoose.model('state', stateschema);

exports.reg=mongoose.model('registers', regSchema);

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