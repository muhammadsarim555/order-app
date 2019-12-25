const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const _ = require("lodash");

const Product = require("../models/product")


router.get("/", (req, res, next) => {

    Product.find().exec().then(s =>
        res.status(200).json(s)
    ).catch(e => console.log(e))
})

router.post("/", (req, res, next) => {
    const productInfo = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    productInfo.save().then(succes => console.log(succes))
        .catch(err => console.log(err))

    res.status(200).json({
        message: "Products will be here from post method!",
        productInfo
    });
});

router.get("/:productId", (req, res, next) => {

    const id = req.params.productId

    Product.findById(id).then(s => {
        if (s) {
            res.status(200).json(s)
        }
        else {
            res.status(404).json({ message: "No valid entry found for provided ID" })
        }
    }
    )
        .catch(e => res.status(500).json(e))

    // res.status(200).json({
    //     message: "This  product is posted!",
    //     product: req.params.productId,
    // });
});

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;

    Product.remove({ _id: id }).exec().then(s => res.status(200).json(s)).catch(e => res.status(500).json({ error: e }))
})

router.patch("/:productId", (req, res, next) => {

    const id = req.params.productId;
    const updateops = {};

    for (const ops of req.body) {
        updateops[ops.propName] = ops.value
    }

    Product.update({ _id: id }, { $set: updateops })
        .exec().then(s => res.status(200).json(s))
            .catch(e => res.status.json({ error: e }))

    // Product.findOneAndUpdate(id, { $set: body },{returnNewDocument: true})
    // .then(s => res.status(200).send())
    // .catch(e => res.status(400).send());
})

module.exports = router;