const Product = require('../models/product.model.js');


class ProductController {
    /**
     * @description Create new product from mongoDb
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    create(req, res, next) {
        let { name, price, categories, description } = req.body;
        if (!req.body.name || !req.body.price || !req.body.categories) {
            return res.status(400).send({
                message: "Form validation failed. please check the fields!"
            });
        }

        // Create a Product
        const product = new Product({
            name: name,
            price: price,
            categories: categories,
            description: description
        });

        // Save Product in the database
        product.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Product."
                });
            });
    }

    /**
     * @description Get all the product from mongoDb
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getProduct(req, res, next) {
        try {
            let categoryId = req.params.categoryId;
            Product.find({ "categories": categoryId })
                .then(products => {
                    if (!products.length) {
                        return res.status(404).send({
                            message: `Products not found mapped with categoryId ${categoryId}`
                        });
                    }
                    res.send(products);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: `Product not found with categoryId " ${categoryId}`
                        });
                    }
                    res.status(500).send({
                        message: err.message || "Something went wrong!"
                    });
                });
        } catch (error) {
            next(error)
        }
    };

    /**
     * @description Update product in MongoDb
     * @param {*} req 
     * @param {*} res 
     * @param {*}  next
     */
    update(req, res, next) {
        try {
            let { name, price, categories, description } = req.body;
            let productId = req.params.productId;
            if (!req.body.name || !req.body.price) {
                return res.status(400).send({
                    message: "Product name & price is required!. Please check the form."
                });
            }

            // Find product and update it with the request body
            Product.findByIdAndUpdate(productId, {
                name: name,
                price: price,
                categories: categories,
                description: description
            }, { new: true })
                .then(product => {
                    if (!product) {
                        return res.status(404).send({
                            message: `Product not found with id ${productId}`
                        });
                    }
                    res.send(product);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: `Product not found with id ${productId}`
                        });
                    }
                    return res.status(500).send({
                        message: `Error updating Product with id ${productId}`
                    });
                });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController;