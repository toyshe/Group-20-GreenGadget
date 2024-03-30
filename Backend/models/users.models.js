const db = require("../db/connection")

exports.findUsers = () => {
    return db.query("SELECT * FROM users").then(({rows}) => {
        return rows
    })
}

exports.insertUsers = ({username, name, password, email, user_type, phone, house_number, street, city, postcode, country}) => {
    return db.query("INSERT INTO users (username, name, password, email, phone, user_type, house_number, street, city, postcode, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *", [username, name, password, email, phone, user_type, house_number, street, city, postcode, country]).then(({rows}) => {
        return rows[0]
    })
}