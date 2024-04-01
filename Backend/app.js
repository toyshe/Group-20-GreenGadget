const express = require("express");

const cors = require("cors");
const {
  getUsers,
  postUsers,
  getUserLogin,
} = require("./controllers/users.controllers");
const { psqlErrors, customErrors } = require("./error-handling");
const { getApi } = require("./controllers/api.controller");
const { getElectronics, postElectronics } = require("./controllers/electronics.controller");

const app = express();

app.use(express.json());

app.get("/api", getApi)

app.get("/users", getUsers);
app.post("/users", postUsers);
app.post("/login", getUserLogin);

app.get("/electronics", getElectronics)
app.post("/electronics", postElectronics)

app.use(psqlErrors);

app.use(customErrors);

module.exports = app;
