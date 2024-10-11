const db = require('../db/connection')

exports.findProducts = () => {
    return db.query(`SELECT electronics.*, users.username FROM electronics LEFT JOIN users ON users.user_id = electronics.shopkeeper_id ORDER BY random() LIMIT 10`).then(({rows}) => {        
        return rows;
    })
}