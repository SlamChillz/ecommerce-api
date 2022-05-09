const Products = require('../../models/product');

class Check {
    /**
     * This method avoids duplicate products in the same category
     * @param {Object} req request object
     * @param {Object} res respose object
     * @param {Object} next handler control
     */
    static async exist(req, res, next) {
        const { name, category } = req.body;
        try {
            const product = await Products.findOne({
                name: name,
                category: category,
            });
            if (product) {
                let err = new Error(
                    "A product with the same name and category exist!"
                );
                err.status = 400;
                return next(err);
            }
            return next();
        } catch (error) { next(error) }
    }

    /**
     * @param {Object} req
     * @param {Object} res
     * @param {Object} next
     */
    static async id(req, res, next) {
        const { id } = req.params;
        try {
            let product = await Products.findById(id);
            if (product) {
                req.id = product._id;
                return next();
            }
            let err = new Error("Product Not Found"); err.status = 404;
            return next(err);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Check;