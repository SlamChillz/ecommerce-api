const { Products } = require('../models/product');

class Product {
    /**
     * @param {Object} req 
     * @param {Object} res 
     * @param {Object} next
     * @returns {JSON} success message and new product object
     */
    static async createProduct(req, res, next) {
        const { name, description, category, price } = req.body;
        const newProduct = new Products({ name, description, category, price });
        newProduct.save((err) => {
            if (err) {
                res.status(500).send({ message: "Server maintenace in progress!" });
                return next(err)
            };
            res.status(201).send({ message: "Product successfully created", "New Product": newProduct });
        });
    }

    /**
     * @param {Object} req 
     * @param {Object} res 
     * @param {Object} next 
     * @returns {Array} returns an array of products of calls the error handler
     */
    static async allProducts(req, res, next) {
        try {
            let products = await Products.find({});
            return res.status(200).send(products);
        } catch (error) {
            res.status(500).send({ message: "Unable to process request..." });
            next(error);
        }
    }

    /**
     * @param {Object} req 
     * @param {Object} res 
     * @param {Object} next 
     * @returns {Object} JSON of a single product details
     */
    static async oneProduct(req, res, next) {
        try {
            let product = await Products.findById(req.id);
            return res.status(200).send(product);
        } catch (error) {
            res.status(500).send({ message: "Unable to process request..." });
            next(error);
        }
    }

    /**
     * @param {Object} req 
     * @param {Object} res 
     * @param {Object} next 
     * @returns {JSON} success message
     */
    static async deleteProduct(req, res, next) {
        try {
            let product = await Products.findByIdAndRemove(req.id, {new: true});
            if (product) return res.status(200).send({ messages: `Product deleted successfully` });
        } catch (error) {
            res.status(500).send({ message: "Unable to process request..." });
            next(error);
        }
    }

    /**
     * @param {Object} req 
     * @param {Object} res 
     * @param {Object} next 
     * @returns {JSON} updated product
     */
    static async updateProduct(req, res, next) {
        try {
            const { name, description, category, price } = req.body;
            let product = await Products.findByIdAndUpdate(req.id, { name, description, category, price }, { new: true });
            return res.status(200).send({ mesage: 'Product updated successfully', "Updated prodct": product });
        } catch (error) {
            res.status(500).send({ message: "Unable to process request..." });
            next(error);
        }
    }
}

module.exports = Product;