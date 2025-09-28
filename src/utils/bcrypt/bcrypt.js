const bcrypt = require('bcrypt');

const generateBcryptHash = (data) => bcrypt.hash(data, 10);

const compareHashedData = (data, encyptedData) =>
  bcrypt.compare(data, encyptedData);

module.exports = {
  generateBcryptHash,
  compareHashedData,
};
