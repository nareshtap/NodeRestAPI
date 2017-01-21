var auth=require("./authenticate");
var emp=require("./emproute");
var coun=require("./counroute");
var order=require("./ordroute");

exports.route= function(app){

    auth.authenticate(app);

    emp.emproute(app);

    coun.counroute(app);

    order.ordroute(app);

};