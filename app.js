var express=require("express");
var session = require('express-session');
var bodyParser=require("body-parser");
var app=express();
var db=require("./db");
var routes=require("./route/routes");
var server=require('http').Server(app);

var sess;
app.use(session({secret: 'sess'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

db.conn();
routes.route(app);


app.set('port',process.env.PORT || 8088);
server.listen(app.get('port'),function(){
    console.log("Server is Listening to Port "+server.address().port);
});