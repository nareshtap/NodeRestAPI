var express=require("express");
var bodyParser=require("body-parser");
var app=express();
var config = require('./config');
var db=require("./db");
var routes=require("./route/routes");
var server=require('http').Server(app);
var expressValidation = require("express-validation");
const httpStatus = require('http-status');
var path=require('path');
var jwt=require('jsonwebtoken');

require('./model/contact');
var mongoose = require('mongoose'),
    Contact = mongoose.model('Contact');

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

app.use('/',routes);
app.use(express.static(__dirname + '/app'));

app.post('/api',function(req, res, next) {
    var contact = new Contact({
        fname: req.body.fname,
        lname: req.body.lname
    });
    contact.save(function(err, data) {
        if(err) {
            return next(err);
        }
        res.status(201).json(data);
    });
});

app.use(function (req, res, next) {
    //console.log("inside not found");
    return res.status(404).json({ success: false, message: 'API not found.' });
});



db.conn();
routes.route(app);

app.set('port',process.env.PORT || config.port);
server.listen(app.get('port'),function(){
    console.log("Server is Listening to Port "+server.address().port);
});

module.exports = app;