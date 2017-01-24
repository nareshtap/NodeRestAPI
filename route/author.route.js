const express = require("express");
const router = express.Router();
const authorCtrl = require("../Controller/author.controller");
const Joi = require("joi");
const validate = require("express-validation");
var multer = require("multer");
const uuidV4 = require('uuid/v4');

const authorValidation = {
    createAuthor: {
        body: {
            fullName: Joi.string().required(),
            emailId: Joi.string().email().required(),
        }
    }
};


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dest = './public/author/';
        callback(null, dest);
    },
    filename: function (req, file, callback) {
        fileName = uuidV4() + file.originalname;
        req.body.profile = fileName;
        callback(null, fileName);
    }
});

var upload = multer({ storage: storage });

router.route('/')

    .post(upload.any(), validate(authorValidation.createAuthor), authorCtrl.create)

    .get(authorCtrl.getAll);

router.route('/:authorId')

    .get(authorCtrl.getById)

    .delete(authorCtrl.remove)

    .put(authorCtrl.update);

module.exports = router;