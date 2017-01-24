var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var boom = require("boom");
mongoose.Promise=require('bluebird');
const httpStatus = require('http-status');

const Author = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    emailId: {
        type: String,
        required: true,
        trim: true,
    },
    profile: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Female', 'Male'],
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
    createdOn: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

Author.statics.getByAuthorId = function (authorId){
    return this.findOne({ _id: authorId })
        .then(function (author) {
            if (author) {
                return author;
            }
            const err = new APIError('No such author exists!', httpStatus.NOT_FOUND);
            return Promise.reject(err);
        });
};

module.exports = mongoose.model("Author", Author);