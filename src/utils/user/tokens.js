const { generateJsonWebToken } = require('../jwt');
const {
  generateCryptoHashedToken,
  generateCryptoUnhashedToken,
} = require('../crypto');

const generateEmailVerificationToken = () => {
  const unHashedToken = generateCryptoUnhashedToken();
  const hashedToken = generateCryptoHashedToken(unHashedToken);

  const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 min

  return { unHashedToken, hashedToken, tokenExpiry };
};

const generateAccessToken = (payload) =>
  generateJsonWebToken(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_SECRET_EXPIRY
  );

const generateRefreshToken = () =>
  generateJsonWebToken(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
    },
    process.env.REFRESH_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_SECRET_EXPIRY
  );

module.exports = {
  generateEmailVerificationToken,
  generateAccessToken,
  generateRefreshToken,
};
