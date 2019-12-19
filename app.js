const express = require("express");
const app = express();

const products = require("./api/routes/products");

app.use("/products", products);

module.exports = app;