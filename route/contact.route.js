var express=require('express');
var router=express.Router();
require('../model/contact');
var mongoose = require('mongoose'),
    Contact = mongoose.model('Contact');

router.route('/').get(function(req, res, next) {
    Contact.find().exec(function(err, data) {
        if(err) {
            return next(err);
        }
        res.json(data);
    });
});
router.route('/').post(function(req, res, next) {
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

router.route('/:id').get(function(req, res) {
    Contact.findById(req.params.id, function(err, data){
        res.json(data);
    });
});

router.route('/:id').delete(function(req, res) {
        Contact.findByIdAndRemove(req.params.id, function(err, data) {
            res.json(data);
        });
    });

router.route('/:id').put(function(req, res, next) {
        Contact.findById(req.params.id, function(err, data) {
            data.fname = req.body.fname;
            data.lname = req.body.lname;
            data.updated = Date.now();
            data.save(function(err, data) {
                if(err) {
                    return next(err);
                }
                res.status(201).json(data);
            });
        });
    });
module.exports = router;