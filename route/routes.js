var auth=require("./authenticate");
var emp=require("./emproute");
var coun=require("./counroute");
var order=require("./ordroute");
var express = require("express");
var router = express.Router();
var bookRoute = require("./book.route");
var userRoute = require("./user.route");
var authorRoute = require("./author.route");
var path=require('path');
var conroute=require('./contact.route');
require('../model/contact');
var mongoose = require('mongoose'),
    Contact = mongoose.model('Contact');

exports.route= function(app){

    auth.authenticate(app);

    emp.emproute(app);

    coun.counroute(app);

    order.ordroute(app);

};

router.route('/').get(function(req,res){
    res.sendFile(path.join(__dirname,'../app/index.html'));
});

router.route('/api').post(function(req, res, next) {
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

router.use('/api',conroute);

router.use('/api/books', bookRoute);

router.use('/auth', userRoute);

router.use('/api/authors', authorRoute);

module.exports = router;