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

exports.insertBasketsByUserId = ({username, electronics_id, quantity}) => {
    return db.query(`INSERT INTO baskets (user_id, electronics_id, quantity, created_at) SELECT user_id, $1, $2, NOW() FROM users WHERE users.username = $3 RETURNING *`, [electronics_id, quantity, username]).then(({rows}) => {
        console.log(rows);
        return rows[0]
    })
}
