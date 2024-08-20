const db = require('../db/connection')

exports.checkCategoryExists = (category) => {
    return db.query(`SELECT * FROM categories WHERE slug = $1`, [category]).then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({status: 400, msg: "Invalid query"})
        }
    })
}

exports.checkShopkeeperExists = (shopkeeper) => {
    return db.query(`SELECT user_id FROM users WHERE username = $1 AND user_type='shopkeeper'`, [shopkeeper]).then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({status: 400, msg: "Invalid query"})
        }
    })
}

exports.checkPageValid = (page) => {
    if(isNaN(Number(page)) || page < 0){
        return Promise.reject({status: 400, msg: "Invalid page query"})
    }
}