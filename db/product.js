const mongoose =  require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    store: String,
    price: String,
    detail: String,
    category: String,
    userId: String,
    company: String
});

module.exports = mongoose.model("products", productSchema);