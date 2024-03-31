const {
  findUsers,
  insertUsers,
  findUserLogin,
} = require("../models/users.models");
const { comparePasswords } = require("../utils/utils");

exports.getUsers = (req, res, next) => {
  findUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postUsers = (req, res, next) => {
  const body = req.body;
  insertUsers(body)
    .then((users) => {
      res.status(201).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserLogin = (req, res, next) => {
  const { usernameOrEmail, password } = req.body;
  if (usernameOrEmail === undefined) {
    res.status(400).send({ err: "Please enter a username or email" });
  } else if (password === undefined) {
    res.status(400).send({ err: "Please enter a password" });
  }
  findUserLogin(usernameOrEmail)
    .then((user) => {
      return comparePasswords(password, user.password).then(
        (passwordMatched) => {
          if (passwordMatched) {
            res
              .status(200)
              .send({ loginMessage: "Welcome back, " + user.username });
          } else {
            res.status(401).send({ loginMessage: "Invalid credentials" });
          }
        }
      );
    })
    .catch((err) => {
      next(err);
    });
};
