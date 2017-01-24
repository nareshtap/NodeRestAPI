const express = require("express");
const router = express.Router();
const bookcntr = require("../Controller/book.controller");
const Joi = require("joi");
const validate = require("express-validation");

const bookValidation = {
    createBook: {
        body: {
            name: Joi.string().required(),
        }
    },
    manageBook: {
        params: {
            bookId: Joi.string().required(),
        },
        body: {
            name: Joi.string().required(),
            author: Joi.string().required(),
        }
    }
};

router.route('/')

    .post(validate(bookValidation.createBook),bookcntr.create)

    .get(bookcntr.getAll);

router.route('/:bookId')

    .get(bookcntr.getById)

    .delete(bookcntr.remove);

router.route('/getByName/:str')

    .get(bookcntr.findByName);

module.exports = router;