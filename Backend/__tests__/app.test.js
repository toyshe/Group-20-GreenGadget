const app = require("../app.js")
const request = require("supertest")
const seed = require("../db/seeds/seed.js")
const db = require("../db/connection.js")
const testData = require("../db/data/test-data/index.js")
const { afterAll } = require("jest-circus")


afterAll(() => {
    return db.end()
})

beforeEach(() => {
    return seed(testData)
})

describe("app", () => {
    describe("/test", () => {
        test("expect to seed data", () => {
            // return "hello"
        })
    })
})