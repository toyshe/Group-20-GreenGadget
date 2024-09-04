const { findBaskets, findBasketsByUserId, insertBasketsByUserId, removeItemByElectronicsId } = require("../models/baskets.model")

exports.getBaskets = (req, res, next) => {
    findBaskets().then((baskets) => {
        res.status(200).send({baskets})
    }).catch((err) => {
        next(err)
    })
}

exports.getBasketsByUserId = (req, res, next) => {
    const {user_id} = req.params
    findBasketsByUserId(user_id).then((basket) => {
        res.status(200).send({basket})
    }).catch((err => {
        next(err)
    }))
}

exports.postBaskets = (req, res, next) => {
    const newBasket = req.body
    insertBasketsByUserId(newBasket).then((basket) => {
        console.log(basket);
        res.status(200).send({basket})
    }).catch((err => {
        next(err)
    }))
}

exports.deleteItemInBasket = (req, res, next) => {
    const {electronics_id, user_id} = req.params;
    
    removeItemByElectronicsId(user_id, electronics_id).then((basket) => {
        res.status(200).send({basket})
        
    })
}