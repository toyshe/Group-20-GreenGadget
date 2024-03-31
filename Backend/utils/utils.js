const bcrypt = require("bcrypt");

async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Error hashing password: ${error.message}`);
  }
}

async function hashPasswords(userData) {
  try {
    const hashedUserData = [];
    for (const user of userData) {
      const hashedPassword = await hashPassword(user.password);
      const hashedUser = { ...user, password: hashedPassword };
      hashedUserData.push(hashedUser);
    }
    //   console.log(hashedUserData);
    return hashedUserData;
  } catch (error) {
    throw new Error(`Error hashing passwords: ${error.message}`);
  }
}

async function seedUsers(userData) {
  const hashedUserData = await Promise.all(
    userData.map(async (user) => {
      const hashedPassword = await hashPassword(user.password);
      console.log({...user, password: hashedPassword });
      return { ...user, password: hashedPassword };
    })
  )
}

function comparePasswords(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = { hashPasswords, seedUsers, hashPassword, comparePasswords };
