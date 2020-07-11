const Category = require('../models/category.model.js');

class CategoryController {

    /**
     * @description Create new categories. 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    create(req, res, next) {
        try {
            let { name, parent } = req.body;
            if (!name) {
                return res.status(400).send({
                    success: false,
                    message: "Form validation failed. Please fill the form correctly!"
                });
            }
            const category = new Category({
                name: name,
                parentCategory: parent || 0
            });

            // Save Category in the database
            category.save()
                .then(data => {
                    res.send({ success: true, data: data });
                }).catch(err => {
                    res.status(500).send({
                        success: false,
                        message: err.message || "Something went wrong while creating the category!"
                    });
                });
        } catch (error) {
            next(error);
        }
    }

    /**
     * @description Get all the categories
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getAllCategory(req, res, next) {
        try {
            Category.aggregate([
                { "$addFields": { "parentCategory": { "$toString": "$_id" } } },
                {
                    "$lookup": {
                        "from": "categories",
                        "localField": "parentCategory",
                        "foreignField": "parentCategory",
                        "as": "child_categories"
                    }
                }
            ]).then(categories => {
                res.send({ success: true, data: categories });
            }).catch(err => {
                res.status(500).send({
                    success: false,
                    message: err.message || "Something went wrong while fetching the categories."
                });
            });
        } catch (error) {
            next(error);
        }
    };

}


module.exports = CategoryController;