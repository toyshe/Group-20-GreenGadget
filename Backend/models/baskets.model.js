const db = require("../db/connection");

exports.findBaskets = () => {
  return db
    .query(
      `SELECT baskets.*, users.username FROM baskets LEFT JOIN users ON baskets.user_id = users.user_id`
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.findBasketsByUserId = (userId) => {
  return db
    .query(
      `SELECT baskets.*, users.username, electronics.* FROM baskets LEFT JOIN users ON baskets.user_id = users.user_id LEFT JOIN electronics ON baskets.electronics_id = electronics.electronics_id WHERE baskets.user_id = $1`,
      [userId]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.insertBasketsByUserId = ({ username, electronics_id, basket_quantity }) => {
  return db
    .query(
      `INSERT INTO baskets (user_id, electronics_id, basket_quantity, created_at) SELECT user_id, $1, $2, NOW() FROM users WHERE users.username = $3 RETURNING *`,
      [electronics_id, basket_quantity, username]
    )
    .then(({ rows }) => {
      // console.log(rows);
      return rows[0];
    });
};

exports.removeItemByElectronicsId = (user_id, electronics_id) => {
  return db
    .query(`DELETE FROM baskets WHERE user_id = $1 AND electronics_id = $2`, [
      user_id,
      electronics_id,
    ])
    .then(() => {
      return db
        .query(`SELECT * FROM baskets WHERE user_id = $1`, [user_id])
        .then(({ rows }) => {
          return rows;
        });
    });
};

exports.updateItemInBasket = (user_id, electronics_id, updatedQuantity) => {
  
  return db.query(`UPDATE baskets SET basket_quantity = basket_quantity + $1 FROM electronics WHERE electronics.electronics_id = baskets.electronics_id AND baskets.electronics_id = $2 AND baskets.user_id = $3 RETURNING *`, [updatedQuantity, electronics_id, user_id]).then(({rows}) => {
    if(rows.length !== 0 && rows[0].basket_quantity <= 0){
      return db.query(`DELETE FROM baskets WHERE electronics_id = $1 AND user_id = $2 RETURNING *`, [rows[0].electronics_id, rows[0].user_id]).then(({rows}) => {
        if(rows.length === 0){
          return Promise.reject({status: 404, msg: "Item not found in basket"})
        }
        return {msg: 'Item removed from basket'}
      })
    }
    else if(rows.length === 0){
      return Promise.reject({status: 404, msg: "item not found"})
    }
    else if(rows[0].basket_quantity > rows[0].quantity){
      console.log('in here');
      
      return Promise.reject({status: 400, msg: "Not enough stock available"})
    }
    return rows[0]
  }).catch((err) => {
    console.log(err);
    
    throw(err)
  })
}
