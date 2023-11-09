const express = require('express');
const app = express();
// Middleware to parse JSON in the request body
app.use(express.json());

app.get('/mobile/products', async (req,res) => {
    const productList = await fetch("product service cloud function")
        .then(response => response.json())
        .then(data =>data)
    res.send(productList)
})

app.get('/mobile/product/:id/', async (req,res) => {
    const id = req.params.id
    const product = await fetch(`product service cloud function`)
        .then(response => response.json())
        .then(data =>data)
    const inventory = await fetch("inventory service cloud function")
    .then(response => response.json())
    .then(data => data)
    product.denominations = inventory.find(p => p.skuId == id).denominations
    res.send(product)
})

exports.mobileBFF = (req, res) => {
    app(req, res)
};