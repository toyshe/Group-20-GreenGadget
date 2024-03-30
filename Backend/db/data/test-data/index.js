const initializeUserData = require("./users.js");

const userDataPromise = initializeUserData()
  .then((hashedUserData) => {
    return hashedUserData;
  })
  .catch((error) => {
    console.error("Error initializing user data:", error);
  });

module.exports = { userDataPromise };
