const db = require("../db/connection");
const { hashPasswords } = require("../utils/utils");
const { hashPassword } = require("../utils/utils");

exports.findUsers = () => {
  return db.query("SELECT * FROM users").then(({ rows }) => {
    return rows;
  });
};

exports.insertUsers = async ({
  username,
  name,
  password,
  email,
  user_type,
  phone,
  house_number,
  street,
  city,
  postcode,
  country,
  utr,
}) => {
  const hashedPassword = await hashPassword(password);
  return db
    .query(
      "INSERT INTO users (username, name, password, email, phone, user_type, house_number, street, city, postcode, country, utr) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [
        username,
        name,
        hashedPassword,
        email,
        phone,
        user_type,
        house_number,
        street,
        city,
        postcode,
        country,
        utr,
      ]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 400,
          msg: "You need to fill all required fields",
        });
      }
      return rows[0];
    });
};

exports.findUserLogin = (usernameOrEmail) => {
  return db
    .query("SELECT * FROM users WHERE username = $1 OR email = $1", [
      usernameOrEmail,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "User not found",
        });
      }

      return rows[0];
    });
};
