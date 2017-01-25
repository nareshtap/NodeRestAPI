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

function getAllUser(req, res, next) {
    User.find({}, { firstName: 1, lastName: 1, emailId: 1, books: 1 })
        .populate('books').sort({ createdOn: -1 }).exec()
        .then(function (users) {
            return res.json(users);
        })
        .catch(function (err) {
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

function remove(req, res, next) {
    User.getByUserId(req.param.userId)
        .then(function (user) {
            User.remove({ _id: user._id })
        })
        .then(function () {
            return res.json({message: "successfully deleted."});
        })
        .catch(function (err){
            return next(err);
        })
}

function changePassword(req, res, next) {
    User.getByUserId(res.locals.session)
        .then(function (user) {
            if(passwordHash.verify(req.body.oldPassword, user.password)) {
                user.password = req.body.newPassword;
                return user.save()
            }else {
                const err = new APIError("Fail to change your password, please check your current password.");
                return Promise.reject(err);
            }
        }).then(function (user) {
        return res.json({ message: "Password successfully changed." });
    })
        .catch(function (err) {
            return next(err);
        });
}

module.exports = {create, getAllUser, userLogin, remove, changePassword};