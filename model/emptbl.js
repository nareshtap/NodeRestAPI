var db=require('../db');

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
