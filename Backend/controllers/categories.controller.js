const {
  findCategories,
  insertCategories,
} = require("../models/categories.model");

exports.getCategories = (req, res, next) => {
  findCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCategories = (req, res, next) => {
  const newCategory = req.body;

  insertCategories(newCategory)
    .then((category) => {
      res.status(201).send({ category });
    })
    .catch((err) => {
      next(err);
    });
};
