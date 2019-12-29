const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const _ = require("lodash");

const Product = require("../models/product")


router.get("/", (req, res, next) => {

    Product.find().select("name _id price").exec().then(s => {
        const productInfo = {
            count: s.length,
            products: s,

            request: {
                type: "GET",
                url: "localhost:3000/products"
            }
        }

        res.status(200).json(productInfo)
    }
    ).catch(e => console.log(e))
})

router.post("/", (req, res, next) => {
    const productInfo = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    productInfo.save().then(success => {
        const createdProduct = {
            name: success.name,
            price: success.price,
            _id: success._id,


            request: {
                type: "POST",
                uri: "localhost:3000/products "
            }
        }
        res.status(200).json({
            message: "Products will be here from post method!",
            productInfo: createdProduct
        })
    }
    )
        .catch(err => res.status(400).json({ error: err }))


});

router.get("/:productId", (req, res, next) => {

    const id = req.params.productId

    Product.findById(id).select("name _id price").then(s => {
        if (s) {
            res.status(200).json({
                products: s,
                request: {
                    type: "GET",
                    url: "localhost:3000/products"
                }
            })
        }
        else {
            res.status(404).json({ message: "No valid entry found for provided ID" })
        }
    }
    )
        .catch(e => res.status(500).json(e))

});

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;

    Product.remove({ _id: id }).exec().then(s => res.status(200).json({message:"Successfully Deleted"})).catch(e => res.status(500).json({ error: e }))
})

router.patch("/:productId", (req, res, next) => {

    const id = req.params.productId;
    const updateops = {};

    for (const ops of req.body) {
        updateops[ops.propName] = ops.value
    }

    Product.update({ _id: id }, { $set: updateops })
        .exec().then(s => res.status(200).json({ message: "Product Updated", request: { type: "PATCH", url: "localhost:3000/products" } }))
        .catch(e => res.status.json({ error: e }))


})

module.exports = router;