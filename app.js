var express=require("express");
var bodyParser=require("body-parser");
var app=express();
var config = require('./config');
var db=require("./db");
var routes=require("./route/routes");
var server=require('http').Server(app);
var path=require('path');
var jwt=require('jsonwebtoken');
var empl=require("./model/mongo.js");
var employeeModule = require('./route/employeeController.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

 app.use('/api', function(req, res, next) {
 //console.log("Inside the function");
 const token = req.headers['access-token'];
 if (token) {
 jwt.verify(token, config.jwtSecretKey, function (err, decoded) {
 if (err) {
 res.send({ success: false, message: "Authentication failed.", error: err });
 }else {
 //console.log(decoded.userId);
 res.locals.session = decoded.userId;
 next();
 }
 })
 }else {
 res.status(403).send({ success: false, message: "Authenticate token required."});
 }
 });

/*it is for exports routes only */
routes.route(app);

/*  it is for module.exports routes*/
//app.use('/',routes);


app.get('/employeelist', employeeModule.employeeListMethod);

app.post('/editemployee', employeeModule.employeeEditMethod);

app.post('/addemployee', employeeModule.employeeAddMethod);

app.delete('/deleteemployee/:_id',employeeModule.employeeDeleteMethod);


app.use(function (req, res) {
    //console.log("inside not found");
    return res.status(404).json({ success: false, message: 'API not found.' });
});

db.conn();

app.set('port',process.env.PORT || config.port);
server.listen(app.get('port'),function(){
    console.log("Server is Listening to Port "+server.address().port);
});

module.exports = app;