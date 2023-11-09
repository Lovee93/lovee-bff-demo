const express = require('express');
const products = require('./products.json');
const app = express();

// Middleware to parse JSON in the request body
app.use(express.json());


// // POST request handler
// app.post('/api/postEndpoint', (req, res) => {
//     // Get the data from the request body
//     const requestData = req.body;
  
//     // You can process the data here
//     // For example, echoing the data back in the response
//     res.json({ message: 'Received POST request', data: requestData });
// });

app.get('/products', (req,res) => {
    res.send(products)
})

app.get('/product/:id', (req,res) => {
    const id = req.params.id
    queriedProduct = products.products.find(product=>product.skuId==id)
    res.send(queriedProduct)
})

exports.productList = (req, res) => {
    app(req, res)
};