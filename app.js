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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/*app.use('/api', function(req, res, next) {
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
*/
app.use('/',routes);

app.use(function (req, res, next) {
    //console.log("inside not found");
    return res.status(404).json({ success: false, message: 'API not found.' });
});

app.use(express.static(path.join(__dirname,'./../public')));

db.conn();
routes.route(app);

app.set('port',process.env.PORT || 8088);
server.listen(app.get('port'),function(){
    console.log("Server is Listening to Port "+server.address().port);
});

module.exports = app;