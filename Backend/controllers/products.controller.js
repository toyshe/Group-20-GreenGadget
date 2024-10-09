const { findProducts } = require("../models/products.model")

exports.getProducts = (req, res, next) => {
    findProducts().then((products) => {  
        console.log(products);
              
        res.status(200).send({products})
    })
    
}