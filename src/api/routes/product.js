const productRoutes = require('express').Router();
const Check = require('../middlewares/products/requestValidation');
const Product = require('../controllers/product');

productRoutes.get('/products', Product.allProducts);
productRoutes.get('/product/:id', Check.id, Product.oneProduct);
productRoutes.post('/product', Check.exist, Product.createProduct);
productRoutes.put('/product/:id', Check.id, Check.exist, Product.updateProduct);
productRoutes.delete('/product/:id', Check.id, Product.deleteProduct);

productRoutes.use((err, req, res, next) => {
    if (err.status) { return res.status(err.status).send({ message: err.message }) };
    next(err);
});

module.exports = { productRoutes };