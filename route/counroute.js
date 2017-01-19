var data=require("../model/countbl");

exports.counroute= function(app){
        app.get('/country/',function(req,res){
        data.getcoun(0,res);
    });
    app.get('/country/:id',function(req,res){
        data.getcoun(req.params.id,res);
    });

};