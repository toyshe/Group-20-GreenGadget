const format = require("pg-format");
const db = require("../connection");

const seed = ({ userData }) => {
  return db.query(`DROP TABLE IF EXISTS users`).then(() => {
    return db
      .query(
        `CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL, 
            name VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            email VARCHAR(200) UNIQUE NOT NULL,
            user_type VARCHAR(20) NOT NULL, 
            phone VARCHAR(11) UNIQUE NOT NULL, -- Change INT(11) to VARCHAR(11)
            house_number VARCHAR(20),
            street VARCHAR(200),
            city VARCHAR(200),
            postcode VARCHAR(20),
            country VARCHAR(200)
          )` // Add closing parenthesis here
      )
      .then(() => {
        const insertUsersQueryStr = format(
          `INSERT INTO users (username, name, password, email, user_type, phone, house_number, street, city, postcode, country) VALUES %L RETURNING *;`,
          userData.map(
            ({
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
            }) => [
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
            ]
          )
        );
        return db.query(insertUsersQueryStr);
      });
  });
};

module.exports = seed;

