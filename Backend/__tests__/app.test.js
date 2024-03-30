const app = require("../app.js");
const request = require("supertest");
const seed = require("../db/seeds/seed.js");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const initializeUserData = require("../db/data/test-data/users");

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
  describe("/signup", () => {
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
    test("POST 201: returns an object containing the user details of the newly created user", () => {
      const newUser = {
        username: "test",
        name: "test data",
        password: "testpw",
        email: "test@example.come",
        phone: "07890765432",
        user_type: "customer",
      };
      return request(app)
        .post("/users")
        .send(newUser)
        .expect(201)
        .then(({ body: { users } }) => {
          expect(users.username).toBe("test");
          expect(users.name).toBe("test data");
          expect(users.password).toBe("testpw");
          expect(users.email).toBe("test@example.come");
          expect(users.phone).toBe("07890765432")
          expect(users.user_type).toBe("customer");
        });
    });
  });
});
