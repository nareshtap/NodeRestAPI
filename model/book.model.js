var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const _ = require("lodash");
const boom = require("boom");
const httpStatus = require('http-status');

const Book = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    author: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

Book.statics.getByBookId = function (bookId) {
    return this.findById(bookId).populate('owner').exec()
        .then(function (book) {
            if (book) {
                return book;
            }
            const err = new APIError('Book not found"');
        });
};

module.exports = mongoose.model("Book", Book);