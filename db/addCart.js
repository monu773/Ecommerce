const mongoose =  require('mongoose');

const addCartSchema = new mongoose.Schema({
    name: String,
    store: String,
    price: String,
    detail: String,
    category: String,
    userId: String,
    company: String,
    cartId: String
});

module.exports = mongoose.model("addCarts", addCartSchema);