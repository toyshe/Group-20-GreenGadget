const { findElectronics, insertElectronics } = require("../models/electronics.model")

exports.getElectronics = (req, res, next) => {
    findElectronics().then((electronics) => {
        res.status(200).send({electronics})
    })
}

exports.postElectronics = (req, res, next) => {
    const electronic = req.body;
    insertElectronics(electronic).then((electronics) => {
        res.status(201).send({electronics})
    }).catch((err) => {
        next(err)
    })
}
