const app = require("../app.js");
const request = require("supertest");
const seed = require("../db/seeds/seed.js");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const initializeUserData = require("../db/data/test-data/users");
const endpoints = require("../endpoints.json");
const e = require("express");

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
            expect(user).toHaveProperty("avatar_img_url");
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
          expect(loginMessage.username || loginMessage.email).toBe(userDetails.usernameOrEmail);
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
      return request(app)
        .get("/electronics")
        .expect(200)
        .then(({ body: { electronics } }) => {
          expect(electronics.length).toBe(10);
          electronics.forEach((electronic) => {
            expect(electronic).toHaveProperty("name");
            expect(electronic).toHaveProperty("model");
            expect(electronic).toHaveProperty("price");
            expect(electronic).toHaveProperty("description");
            expect(electronic).toHaveProperty("img_url");
            expect(electronic).toHaveProperty("storage_in_gb");
            expect(electronic).toHaveProperty("electronics_type");
            expect(electronic).toHaveProperty("quantity");
            expect(electronic).toHaveProperty("shopkeeper_id");
          });
        });
    });
    test("POST 201: returns an object containing the details of the newly created electronic", () => {
      const newElectronic = {
        name: "test electronic",
        model: "test model",
        price: 100.0,
        description: "test description",
        storage_in_gb: 128,
        electronics_type: "Phone",
        img_url: "test url",
        quantity: 3,
        shopkeeper_username: "grahamcracker",
      };
      return request(app)
        .post("/electronics")
        .send(newElectronic)
        .expect(201)
        .then(({ body: { electronics } }) => {
          expect(electronics.name).toBe("test electronic");
          expect(electronics.model).toBe("test model");
          expect(electronics.price).toBe(100.0);
          expect(electronics.description).toBe("test description");
          expect(electronics.storage_in_gb).toBe(128);
          expect(electronics.electronics_type).toBe("Phone");
          expect(electronics.img_url).toBe("test url");
          expect(electronics.quantity).toBe(3);
          expect(electronics.shopkeeper_id).toBe(6);
        });
    });
    test("POST 400: returns error message when constraint is broken", () => {
      const newElectronic = {
        name: "test electronic",
        storage_in_gb: 128,
        electronics_type: "Phone",
        img_url: "test url",
        shopkeeper_username: "grahamcracker",
      };
      return request(app)
        .post("/electronics")
        .send(newElectronic)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
    test("POST 400: returns an error message if the shopkeeper does no exist", () => {
      const newElectronic = {
        name: "test electronic",
        model: "test model",
        price: 100.0,
        description: "test description",
        storage_in_gb: 128,
        electronics_type: "Phone",
        img_url: "test url",
        quantity: 7,
        shopkeeper_username: "grahamcrackers",
      };
      return request(app)
        .post("/electronics")
        .send(newElectronic)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Shopkeeper does not exist");
        });
    });
    test("GET 200: returns an object of all electronics filtered by electronics_type query", () => {
      return request(app)
        .get("/electronics?electronics_type=Laptop")
        .expect(200)
        .then(({ body: { electronics } }) => {
          expect(electronics).toHaveLength(5);
          electronics.forEach((electronic) => {
            expect(electronic.electronics_type).toBe("Laptop");
          });
        });
    });
    test("GET 400: returns error message if an invalid electronics_type is given", () => {
      return request(app)
        .get("/electronics?electronics_type=not-a-valid-query")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid query");
        });
    });
    test("GET 200: returns all electronics sorted by price ascending", () => {
      return request(app)
        .get("/electronics?sort_by=price")
        .expect(200)
        .then(({ body: { electronics } }) => {
          expect(electronics).toHaveLength(10);
          expect(electronics).toBeSortedBy("price");
        });
    });
    test("GET 400: returns error message if given invalid sort_by queries", () => {
      return request(app)
        .get("/electronics?sort_by=invalid_sort_by")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid query");
        });
    });
    test("GET 400: returns error message if given invalid order queries", () => {
      return request(app)
        .get("/electronics?order=invalid_order")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid query");
        });
    });
    test("GET 200: returns all the electronics by a certain shopkeeper", () => {
      return request(app)
        .get("/electronics?shopkeeper=grahamcracker")
        .expect(200)
        .then(({ body: { electronics } }) => {
          expect(electronics).toHaveLength(5);
          electronics.forEach((electronic) => {
            expect(electronic.shopkeeper_id).toBe(6);
          });
        });
    });
    test("GET 400: returns error message if given an invalid shopkeeper query", () => {
      return request(app)
        .get("/electronics?shopkeeper=invalid_shopkeeper")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid query");
        });
    });
    test("GET 200: returns all the electronics filtered by electronics_type query and shopkeeper_query", () => {
      return request(app)
        .get("/electronics?electronics_type=Phone&&shopkeeper=stevens")
        .expect(200)
        .then(({ body: { electronics } }) => {
          expect(electronics).toHaveLength(2);
          electronics.forEach((electronic) => {
            expect(electronic.shopkeeper_id).toBe(5);
            expect(electronic.electronics_type).toBe("Phone");
          });
        });
    });
    test("GET 200: returns the first page of the electronics with default limit of 9", () => {
      return request(app).get("/electronics?page=1").expect(200).then(({body: {electronics}}) => {
        expect(electronics).toHaveLength(9)
      })
    })
    test("GET 200: returns the second page of the electronics with default limit of 9", () => {
      return request(app).get("/electronics?page=2").expect(200).then(({body: {electronics}}) => {
        expect(electronics).toHaveLength(1)
      })
    })
  });
  describe("/electronics/:id", () => {
    test("GET 200: returns an object containing the details of the electronic with the given id", () => {
      return request(app)
        .get("/electronics/1")
        .expect(200)
        .then(({ body: { electronic } }) => {
          expect(electronic.electronics_id).toBe(1);
          expect(electronic.name).toBe("IPhone 13");
          expect(electronic.model).toBe("IPhone 13 128GB");
          expect(electronic.price).toBe(280.0);
          expect(electronic.description).toBe(
            "A royal blue iphone 13 with 128GB storage"
          );
          expect(electronic.storage_in_gb).toBe(128);
          expect(electronic.electronics_type).toBe("Phone");
          expect(electronic.quantity).toBe(6);
        });
    });
    test("GET 400: returns error message if given an invalid id", () => {
      return request(app)
        .get("/electronics/not-a-valid-id")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
    test("GET 404: returns error message if given an id that does not exist", () => {
      return request(app)
        .get("/electronics/1000")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("electronics_id not found");
        });
    });
    test("PATCH 200: changes the quantity of an electronic", () => {
      const updatedQuantity = { updatedQuantity: 1 };
      return request(app)
        .patch("/electronics/2")
        .send(updatedQuantity)
        .expect(200)
        .then(({ body: { electronic } }) => {
          expect(electronic.electronics_id).toBe(2);
          expect(electronic.quantity).toBe(4);
        });
    });
    test("PATCH 400: returns error message if given an invalid electronics_id", () => {
      const updatedQuantity = { updatedQuantity: 1 };
      return request(app)
        .patch("/electronics/not-a-valid-id")
        .send(updatedQuantity)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
    test("PATCH 404: returns not found if the electronics_id does not exist", () => {
      const updatedQuantity = { updatedQuantity: 2 };
      return request(app)
        .patch("/electronics/1000")
        .send(updatedQuantity)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("electronics_id not found");
        });
    });
    test("PATCH 400: returns error message if given an invalid quantity", () => {
      const updatedQuantity = { updatedQuantity: "not-a-valid-quantity" };
      return request(app)
        .patch("/electronics/2")
        .send(updatedQuantity)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
    test("PATCH 200: deletes an electronic if the the quantity after patch is 0", () => {
      const updatedQuantity = { updatedQuantity: -3 };
      return request(app)
        .patch("/electronics/2")
        .send(updatedQuantity)
        .expect(200)
        .then(() => {
          return request(app).get("/electronics/2").expect(404);
        });
    });
    test("PATCH 400: returns error message if the quantity returned is negative", () => {
      const updatedQuantity = { updatedQuantity: -10 };
      return request(app)
        .patch("/electronics/2")
        .send(updatedQuantity)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Not enough of item");
        });
    });
    test("DELETE 204: deletes an electronic given an id", () => {
      return request(app).delete("/electronics/2").expect(204);
    });
    test("DELETE 400: returns error message if given an invalid id", () => {
      return request(app)
        .delete("/electronics/not-a-valid-id")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
    test("DELETE 404: returns not found if the id does not exist", () => {
      return request(app)
        .delete("/electronics/1000")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("electronics_id not found");
        });
    });
  });
  describe("/categories", () => {
    test("GET 200: returns an object of all categories", () => {
      return request(app)
        .get("/categories")
        .expect(200)
        .then(({ body: { categories } }) => {
          expect(categories).toHaveLength(2);
          categories.forEach((category) => {
            expect(category).toHaveProperty('slug');
            expect(category).toHaveProperty("description");
          });
        });
    });
    test("POST 201: returns an object containing the newly created category", () => {
      const newCategory = {
        slug: "test slug",
        description: "testing posting a new category"
      }
      return request(app).post("/categories").send(newCategory).expect(201).then(({body: {category}}) => {
        expect(category).toMatchObject(newCategory)
      })
    })
    test("POST 400: returns error message if given an incomplete category", () => {
      const newCategory = {slug: 'test slug'}
      return request(app).post("/categories").send(newCategory).expect(400).then(({body}) => {
        expect(body.msg).toBe("Bad request")
      })
    })
  });
  describe("/basket", () => {
    test("GET 200: returns all the electronics in all of the baskets", () => {
      return request(app).get('/basket').expect(200).then(({body: {baskets}}) => {
        expect(baskets.length).toBe(8)
        baskets.forEach((basket) => {
          expect(basket).toHaveProperty('user_id')
          expect(basket).toHaveProperty('username')
          expect(basket).toHaveProperty('electronics_id')
          expect(basket).toHaveProperty('basket_quantity')
          expect(basket).toHaveProperty('created_at')
        })
      })
    })
    test("GET 200: returns all the electronics in a basket by a user", () => {
      return request(app).get('/basket/1').expect(200).then(({body: {basket}}) => {
        expect(basket.length).toBe(2)
      })
    })
    test("POST 201: adds an item to a basket", () => {
      const newBasket = {
        username: 'jessjelly',
        electronics_id: 1,
        basket_quantity: 1
      }
      return request(app).post('/basket').send(newBasket).expect(201).then(({body: {basket}}) => {
        expect(basket.user_id).toBe(3)
      }).then(() => {
        return request(app).get('/basket/3').expect(200).then(({body: {basket}}) => {
         expect(basket.length).toBe(3)
        })
      })
    })
    test("DELETE 204: deletes an item from the basket", () => {
      return request(app).delete('/basket/1/9').expect(200).then(({body: {basket}}) => {
        expect(basket.length).toBe(1)
        basket.forEach((cart) => {
          expect(cart.user_id).toBe(1)
          expect(cart.electronics_id).toBe(1)
        })
      })
    })
  })
});
