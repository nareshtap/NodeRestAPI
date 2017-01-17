var data=require("./getData");

exports.route= function(app){
    app.get('/employee/',function(req,res){
         data.get(res,0);
    });
    app.get('/employee/:id',function(req,res){
        data.get(res,req.params.id);
    });
};