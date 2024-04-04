const { findCategories } = require("../models/categories.model")

exports.getCategories = (req, res, next) => {
    findCategories().then((categories) => {
        res.status(200).send({categories})
    }).catch((err) => {
        next(err)
    })
}