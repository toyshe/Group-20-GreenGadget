const app = require("../app.js");
const request = require("supertest");
const seed = require("../db/seeds/seed.js");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const initializeUserData = require("../db/data/test-data/users");
const endpoints = require("../endpoints.json");

beforeAll(() => {
  return initializeUserData();
});

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(testData);
});

describe("app", () => {
  describe("/api", () => {
    test("GET 200: retuns a list of all the endpoints available", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          const endpointKeys = Object.keys(endpoints);
          expect(Object.keys(body).length).toBe(endpointKeys.length);

          endpointKeys.forEach((eachEndpointKey) => {
            expect(body[eachEndpointKey]).toEqual(endpoints[eachEndpointKey]);
          });
        });
    });
  });
  describe("/users", () => {
    test("GET 200: returns an object containing all users available", () => {
      return request(app)
        .get("/users")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users.length).toBe(6);
          users.forEach((user) => {
            expect(user).toHaveProperty("username");
            expect(user).toHaveProperty("name");
            expect(user).toHaveProperty("password");
            expect(user).toHaveProperty("email");
            expect(user).toHaveProperty("phone");
            expect(user).toHaveProperty("user_type");
          });
        });
    });
    test("POST 201: returns an object containing the user details of the newly created user: customer", () => {
      const newUser = {
        username: "test",
        name: "test data",
        password: "testpw",
        email: "test@example.come",
        phone: "07890765432",
        user_type: "customer",
        house_number: "10",
        street: "Downing street",
        city: "London",
        postcode: "SW1A 2AA",
        country: "United Kingdom",
      };
      return request(app)
        .post("/users")
        .send(newUser)
        .expect(201)
        .then(({ body: { users } }) => {
          expect(users.username).toBe("test");
          expect(users.name).toBe("test data");
          expect(users.password).not.toBe("testpw");
          expect(users.email).toBe("test@example.come");
          expect(users.phone).toBe("07890765432");
          expect(users.user_type).toBe("customer");
          expect(users.house_number).toBe("10");
          expect(users.street).toBe("Downing street");
          expect(users.city).toBe("London");
          expect(users.postcode).toBe("SW1A 2AA");
          expect(users.country).toBe("United Kingdom");
        });
    });
    test("POST 201: returns an object containing the user details of the newly created user: shopkeeper", () => {
      const newUser = {
        username: "test",
        name: "test data",
        password: "testpw",
        email: "test@example.com",
        phone: "07890765432",
        house_number: "10",
        street: "Downing street",
        city: "London",
        postcode: "SW1A 2AA",
        country: "United Kingdom",
        user_type: "shopkeeper",
        utr: "1234567890",
      };
      return request(app)
        .post("/users")
        .send(newUser)
        .expect(201)
        .then(({ body: { users } }) => {
          expect(users.username).toBe("test");
          expect(users.name).toBe("test data");
          expect(users.password).not.toBe("testpw");
          expect(users.email).toBe("test@example.com");
          expect(users.phone).toBe("07890765432");
          expect(users.user_type).toBe("shopkeeper");
          expect(users.house_number).toBe("10");
          expect(users.street).toBe("Downing street");
          expect(users.city).toBe("London");
          expect(users.postcode).toBe("SW1A 2AA");
          expect(users.country).toBe("United Kingdom");
          expect(users.utr).toBe("1234567890");
        });
    });
    test("POST 201: returns an object containing the user details of the newly created user: admin", () => {
      const newUser = {
        username: "admin",
        name: "admin test",
        password: "passwordAdmin",
        email: "admintest@test.com",
        phone: "07986543216",
        user_type: "admin",
      };
      return request(app)
        .post("/users")
        .send(newUser)
        .expect(201)
        .then(({ body: { users } }) => {
          expect(users.username).toBe("admin");
          expect(users.name).toBe("admin test");
          expect(users.password).not.toBe("passwordAdmin");
          expect(users.email).toBe("admintest@test.com");
          expect(users.phone).toBe("07986543216");
          expect(users.user_type).toBe("admin");
        });
    });
    test("POST 400: returns error message when constraint is broken", () => {
      const userDetails = {
        username: "test",
        name: "test fail",
        password: "testfailpw",
        email: "testfail@test.com",
        user_type: "customer",
      };
      return request(app)
        .post("/users")
        .send(userDetails)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
    test("POST 400: returns error message when username, email or phone number provided already exists", () => {
      const userDetails = {
        username: "happyamy",
        password: "happyamypw",
        name: "Happy Amy",
        email: "amy-happy@test.com",
        phone: "07123456789",
        user_type: "admin",
      };
      return request(app)
        .post("/users")
        .send(userDetails)
        .expect(409)
        .then(({ body }) => {
          expect(body.msg).toBe("Username already exists");
        });
    });
  });
  describe("/login", () => {
    test("POST 200: check if the user details entered is correct", () => {
      const userDetails = {
        usernameOrEmail: "happyamy",
        password: "happyamypw",
      };
      return request(app)
        .post("/login")
        .send(userDetails)
        .expect(200)
        .then(({ body: { loginMessage } }) => {
          expect(loginMessage).toBe("Welcome back, happyamy");
        });
    });
    test("POST 400: return error message when username or email is not provided", () => {
      const userDetails = {
        password: "<PASSWORD>",
      };
      return request(app)
        .post("/login")
        .send(userDetails)
        .expect(400)
        .then(({ body: { err } }) => {
          expect(err).toBe("Please enter a username or email");
        });
    });
    test("POST 400: return error message when password is not provided", () => {
      const userDetails = {
        usernameOrEmail: "happyamy",
      };
      return request(app)
        .post("/login")
        .send(userDetails)
        .expect(400)
        .then(({ body: { err } }) => {
          expect(err).toBe("Please enter a password");
        });
    });
    test("POST 404: returns not found if user does not exist", () => {
      const userDetails = {
        usernameOrEmail: "amy-happy3@test.com",
        password: "<PASSWORD>",
      };
      return request(app)
        .post("/login")
        .send(userDetails)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("User not found");
        });
    });
    test("POST 401: return error message when entered wrong credentials", () => {
      const userDetails = {
        usernameOrEmail: "amy-happy@test.com",
        password: "<PASSWORD>",
      };
      return request(app)
        .post("/login")
        .send(userDetails)
        .expect(401)
        .then(({ body: { loginMessage } }) => {
          expect(loginMessage).toBe("Invalid credentials");
        });
    });
  });
  describe("/electronics", () => {
    test("GET 200: returns an object containing all electronics", () => {
      return request(app).get("/electronics").expect(200).then(({body : {electronics}}) => {
        expect(electronics.length).toBe(10)
        electronics.forEach((electronic) => {
          expect(electronic).toHaveProperty("name")
          expect(electronic).toHaveProperty("model")
          expect(electronic).toHaveProperty("price")
          expect(electronic).toHaveProperty("description")
          expect(electronic).toHaveProperty("img_url")
          expect(electronic).toHaveProperty("storage")
          expect(electronic).toHaveProperty("electronics_type")
          expect(electronic).toHaveProperty("shopkeeper_id")
        })
      })
    })
    test("POST 201: returns an object containing the details of the newly created electronic", () => {
      const newElectronic = {
        name: "test electronic", 
        model: "test model", 
        price: 100.00,
        description: "test description",
        storage: "test storage",
        electronics_type: "Phone",
        img_url: "test url",
        shopkeeper_username: "grahamcracker"
      }
      return request(app).post('/electronics').send(newElectronic).expect(201).then(({body: {electronics}}) => {
        expect(electronics.name).toBe("test electronic")
        expect(electronics.model).toBe("test model")
        expect(electronics.price).toBe(100.00)
        expect(electronics.description).toBe("test description")
        expect(electronics.storage).toBe("test storage")
        expect(electronics.electronics_type).toBe("Phone")
        expect(electronics.img_url).toBe("test url")
        expect(electronics.shopkeeper_id).toBe(6)
      })
    })
    test("POST 400: returns error message when constraint is broken", () => {
      const newElectronic = {
        name: "test electronic", 
        storage: "test storage",
        electronics_type: "Phone",
        img_url: "test url",
        shopkeeper_username: "grahamcracker"
      }
      return request(app).post('/electronics').send(newElectronic).expect(400).then(({body}) => {
        expect(body.msg).toBe("Bad request")
      })
    })
    test("POST 400: returns an error message if the shopkeeper does no exist", () => {
      const newElectronic = {
        name: "test electronic", 
        model: "test model", 
        price: 100.00,
        description: "test description",
        storage: "test storage",
        electronics_type: "Phone",
        img_url: "test url",
        shopkeeper_username: "grahamcrackers"
      }
      return request(app).post("/electronics").send(newElectronic).expect(400).then(({body}) => {
        expect(body.msg).toBe("Shopkeeper does not exist")
      })
    })
  })
});
