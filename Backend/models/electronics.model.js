const db = require("../db/connection");

exports.findElectronics = (
  electronics_type,
  sort_by = "price",
  order = "asc",
  shopkeeper
) => {
  queryStr = `SELECT electronics.* FROM electronics LEFT JOIN users ON users.user_id = electronics.shopkeeper_id`;

  const queryParameters = [];

  const validSortQueries = ["price", "storage"];
  if (!validSortQueries.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid query" });
  }

  const validOrderQueries = ["asc", "desc"];
  if (!validOrderQueries.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid query" });
  }

  if (electronics_type) {
    queryStr += ` WHERE electronics_type=$1`;
    queryParameters.push(electronics_type);
  }

  if (shopkeeper) {
    if(electronics_type){
        queryStr += ' AND'
    }
    else{
        queryStr += ' WHERE'
    }
    queryStr += ` users.username = $${queryParameters.length + 1}`;
    queryParameters.push(shopkeeper);
  }

  queryStr += ` GROUP BY electronics_id, users.user_id ORDER BY ${sort_by} ${order}`;

  return db.query(queryStr, queryParameters).then(({ rows }) => {
    return rows;
  });
};

exports.insertElectronics = ({
  name,
  model,
  price,
  description,
  electronics_type,
  storage_in_gb,
  img_url,
  quantity,
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
        `INSERT INTO electronics (name, model, price, description, electronics_type, storage_in_gb, img_url, quantity, shopkeeper_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          name,
          model,
          price,
          description,
          electronics_type,
          storage_in_gb,
          img_url,
          quantity,
          user_id,
        ]
      );
    })
    .then(({ rows }) => {
      return rows[0];
    });
};
