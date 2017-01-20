var db=require('../db');
var empl=require('./mongo');

exports.getemp = function(id,res) {
    db.connect(function(err, con) {
        if(id==0)
        {
            qry = 'select * from employees';
            con.query(qry, function(err, result) {
                con.release();

                res.send(JSON.stringify(result));
            });
        }
        else {
            con.query('select * from employees where id = ?',[id], function(err, result) {
                if(err){console.log("select id error " + err.stack);}
                con.release();

                debugger;
                if(result.length != 0){
                    res.send(JSON.stringify(result));
                    return;
                }
                res.send({status: 0, message: 'Employee detail not found.'});
            });
        }
    });
};
exports.insertemp=function(emp,res){

    db.connect(function (err,con){

        con.query('insert into employees (name,location) values (?,?)',[emp.name,emp.location],function(err,result){
            con.release();

            if(err){
                res.send({status:0,message:"Employees Insertion Failed"});
            }
            else{
                res.send({status:1,message:"Employees Insertion Success"});
            }
        });
    });
};
exports.deletemp=function(id,res){

    db.connect(function (err,con){

        con.query('delete from employees where id = ?',[id],function(err,result){
            con.release();

            if(err){
                res.send({status:0,message:"Employee Deletion Failed"});
            }
            else{
                res.send({status:1,message:"Employee Deletion Success"});
            }
        });
    });
};
exports.updatemp=function(emp,res){
    db.connect(function (err,con){

        con.query('update employees set name = ? ,location= ? where id = ?',[emp.name,emp.location,emp.id],function(err,result){
            con.release();
            if(err){
                res.send({status:0,message:"Updation could not success"});
            }
            else{
                res.send({status:1,message:"Updation Success"});
            }
        });
    });
};
exports.inempmon=function(emp,res){
    var Emp=empl.em();
    Emp.name=emp.name;
    Emp.location=emp.location;
    Emp.save(function(err){
        if(err){
            res.send({status:0,message:"Insert failed"});
        }
        else{
            res.send({status: 1,message:"Insert Success"});
        }
    });
};
exports.selempmon=function(id,res){
    if(id==0) {
        empl.em.find(function (err, result) {
            if (err) {

            }
            else {
                res.send(JSON.stringify(result));
            }
        });
    }
    else{
        empl.em.findById(id, function(err, result) {
            if (err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        });
    }
};
exports.delempmon=function(id,res){
    empl.em.remove({_id:id},function (err,result) {
        if(err){
            res.send(err);
        }
        else{
            res.send({status:0,message:"Deletion success"});
        }
    });
};
exports.upempmon=function(emp,res){
    empl.em.findById(emp.id, function(err, result)
        {
            if (err){
                res.send(err);
            }
            else {
                result.name = emp.name;
                result.location = emp.location;

                result.save(function(err)
                {
                    if (err)
                    {
                        res.send({status: 1, message: 'Employee update failed'});
                    } else {
                        res.send({status: 0, message: 'Employee updated successfully'});
                    }
                });
            }
    });
};