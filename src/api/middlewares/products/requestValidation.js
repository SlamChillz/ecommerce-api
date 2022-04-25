const { Products } = require('../../models/product');

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
            const product = await Products.findOne({ name: name, category: category });
            if (product) {
                let err = new Error();
                err.message = "A product with the same name and category exist!";
                err.status = 400;
                next(err);
            } else {
                next();
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * 
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
                next();
            } else {
                let err = new Error("Product Not Found")
                err.status = 404;
                next(err);
            }
        } catch (error) {
            res.status(400).send({ message: "Error occurred, invalid id format!" });
            next(error)
        }
    }
}

module.exports = Check;