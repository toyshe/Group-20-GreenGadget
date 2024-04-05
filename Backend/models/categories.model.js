const db = require("../db/connection")

exports.findCategories = () => {
    return db.query(`SELECT * FROM categories`).then(({rows}) => {
        return rows
    })
}

exports.insertCategories = ({slug, description}) => {
    return db.query(`INSERT INTO categories (slug, description) VALUES ($1, $2) RETURNING *`, [slug, description]).then(({rows}) => {
        return rows[0]
    })
}