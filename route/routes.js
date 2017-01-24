var auth=require("./authenticate");
var emp=require("./emproute");
var coun=require("./counroute");
var order=require("./ordroute");
var express = require("express");
var router = express.Router();
var bookRoute = require("./book.route");
var userRoute = require("./user.route");
var authorRoute = require("./author.route");
//var authcontl = require('../controllers/authenatication.controller');

exports.route= function(app){

    auth.authenticate(app);

    emp.emproute(app);

    coun.counroute(app);

    order.ordroute(app);

};

router.use('/api/books', bookRoute);

router.use('/auth', userRoute);

router.use('/api/authors', authorRoute);

module.exports = router;