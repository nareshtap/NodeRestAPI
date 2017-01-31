var express=require("express");
var bodyParser=require("body-parser");
var app=express();
var config = require('./config');
var db=require("./db");
var routes=require("./route/routes");
var server=require('http').Server(app);
var path=require('path');
var jwt=require('jsonwebtoken');
var empl=require("./model/mongo");

routes.route(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/employee1',function(req,res){

        empl.em.find(function (err, result) {
            if (err) {

            }
            else {

                res.send({'data':result});

            }
        });
});

//app.use('/',routes);



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