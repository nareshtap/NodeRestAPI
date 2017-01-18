var data=require("../model/logintbl");

exports.authenticate= function(app){
    app.post('/',function(req,res){
        sess=req.session;
        data.authenticat(req.body,res);
    });
    app.get('/logout',function(req,res) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });
    });
};