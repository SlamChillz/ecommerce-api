const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Product  Model Schema */
ProductSchema = new Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
    dateCreated: {type: Date, default: Date.now}
});

const Products = mongoose.model('Products', ProductSchema);
module.exports = Products;