const mongoose = require("mongoose");



const productSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name:  {required: true, type: String},
    price: {required: true, type: Number},
    productImage: {required: true, type: String}
})

module.exports = mongoose.model("Product", productSchema)