const Products = require('../models/product');
const { validateQuery, constructQueryConditions, search } = require('../helpers/products/produts');

class Product {
    /**
     * @param {Object} req
     * @param {Object} res
     * @param {Middleware Function} next
     * @returns {JSON} success message and new product object
     */
    static async createProduct(req, res, next) {
        const { name, description, category, price } = req.body;
        const newProduct = new Products({ name, description, category, price });
        newProduct.save((err) => {
            if (err) {
                res.status(500).send({
                    message: "Server maintenace in progress!",
                });
                return next(err);
            }
            res.status(201).send({
                message: "Product successfully created",
                "New Product": newProduct,
            });
        });
    }

    /**
     * @param {Object} req
     * @param {Object} res
     * @param {Middleware Function} next
     * @returns {Array} returns an array of products of calls the error handler
     */
    static async allProducts(req, res, next) {
        try {
            let products = await Products.find({}).sort({ price: "desc" });
            return res.status(200).send(products);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @param {Object} req
     * @param {Object} res
     * @param {Middleware Function} next
     * @returns {Object} JSON of a single product details
     */
    static async oneProduct(req, res, next) {
        try {
            let product = await Products.findById(req.id);
            if (product) { return res.status(200).send(product) };
        } catch (error) {
            next(error);
        }
    }

    /**
     * @param {Object} req
     * @param {Object} res
     * @param {Middleware Function} next
     * @returns {JSON} success message
     */
    static async deleteProduct(req, res, next) {
        try {
            let product = await Products.findByIdAndRemove(req.id, {
                new: true,
            });
            if (product)
                return res
                    .status(200)
                    .send({ messages: `Product deleted successfully` });
        } catch (error) {
            next(error);
        }
    }

    /**
     * @param {Object} req
     * @param {Object} res
     * @param {Middleware Function} next
     * @returns {JSON} updated product
     */
    static async updateProduct(req, res, next) {
        try {
            const { name, description, category, price } = req.body;
            let product = await Products.findByIdAndUpdate(
                req.id,
                { name, description, category, price },
                { new: true }
            );
            return res.status(200).send({
                mesage: "Product updated successfully",
                "Updated prodct": product,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Middleware Function} next
     */
    static async search(req, res, next) {
        try {
            const newQuery = await validateQuery(req.query);
            const queryConditions = await constructQueryConditions(newQuery);
            const result = await search(queryConditions);
            result.length > 0
                ? res.status(200).send(result)
                : res
                      .status(200)
                      .send({ message: "No product matches search!" });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Product;