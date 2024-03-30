const db = require("../db/connection")

exports.findUsers = () => {
    return db.query("SELECT * FROM users").then(({rows}) => {
        return rows
    })
}

exports.insertUsers = ({username, name, password, email, user_type, phone}) => {
    return db.query("INSERT INTO users (username, name, password, email, phone, user_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [username, name, password, email, phone, user_type]).then(({rows}) => {
        return rows[0]
    })
}