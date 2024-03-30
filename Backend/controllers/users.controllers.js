const { findUsers, insertUsers } = require("../models/users.models")

exports.getUsers = (req, res) => {
    findUsers().then((users)=>{
        res.status(200).send({users})
    })
}

exports.postUsers = (req, res) => {
    const body = req.body;
    insertUsers(body).then((users) => {
        res.status(201).send({users})
    })
}