var data=require("../model/logintbl");
var joi=require("joi");
var validate=require("express-validation");
var bodySchema = {
    body: {
        email: joi.string().required(),
        password: joi.string().required()

    }
};

exports.authenticate= function(app){
    app.post('/',validate(bodySchema),function(req,res){
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