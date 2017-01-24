const express = require("express");
const router = express.Router();
const usercntr = require("../Controller/user.controller");
const Joi = require("joi");
const validate = require("express-validation");

const userValidation = {
    registerUser: {
        body: {
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            emailId: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    },
    userLogin: {
        body: {
            emailId: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    },
    updateUser: {
        params:{
            userId: Joi.string().required(),
        }
    }
};

router.route('/register')
    .post(validate(userValidation.registerUser),usercntr.create)

    .get(usercntr.getAllUser);

router.route('/login')
    .post(validate(userValidation.userLogin),usercntr.userLogin);

router.route('/user/:userId')

    .delete(usercntr.remove);

module.exports = router;