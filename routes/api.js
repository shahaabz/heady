const express = require("express");
const router = express.Router();
const config = require("config");

const ProductController = require('../src/controllers/product.controller.js');
const CategoryController = require('../src/controllers/category.controller.js');

const productObj = new ProductController;
const categoryObj = new CategoryController;

router.get('/', async (req, res, next) => res.send(`Service is running...  ${config.get("env")}`));


// Create a new Product
router.post('/product', productObj.create);

// Get Products with Category
router.get('/product/:categoryId', productObj.getProduct);

// Update a Product with productId
router.put('/product/:productId', productObj.update);


// Create a new Category
router.post('/category', categoryObj.create);

// Retrieve All Categories mapped with all its child categories
router.get('/category', categoryObj.getAllCategory);

module.exports = router;