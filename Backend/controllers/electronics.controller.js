const {
  findElectronics,
  insertElectronics,
  updateElectronicsById,
  findElectronicById,
  removeElectronicsById,
} = require("../models/electronics.model");
const {
  checkCategoryExists,
  checkShopkeeperExists,
  checkPageValid,
} = require("../utils/check-exists");

exports.getElectronics = (req, res, next) => {
  const { electronics_type, sort_by, order, shopkeeper, page } = req.query;

  const fetchQuery = findElectronics(
    electronics_type,
    sort_by,
    order,
    shopkeeper,
    page
  );
  const queries = [fetchQuery];

  if (electronics_type) {
    const categoriesExistenceQuery = checkCategoryExists(electronics_type);
    queries.push(categoriesExistenceQuery);
  }

  if (shopkeeper) {
    const shopkeeperExistenceQuery = checkShopkeeperExists(shopkeeper);
    queries.push(shopkeeperExistenceQuery);
  }

  if(page){
    const pageValidityQuery = checkPageValid(page)
    queries.push(pageValidityQuery)
  }

  Promise.all(queries)
    .then(([fetchQuery]) => {
      res.status(200).send({ electronics: fetchQuery });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postElectronics = (req, res, next) => {
  const electronic = req.body;
  insertElectronics(electronic)
    .then((electronics) => {
      res.status(201).send({ electronics });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getElectronicById = (req, res, next) => {
  const { electronics_id } = req.params;
  findElectronicById(electronics_id)
    .then((electronic) => {
      res.status(200).send({ electronic });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchElectronicsById = (req, res, next) => {
  const { electronics_id } = req.params;
  const { updatedQuantity } = req.body;

  updateElectronicsById(electronics_id, updatedQuantity)
    .then((electronic) => {
      res.status(200).send({ electronic });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteElectronicsById = (req, res, next) => {
  const { electronics_id } = req.params;

  removeElectronicsById(electronics_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
