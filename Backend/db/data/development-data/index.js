const initializeUserData = require("./users");

exports.userDataPromise = initializeUserData()
  .then((hashedUserData) => {
    return hashedUserData;
  })
  .catch((error) => {
    console.error("Error initializing user data:", error);
  });

exports.categoriesData = require("./categories");
exports.electronicsData = require("./electronics")