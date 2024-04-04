const db = require("../db/connection")

exports.findCategories = () => {
    return db.query(`SELECT * FROM categories`).then(({rows}) => {
        return rows
    })
}