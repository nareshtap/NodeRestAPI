var mysql=require("mysql");
var pool;


exports.conn=function (){
    this.pool=mysql.createPool({
        host:'localhost',
        user:'root',
        password:'root',
        port:3306,
        database:'demo'
    });
};

exports.connect= function(callback){
    this.pool.getConnection (function(err,connection){
        callback(err,connection);
    });
};