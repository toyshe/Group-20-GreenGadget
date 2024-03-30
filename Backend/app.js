const express = require('express');

const cors = require("cors");
const { getUsers, postUsers } = require('./controllers/users.controllers');

const app = express();

app.use(express.json());

app.get('/users', getUsers)

app.post('/users', postUsers)

module.exports = app
