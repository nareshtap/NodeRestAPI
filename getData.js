var db=require('./db');

exports.get = function(res,id) {
        db.connect(function(err, con) {
            if(id==0)
            {
                qry = 'select * from employees';
                con.query(qry, function(err, result) {
                    con.release();
                    res.send(JSON.stringify(result));
                    //console.log(JSON.stringify(result));
                });
            }
            else {
                con.query('select * from employees where id = ?',[id], function(err, result) {
                    if(err){console.log("select id error " + err.stack);}
                    con.release();
                    console.log("sdfsdfheef            "+result);
                    debugger;
                    if(result.length != 0){
                        res.send(JSON.stringify(result));
                        return;
                    }
                    res.send({status: 0, message: 'category detail not found.'});
                });
            }
        });
    };
