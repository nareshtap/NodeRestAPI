const Author = require("../model/author.model");

function create(req, res, next) {
    var author = new Author();
    author.fullName = req.body.fullName;
    author.emailId = req.body.emailId;
    author.gender = req.body.gender;
    author.createdBy = res.locals.session;
    console.log(__dirname);
    if (req.body.profile){
        author.profile = req.body.profile;
    }
    author.save()
        .then(function () {
            return res.json({message: "Author added."});
        })
        .catch(function (err) {
            return res.send(err);
            return next(err);
        })
}

function getAll(req, res, next) {
    Author.find().sort({ createdOn: -1 })
        .then(function (author) {
            return res.json(author);
        })
        .catch(function (err) {
            return next(err);
        })
}

function getById(req, res, next) {
    Author.getByAuthorId(req.params.authorId)
        .then(function (author) {
            return res.json(author);
        }).catch(function (err) {
        return next(err);
    })
}

function remove(req, res, next) {
    Author.getByAuthorId(req.params.authorId)
        .then(function (author) {
            Author.remove({ _id: author._id })
        })
        .then(function (author) {
            return res.json({message: "author successfully deleted."});
        })
        .catch(function (err){
            return next(err);
        })
}

function update(req, res, next) {
    Author.getByAuthorId(req.params.authorId)
        .then(function (author) {
            author.fullName = req.body.fullName || author.fullName;
            author.emailId = req.body.emailId || author.emailId;
            author.gender = req.body.gender || author.gender;
            return author.save()
        })
        .then(function (author) {
            console.log(author);
            return res.json({message: "author successfully updated."});
        })
        .catch(function (err){
            return next(err);
        })
}

module.exports = {create, getAll, getById, remove, update };