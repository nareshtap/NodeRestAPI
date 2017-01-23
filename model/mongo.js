var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/demo');

var empschema = new mongoose.Schema({
    name: String,
    location:String
});

var orderSchema = new mongoose.Schema({
        item_id: {type: mongoose.Schema.Types.ObjectId, ref: 'items'}
    });

var itemSchema = new mongoose.Schema({
    price: Number,
    quantity: Number
});


exports.getByItemsId = function (id) {
    return item.statics.findById(id)
        .then(function (item) {
            if (item) {
                return item;
            }
            const err = new APIError('item not found"', httpStatus.NOT_FOUND);
            return Promise.reject(err);
        });
};

exports.getByOrderId = function (id) {
    return order.findById(id).populate('item_id').exec()
        .then(function (order) {
            if (order) {
                return order;
            }
            const err = new APIError('order not found"', httpStatus.NOT_FOUND);
            return Promise.reject(err);
        });
};

exports.em = mongoose.model('employee', empschema);

exports.order=mongoose.model('order', orderSchema);

exports.item=mongoose.model('items', itemSchema);
