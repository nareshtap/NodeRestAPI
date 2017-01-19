var auth=require("./authenticate");
var emp=require("./emproute");
var coun=require("./counroute");

exports.route= function(app){
    auth.authenticate(app);
    emp.emproute(app);
    coun.counroute(app);

};