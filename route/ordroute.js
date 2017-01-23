var data=require("../model/ordertbl");

exports.ordroute= function(app){
    app.get('/order/',function(req,res){
        data.getorder(0,res);
    });
    app.post('/order/',function(req,res){
        data.initem(req.body,res);
    });
    app.post('/order/1',function(req,res){
        data.inorder(req.body,res);
    });
    app.delete('/items/:id',function(req,res){
        data.remove(req.params.id,res);
    });
};