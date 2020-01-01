const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
 

mongoose.connect("mongodb://sarim:sarim123@ds113063.mlab.com:13063/mytodo");

const app = express();

const products = require("./api/routes/products");
const orders = require("./api/routes/orders");
const users = require("./api/routes/users")

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads",express.static('uploads'))

app.use("/products", products);
app.use("/orders", orders);
app.use("/users", users)

app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message + error.status
    }
  });
});

module.exports = app;
