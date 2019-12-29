const mongoose = require("mongoose");



const productSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 }
})

module.exports = mongoose.model("Orders", productSchema)