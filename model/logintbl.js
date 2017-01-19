var db=require('../db');

exports.authenticat=function(login,res){
    db.connect(function(err,con){
        con.query("select * from login where email= ? and password= ?",[login.email,login.password],function(err,result){

            con.release();
            if(result.length==0 || err){
                res.send({status:0,message:"Email or password is incorrect"})
            }
            else
            {
                sess.email=login.email;
                console.log(sess.email);
                res.redirect('/employee');
            }
        });
    });
};