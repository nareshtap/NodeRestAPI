var data=require("./getData");
var coun=require("");

exports.route= function(app){
    app.get('/employee/',function(req,res){
        data.getemp(0,res);
    });
    app.get('/employee/:id',function(req,res){
        data.getemp(req.params.id,res);
    });
    app.get('/country/',function(req,res){
        data.getcoun(0,res);
    });
    app.get('/country/:id',function(req,res){
        data.getcoun(req.params.id,res);
    });
    app.post('/employee/',function(req,res){
        data.insertemp(req.body,res);
    });
    app.delete('/employee/:id',function(req,res){
        data.deletemp(req.params.id,res);
    });
    app.put('/employee/',function(req,res){
        data.updatemp(req.body,res);
    });
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