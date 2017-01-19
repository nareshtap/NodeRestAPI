var db=require('../db');

exports.getcoun = function(id,res) {
    db.connect(function(err, con) {
        if(id==0)
        {
            qry = 'select * from tblCountry';
            con.query(qry, function(err, result) {
                con.release();
                res.send(JSON.stringify(result));
            });
        }
        else {
            con.query('select * from tblCountry where id = ?',[id], function(err, result) {
                if(err){console.log("select id error " + err.stack);}
                con.release();

                debugger;
                if(result.length != 0){
                    res.send(JSON.stringify(result));
                    return;
                }
                res.send({status: 0, message: 'Country not found.'});
            });
        }
    });
};