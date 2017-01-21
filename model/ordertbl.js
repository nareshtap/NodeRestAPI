var ord=require("./mongo");

exports.getorder=function(id,res){
    if(id==0) {
        ord.order.find(function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(JSON.stringify(result, null, "\t"));
            }
        });
    }
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
    Emp.item_id=ord.item()._id;
    Emp.save(function(err){
        if(err){
            res.send({status:0,message:"Insert failed"});
        }
        else{
            res.send({status: 1,message:"Insert Success"});
        }
    });
};