const db = require("../db/connection");

exports.findElectronics = () => {
  return db.query(`SELECT * FROM electronics`).then(({ rows }) => {
    return rows;
  });
};

exports.insertElectronics = ({
  name,
  model,
  price,
  description,
  electronics_type,
  storage,
  img_url,
  shopkeeper_username,
}) => {
  return db
    .query(`SELECT user_id FROM users WHERE username = $1`, [
      shopkeeper_username,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 400,
          msg: "Shopkeeper does not exist",
        });
      }
      return rows[0].user_id;
    })
    .then((user_id) => {
      return db.query(
        `INSERT INTO electronics (name, model, price, description, electronics_type, storage, img_url, shopkeeper_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [
          name,
          model,
          price,
          description,
          electronics_type,
          storage,
          img_url,
          user_id,
        ]
      );
    })
    .then(({ rows }) => {
      return rows[0];
    });
};
