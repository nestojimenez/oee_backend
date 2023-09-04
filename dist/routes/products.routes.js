"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _products = require("../controllers/products.controller");
var router = (0, _express.Router)();

//Get All prodcuts
router.get('/products', _products.getProducts);
//Count how many products exist
router.get('/products/count', _products.countProducts);
//Get sigle product by ID
router.get('/products/:id', _products.getProductById);

//Add a product
router.post('/products', _products.createProduct);

//Delete a product
router["delete"]('/products/:id', _products.deleteProductById);

//Update a product
router.put('/products/:id', _products.updateProductById);
var _default = router;
exports["default"] = _default;