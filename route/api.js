var express = require('express');
var router = express.Router();

var Product = require('../model/product');
Product.methods(['get']);
Product.register(router, '/products');

module.exports = router;
