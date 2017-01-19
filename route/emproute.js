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
       var Emp=new emp();
       Emp.name=req.body.name;
        Emp.location=req.body.location;
        Emp.save(function(err){
            if(err){
                res.send({status:0,message:"Insert failed"});
            }
            else{
                res.send({status: 1,message:"Insert Success"});
            }
        });
    });
    app.get('/employee1/',function(req,res){
        emp.find(function (err,result) {
            if(err){

            }
            else{
                res.send(JSON.stringify(result));
            }
        });
    });
    app.get('/employee1/:employee_id',function(req,res){
        emp.findById(req.params.employee_id, function(err, result) {
            if (err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        });
    });
    app.delete('/employee1/:id',function(req,res){
        emp.remove({_id:req.params.id},function (err,result) {
            if(err){
                res.send(err);
            }
            else{
                res.send({status:0,message:"Deletion success"});
            }
        });
    });
};
