const express = require("express");

const cors = require("cors");
const {
  getUsers,
  postUsers,
  getUserLogin,
} = require("./controllers/users.controllers");
const { psqlErrors, customErrors } = require("./error-handling");
const { getApi } = require("./controllers/api.controller");
const { getElectronics, postElectronics, patchElectronicsById, getElectronicById, deleteElectronicsById } = require("./controllers/electronics.controller");
const { getCategories, postCategories } = require("./controllers/categories.controller");
const { getBaskets, getBasketsByUserId, postBaskets, deleteItemInBasket, patchItemInBasket } = require("./controllers/basket.controller");

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // or your Netlify domain when deploying
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allows cookies and credentials to be shared
};

app.use(cors(corsOptions));

// Apply CORS preflight for all routes
app.options('*', cors(corsOptions));
app.use(express.json());

app.get("/api", getApi)

app.get("/users", getUsers);
app.post("/users", postUsers);
app.post("/login", getUserLogin);

app.get("/electronics", getElectronics)
app.post("/electronics", postElectronics)

app.get("/electronics/:electronics_id", getElectronicById)
app.patch("/electronics/:electronics_id", patchElectronicsById)
app.delete("/electronics/:electronics_id", deleteElectronicsById)

app.get("/categories", getCategories)
app.post("/categories", postCategories)

app.get('/basket', getBaskets)
app.get('/basket/:user_id', getBasketsByUserId)
app.post('/basket', postBaskets)
app.delete('/basket/:user_id/:electronics_id', deleteItemInBasket)
app.patch('/basket/:user_id/:electronics_id', patchItemInBasket)

app.use(psqlErrors);

app.use(customErrors);

module.exports = app;
