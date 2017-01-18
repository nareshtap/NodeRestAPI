var data=require("../model/emptbl");

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
};