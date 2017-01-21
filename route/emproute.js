var data=require("../model/emptbl");
var emp=require("../model/mongo");

exports.emproute= function(app){
    app.get('/employee/',function(req,res){
        data.getemp(0,res);
    });
    app.get('/employee/:id',function(req,res){
        data.getemp(req.params.id,res);
    });
    app.post('/employee/',function(req,res){
        data.insertemp(req.body,res);
    });
    app.delete('/employee/:id',function(req,res){
        data.deletemp(req.params.id,res);
    });
    app.put('/employee/',function(req,res){
        data.updatemp(req.body,res);
    });
    app.post('/employee1/',function(req,res){
        data.inempmon(req.body,res);
    });
    app.get('/employee1/',function(req,res){
        data.selempmon(0,res);
    });
    app.get('/employee1/:id',function(req,res){
        data.selempmon(req.params.id,res);
    });
    app.delete('/employee1/:id',function(req,res){
        data.delempmon(req.params.id,res);
    });
    app.put('/employee1/',function(req,res){
        data.upempmon(req.body,res);
    });

};