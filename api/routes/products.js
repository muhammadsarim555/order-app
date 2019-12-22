const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({ message: "Products are here from get method!" });
});

router.post("/", (req, res, next) => {
    const productInfo = { productName: req.body.productName }
    res.status(200).json({
        message: "Products will be here from post method!",
        productInfo
    });
});

router.post("/:productId", (req, res, next) => {


    res.status(200).json({
        message: "This  product is posted!",
        product: req.params.productId,
    });
});

module.exports = router;