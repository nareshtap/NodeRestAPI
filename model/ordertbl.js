var ord=require("./mongo");
var mongoose = require('mongoose');

exports.getorder=function(id,res,next){
    if(id==0) {
        ord.order.find({})
            .populate('item_id')
            .sort({createdOn: -1})
            .exec()
            .then(function (result) {
                return res.json(result);
            })
            .catch(function (e) {
                return next(e);
            })
    }
};
exports.getcity=function(id,res,next){
        ord.city.find({})
            .then(function (result) {
                return res.send(result);
            })
            .catch(function (e) {
                return next(e);
            })
};
exports.getstate=function(req,res,next){
    console.log('statf');

        ord.state.find({})
            .then(function (result) {
                console.log(result);
                return res.send(JSON.stringify(result));
            })
            .catch(function (e) {
                return next(e);
            })

};
exports.initem=function(emp,res){
    var Emp=ord.item();
    Emp.price=emp.price;
    Emp.quantity=emp.quantity;
    Emp.save(function(err){
        console.log(ord.item()._id);
        if(err){
            res.send({status:0,message:"Insert failed"});
        }
        else{
            res.send({status: 1,message:"Insert Success"});
        }
    });
};
exports.inorder=function(emp,res){
    var Emp=ord.order();
    Emp.item_id=mongoose.Types.ObjectId(emp.item_id);
    Emp.save(function(err){
        if(err){
            res.send({status:0,message:"Insert failed"});
        }
        else{
            res.send({status: 1,message:"Insert Success"});
        }
    });
};

exports.register=function(emp,res){
     new ord.reg(emp).save(function(err){
        if(err){
            res.send({status:0,message:"Insert failed"});
        }
        else{
            res.send({status: 1,message:"Insert Success"});
        }
    });
};

exports.remove=function(id, res, next) {
    ord.item.findById(id).then(function (item) {
        if (item) {
            ord.item.remove({_id: id}, function (err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send({status: 0, message: "Deletion success"});
                }
            });
        }
    });
};
