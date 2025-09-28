const jwt = require('jsonwebtoken');

const generateJsonWebToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn: expiresIn });
};

const extractJsonWebTokenPayload = (token, secret) => {
  return jwt.decode(token, secret);
};

module.exports = { generateJsonWebToken, extractJsonWebTokenPayload };
