const initializeUserData = require("./users.js");
exports.electronicsData = require("./electronics.js");
exports.categoriesData = require("./categories.js")

exports.userDataPromise = initializeUserData()
  .then((hashedUserData) => {
    return hashedUserData;
  })
  .catch((error) => {
    console.error("Error initializing user data:", error);
  });

// module.exports = { userDataPromise, electronicsData, categoriesData };
