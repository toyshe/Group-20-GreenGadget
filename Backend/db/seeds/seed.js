const db = require("../connection");
const format = require("pg-format");
const { formatElectronics, createRef, formatBaskets } = require("../../utils/utils");
// const { basketData } = require("../data/test-data");

const seed = ({ userDataPromise, electronicsData, categoriesData, basketData }) => {
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
      return db.query(`DROP TABLE IF EXISTS categories`);
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
      return db.query(`CREATE TABLE categories (
        slug VARCHAR PRIMARY KEY,
        description VARCHAR NOT NULL
      )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE electronics (
        electronics_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        model VARCHAR NOT NULL,
        electronics_type VARCHAR(20) NOT NULL REFERENCES categories(slug),
        storage_in_gb INT NOT NULL,
        description TEXT NOT NULL,
        price FLOAT NOT NULL,
        img_url VARCHAR(200) NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        shopkeeper_id SERIAL REFERENCES users(user_id)
        )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE baskets (
        basket_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(user_id),
        electronics_id SERIAL REFERENCES electronics(electronics_id) ON DELETE CASCADE,
        quantity INT NOT NULL,
        created_at DATE DEFAULT NOW()
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
        electronics_id SERIAL REFERENCES electronics(electronics_id),
        description TEXT NOT NULL,
        timestamp DATE DEFAULT NOW()
        )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE bids (
        bid_id SERIAL PRIMARY KEY,
        shopkeeper_id INT NOT NULL REFERENCES users(user_id),
        request_id SERIAL REFERENCES repair_requests(request_id),
        status VARCHAR(20) NOT NULL,
        timestamp DATE DEFAULT NOW()
        )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(user_id),
        electronics_id SERIAL REFERENCES electronics(electronics_id),
        rating INT NOT NULL,
        review TEXT NOT NULL,
        timestamp DATE DEFAULT NOW()
        )`);
    })

    .then(() => {
      const insertCategoriesQueryStr = format(
        `INSERT INTO categories (slug, description) VALUES %L RETURNING *;`,
        categoriesData.map(({ slug, description }) => [slug, description])
      );
      return db.query(insertCategoriesQueryStr);
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
    })
    .then(({ rows }) => {
      const shopkeeperIdLookup = createRef(rows, "username", "user_id");
      const formatElectronicsData = formatElectronics(
        electronicsData,
        shopkeeperIdLookup
      );

      const insertElectronicsQuery = format(
        `INSERT INTO electronics (name, model, electronics_type, storage_in_gb, description, price, img_url, quantity, shopkeeper_id) VALUES %L RETURNING *;`,
        formatElectronicsData.map(
          ({
            name,
            model,
            electronics_type,
            storage_in_gb,
            description,
            price,
            img_url,
            quantity,
            shopkeeper_id,
          }) => [
            name,
            model,
            electronics_type,
            storage_in_gb,
            description,
            price,
            img_url,
            quantity,
            shopkeeper_id,
          ]
        )
      );
      return db.query(insertElectronicsQuery);
    })
    .then(() => {
      return db.query("SELECT * FROM users")
    }).then(({rows}) => {
      const userIdLookup = createRef(rows, "username", "user_id");
      const formatBasketsData = formatBaskets(basketData, userIdLookup);
      const insertBasketsQueryStr = format(`INSERT INTO baskets (user_id, electronics_id, quantity, created_at) VALUES %L RETURNING *;`, 
      formatBasketsData.map(({user_id, electronics_id, quantity, created_at}) => [user_id, electronics_id, quantity, created_at]))
      return db.query(insertBasketsQueryStr);
    })
    // .then(() => {
    //   const insertBasketsQueryStr = format(
    //     `INSERT INTO baskets (user_id, electronics_id, quantity, created_at) SELECT users.user_id, %L FROM users WHERE users.username = %L`,
    //     ...basketData.map(({ username, electronics_id, quantity, created_at }) => [
    //       username,
    //       electronics_id,
    //       quantity,
    //       created_at,
    //     ])
    //   );
    //   return db.query(insertBasketsQueryStr);
    // });
};

module.exports = seed;
