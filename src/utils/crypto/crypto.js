const crypto = require('crypto');

const generateCryptoHashedToken = (unHashedToken) => {
  return crypto.createHash('sha256').update(unHashedToken).digest('hex');
};

const generateCryptoUnhashedToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

module.exports = {
  generateCryptoHashedToken,
  generateCryptoUnhashedToken,
};
