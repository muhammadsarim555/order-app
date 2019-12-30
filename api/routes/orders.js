const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");

const Orders = require("../models/orders");
const Products = require("../models/product");

router.get("/", (req, res, next) => {
  Orders.find()
    .populate("product")
    .select("quantity product _id")
    .then(s => {
      const ordersInfo = {
        count: s.length,
        order: s,

        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      };

      res.status(200).json(ordersInfo);
    })
    .catch(e => res.status(400).json({ error: e }));
});

router.post("/", (req, res, next) => {
  Products.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: "Product Not Found!" });
      }

      const order = new Orders({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });

      return order.save();
    })
    // .catch(error => res.status(404).json({message: "Product not found", error})

    .then(success => {
      const createdProduct = {
        message: "Thanks for your Create Product",
        _id: success._id,
        quantity: success.quantity,
        product: success.product,

        request: {
          type: "GET",
          url: "localhost:3000/orders"
        }
      };

      res.status(200).json(createdProduct);
    })
    .catch(e => res.status(500).json(e));
});

router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;

  Orders.findById(id)
    .exec()
    .then(order => {
      res.status(200).json({
        order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(error => res.status(500).json({ error }));
});

router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;

  Orders.remove({ _id: id })
    .then(doc =>
      res.status(200).json({
        message: "Order Removed!"
      })
    )
    .catch(error => res.status(500).json({ error }));
});

module.exports = router;
