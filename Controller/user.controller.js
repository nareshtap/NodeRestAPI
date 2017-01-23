const User = require("../model/user.model");
const jwt = require('jsonwebtoken');
const config = require('../config');
const passwordHash = require('password-hash');
const boom = require('boom');
const httpStatus = require('http-status');

function create(req, res, next) {
    console.log("inside controller.");
    User.findOne({ emailId: req.body.emailId })
        .then(function (userFound) {
            if (userFound) {
                res.send("Email Id already exists");
            }else {
                var user = new User();
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.emailId = req.body.emailId;
                user.password = req.body.password;
                return user.save()
            }
        }).then(function (savedUser) {
        console.log(savedUser);
        var token = jwt.sign({ userId: savedUser._id }, config.jwtSecretKey, {
            expiresIn: config.jwtExpiresIn
        });
        return res.json({ message: "User successfully registered.", token: token });
    }).catch(function (err) {
        return next(err);
    })
}

function userLogin(req, res, next) {
    User.getByEmailId(req.body.emailId)
        .then(function (user) {

            if(passwordHash.verify(req.body.password, user.password)) {
                console.log("valid password");
                var token = jwt.sign({ userId: user._id }, config.jwtSecretKey, {
                    expiresIn: config.jwtExpiresIn
                });
                console.log(res.locals.session);
                return res.json({ message: "User successfully login.", token: token});

            }else {
                console.log("Invalid password");
            }
        }).catch(function (err) {
        return next(err);
    });
}



module.exports = {create, userLogin};