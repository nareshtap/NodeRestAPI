var data=require("./getData");

exports.route= function(app){
    app.get('/employee/',function(req,res){
         data.getemp(0,res);
    });
    app.get('/employee/:id',function(req,res){
        data.getemp(req.params.id,res);
    });
    app.get('/country/',function(req,res){
        data.getcoun(0,res);
    });
    app.get('/country/:id',function(req,res){
        data.getcoun(req.params.id,res);
    });
    app.post('/employee/',function(req,res){
        data.insertemp(req.body,res);
    });
};