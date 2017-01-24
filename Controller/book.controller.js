const Book = require("../model/book.model");
const User = require("../model/user.model");
const Author = require("../model/author.model");
const mongoose = require("mongoose");

function create(req, res, next) {
    var book = new Book();
    book.name = req.body.name;
    book.author = mongoose.Types.ObjectId(req.body.author);
    book.owner = res.locals.session;
    book.createdBy = res.locals.session;
    book.save()
        .then(function (book) {
            //console.log(book);
            return User.getByUserId(res.locals.session);
        })
        .then(function (user) {
            // console.log(user);
            user.books.push(book);
            return user.save()
        }).then(function (usersaved) {
        return Author.getByAuthorId(mongoose.Types.ObjectId(req.body.author));
    })
        .then(function (author) {
            // console.log(author);
            author.books.push(book);
            return author.save();
        })
        .then(function () {
            return res.json({message: "Book created."});
        })
        .catch(function (err) {
            // console.log(err);
            return next(err);
        })
}

function getAll(req, res, next) {
    Book.find({})
        .populate('owner')
        .populate('author')
        .sort({ createdOn: -1 })
        .then(function (books) {
            return res.json(books);
        })
        .catch(function (e) {
            return next(e);
        })
}

function getById(req, res, next) {
    Book.getByBookId(req.params.bookId)
        .then(function (book) {
            return res.json(book);
        })
        .catch(function (e) {
            return next(e);
        })
}

function remove(req, res, next) {
    Book.getByBookId(req.params.bookId)
        .then(function (book) {
            Book.remove({ _id: book._id })
        })
        .then(function (book) {
            return res.json({message: "successfully deleted."});
        })
        .catch(function (e){
            return next(e);
        })
}

function findByName(req, res, next) {
    Book.find().where('name').equals(req.params.str)
        .then(function (books) {
            return res.send(books);
        })
        .catch(function (e){
            return next(e);
        })
}

module.exports = { create, getAll, getById, remove, findByName};