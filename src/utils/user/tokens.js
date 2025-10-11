const { generateJsonWebToken, extractJsonWebTokenPayload } = require('../jwt');
const {
  generateCryptoHashedToken,
  generateCryptoUnhashedToken,
} = require('../crypto');
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET_EXPIRY,
} = require('../secrets');

const generateEmailVerificationToken = () => {
  const unHashedToken = generateCryptoUnhashedToken();
  const hashedToken = generateCryptoHashedToken(unHashedToken);

  const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 min

  return { unHashedToken, hashedToken, tokenExpiry };
};

const generateAccessToken = (payload) =>
  generateJsonWebToken(
    payload,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET_EXPIRY
  );

const extractAccessTokenPayload = (accessToken) =>
  extractJsonWebTokenPayload(accessToken, ACCESS_TOKEN_SECRET);

const generateRefreshToken = () =>
  generateJsonWebToken(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
    },
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET_EXPIRY
  );

module.exports = {
  generateEmailVerificationToken,
  generateAccessToken,
  extractAccessTokenPayload,
  generateRefreshToken,
};
