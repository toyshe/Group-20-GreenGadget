const { deleteElectronicsById } = require("../controllers/electronics.controller");
const db = require("../db/connection");

exports.findElectronics = (
  electronics_type,
  sort_by = "price",
  order = "asc",
  shopkeeper,
  page
) => {
  queryStr = `SELECT electronics.*, users.username FROM electronics LEFT JOIN users ON users.user_id = electronics.shopkeeper_id`;

  const queryParameters = [];

  const validSortQueries = ["price", "storage_in_gb"];
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
    if (electronics_type) {
      queryStr += " AND";
    } else {
      queryStr += " WHERE";
    }
    queryStr += ` users.username = $${queryParameters.length + 1}`;
    queryParameters.push(shopkeeper);
  }

  
  queryStr += ` GROUP BY electronics_id, users.user_id ORDER BY ${sort_by} ${order}`;
  if(page){
    queryStr += ` LIMIT 9 OFFSET ${9* (page - 1)}`
  }

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

exports.findElectronicById = (id) => {
  return db
    .query(`SELECT electronics.*, users.username FROM electronics LEFT JOIN users ON users.user_id = electronics.shopkeeper_id WHERE electronics_id = $1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "electronics_id not found" });
      }
      return rows[0];
    });
};

exports.updateElectronicsById = (id, updatedQuantity) => {
  return db
    .query(
      `UPDATE electronics SET quantity = quantity + $1 WHERE electronics_id = $2 RETURNING *`,
      [updatedQuantity, id]
    )
    .then(({ rows }) => {
      if(rows.length !== 0 && rows[0].quantity === 0) {
        return this.removeElectronicsById(rows[0].electronics_id)
      }
      else if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "electronics_id not found" });
      }
      else if(rows[0].quantity < 0) {
        return Promise.reject({ status: 400, msg: "Not enough of item" });
      }
      return rows[0];
    });
};

exports.removeElectronicsById = (id) => {
  return db
    .query(`DELETE FROM electronics WHERE electronics_id = $1`, [id])
    .then(({ rowCount }) => {
      if (rowCount === 0) {
        return Promise.reject({ status: 404, msg: "electronics_id not found" });
      }
    });
};
