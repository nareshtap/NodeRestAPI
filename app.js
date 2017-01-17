var express=require("express");
var bodyParser=require("body-parser");
var app=express();
var db=require("./db");
var routes=require("./routes");

var server=require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

db.conn();
routes.route(app);

app.set('port',process.env.PORT || 8088);

server.listen(app.get('port'),function(){
    console.log("Server is Listening to Port "+server.address().port);
});