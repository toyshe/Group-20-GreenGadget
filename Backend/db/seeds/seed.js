const db = require("../connection");
const format = require("pg-format");
const { seedUsers } = require("../../utils/utils");
const initializeUserData = require("../data/test-data/users");
const { userDataPromise } = require("../data/test-data/index");

// const seed = async ({ userData }) => {
//   await db.query(`DROP TABLE IF EXISTS users CASCADE`);
//   await db.query(`DROP TABLE IF EXISTS electronics CASCADE`);
//   await db.query(`DROP TABLE IF EXISTS baskets`);
//   await db.query(`DROP TABLE IF EXISTS orders`);
//   await db.query(`DROP TABLE IF EXISTS repair_requests CASCADE`);
//   await db.query(`DROP TABLE IF EXISTS reviews`);
//   await db.query(`DROP TABLE IF EXISTS bids`);
//   await db.query(
//     `CREATE TABLE users (
//             user_id SERIAL PRIMARY KEY,
//             username VARCHAR(50) NOT NULL,
//             name VARCHAR(100) NOT NULL,
//             password VARCHAR(100) NOT NULL,
//             email VARCHAR(200) UNIQUE NOT NULL,
//             user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('customer', 'shopkeeper', 'admin')),
//             phone VARCHAR UNIQUE NOT NULL,
//             house_number VARCHAR(20),
//             street VARCHAR(200),
//             city VARCHAR(200),
//             postcode VARCHAR(20),
//             country VARCHAR(200),
//             utr VARCHAR(11),
//             CONSTRAINT check_utr_for_shopkeeper CHECK ((user_type = 'shopkeeper' AND utr IS NOT NULL) OR user_type != 'shopkeeper'),
//             CONSTRAINT check_address_for_customers_shopkeepers CHECK ((user_type = 'customer' OR user_type = 'shopkeeper') AND (house_number IS NOT NULL OR street IS NOT NULL OR city IS NOT NULL OR postcode IS NOT NULL OR country IS NOT NULL))
//         )`
//   );
//   await db.query(`CREATE TABLE electronics (
//             electronics_id SERIAL PRIMARY KEY,
//             name VARCHAR(100) NOT NULL,
//             description TEXT NOT NULL,
//             price INT NOT NULL,
//             image_url VARCHAR(200) NOT NULL,
//             shopkeeper_id SERIAL REFERENCES users(user_id)
//             )`);
//   await db.query(`CREATE TABLE baskets (
//             basket_id SERIAL PRIMARY KEY,
//             user_id INT NOT NULL REFERENCES users(user_id),
//             electronics_id SERIAL REFERENCES electronics(electronics_id),
//             quantity INT NOT NULL,
//             created_at TIMESTAMP DEFAULT NOW()
//             )`);

//   await db.query(`CREATE TABLE orders (
//             order_id SERIAL PRIMARY KEY,
//             user_id INT NOT NULL REFERENCES users(user_id),
//             electronics_id SERIAL REFERENCES electronics(electronics_id),
//             quantity INT NOT NULL
//           )`);
//   await db.query(`CREATE TABLE repair_requests (
//             request_id SERIAL PRIMARY KEY,
//             customer_id INT NOT NULL REFERENCES users(user_id),
//             electronic_id SERIAL REFERENCES electronics(electronics_id),
//             description TEXT NOT NULL,
//             timestamp TIMESTAMP DEFAULT NOW()
//           )`);

//   await db.query(`CREATE TABLE bids (
//             bid_id SERIAL PRIMARY KEY,
//             shopkeeper_id INT NOT NULL REFERENCES users(user_id),
//             request_id SERIAL REFERENCES repair_requests(request_id),
//             status VARCHAR(20) NOT NULL,
//             timestamp TIMESTAMP DEFAULT NOW()
//           )`);

//   await db.query(`CREATE TABLE reviews (
//             review_id SERIAL PRIMARY KEY,
//             user_id INT NOT NULL REFERENCES users(user_id),
//             electronic_id SERIAL REFERENCES electronics(electronics_id),
//             rating INT NOT NULL,
//             review TEXT NOT NULL,
//             timestamp TIMESTAMP DEFAULT NOW()
//           )`);
//           await seedUsers(userData);
// };

const seed = ({ userData }) => {
  return db
    .query(`DROP TABLE IF EXISTS users CASCADE`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users CASCADE`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS electronics CASCADE`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS baskets`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS orders`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS repair_requests CASCADE`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS reviews`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS bids`);
    })
    .then(() => {
      return db.query(
        `CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL,
        user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('customer', 'shopkeeper', 'admin')),
        phone VARCHAR UNIQUE NOT NULL,
        house_number VARCHAR(20),
        street VARCHAR(200),
        city VARCHAR(200),
        postcode VARCHAR(20),
        country VARCHAR(200),
        utr VARCHAR(11),
        CONSTRAINT check_utr_for_shopkeeper CHECK ((user_type = 'shopkeeper' AND utr IS NOT NULL) OR user_type != 'shopkeeper'),
        CONSTRAINT check_address_for_customers_shopkeepers CHECK (((user_type = 'customer' OR user_type = 'shopkeeper') AND (house_number IS NOT NULL OR street IS NOT NULL OR city IS NOT NULL OR postcode IS NOT NULL OR country IS NOT NULL)) OR user_type = 'admin')
        )`
      );
    })
    .then(() => {
      return db.query(`CREATE TABLE electronics (
              electronics_id SERIAL PRIMARY KEY,
              name VARCHAR(100) NOT NULL,
              description TEXT NOT NULL,
              price INT NOT NULL,
              image_url VARCHAR(200) NOT NULL,
              shopkeeper_id SERIAL REFERENCES users(user_id)
              )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE baskets (
                basket_id SERIAL PRIMARY KEY,
                user_id INT NOT NULL REFERENCES users(user_id),
                electronics_id SERIAL REFERENCES electronics(electronics_id),
                quantity INT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
                )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE orders (
                  order_id SERIAL PRIMARY KEY,
                  user_id INT NOT NULL REFERENCES users(user_id),
                  electronics_id SERIAL REFERENCES electronics(electronics_id),
                  quantity INT NOT NULL
                  )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE repair_requests (
                    request_id SERIAL PRIMARY KEY,
                    customer_id INT NOT NULL REFERENCES users(user_id),
                    electronic_id SERIAL REFERENCES electronics(electronics_id),
                    description TEXT NOT NULL,
                    timestamp TIMESTAMP DEFAULT NOW()
                    )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE bids (
                      bid_id SERIAL PRIMARY KEY,
                      shopkeeper_id INT NOT NULL REFERENCES users(user_id),
                      request_id SERIAL REFERENCES repair_requests(request_id),
                      status VARCHAR(20) NOT NULL,
                      timestamp TIMESTAMP DEFAULT NOW()
                      )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE reviews (
                        review_id SERIAL PRIMARY KEY,
                        user_id INT NOT NULL REFERENCES users(user_id),
                        electronic_id SERIAL REFERENCES electronics(electronics_id),
                        rating INT NOT NULL,
                        review TEXT NOT NULL,
                        timestamp TIMESTAMP DEFAULT NOW()
                        )`);
    })
    .then(() => {
      return userDataPromise;
    })
    .then((userData) => {
      const insertUsersQueryStr = format(
        `INSERT INTO users (username, name, password, email, user_type, phone, house_number, street, city, postcode, country, utr) VALUES %L RETURNING *;`,
        userData.map(
          ({
            username,
            name,
            password,
            email,
            phone,
            house_number,
            street,
            city,
            postcode,
            country,
            user_type,
            utr,
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
            utr,
          ]
        )
      );
      return db.query(insertUsersQueryStr);
    });
};

module.exports = seed;
