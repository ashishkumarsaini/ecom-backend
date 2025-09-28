const { generateBcryptHash, compareHashedData } = require('../bcrypt');

const generateHashedPassword = (password) => generateBcryptHash(password);

const compareHashedPassword = (password, hashedPassword) =>
  compareHashedData(password, hashedPassword);

module.exports = {
  generateHashedPassword,
  compareHashedPassword,
};
