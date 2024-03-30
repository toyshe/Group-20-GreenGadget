const initializeUserData = require("./users.js");

initializeUserData()
  .then((hashedUserData) => {
    exports.userData = hashedUserData;
    return hashedUserData
  })
  .catch((error) => {
    console.error("Error initializing user data:", error);
  });
