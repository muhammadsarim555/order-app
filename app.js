const express = require("express");
const morgan = require('morgan')
const bodyParser = require("body-parser")

const app = express();

const products = require("./api/routes/products");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use("/products", products);

app.use((req,res,next) => {
    const error = new Error("Not Found!");
    error.status = 404;
    next(error)
})

app.use((error,req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message + error.status,

        }
    })

})

module.exports = app;