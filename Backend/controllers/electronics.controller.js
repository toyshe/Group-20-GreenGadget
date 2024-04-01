const { findElectronics } = require("../models/electronics.model")

exports.getElectronics = (req, res, next) => {
    findElectronics().then((electronics) => {
        res.status(200).send({electronics})
    })
}
