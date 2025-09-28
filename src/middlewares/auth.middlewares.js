const { APIError } = require('../utils/api');
const { asyncHandler } = require('../utils/async-handler');
const { extractAccessTokenPayload } = require('../utils/user');
const { User } = require('../models/user.models');

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookie?.accessToken ||
    req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new APIError(401, 'Unauthorized Access');
  }

  try {
    const decodedToken = extractAccessTokenPayload(token);

    if (!decodedToken || !decodedToken._id) {
      throw new APIError(401, 'Unable to decode token');
    }

    const user = await User.findById(decodedToken._id).select(
      '-password -refreshToken -emailToken -emailVerificationToken -emailVerificationExpiry'
    );

    if (!user) {
      throw new APIError(401, 'User not found for decoded token');
    }

    req.user = user;
    next();
  } catch (error) {
    throw new APIError(401, 'Error in validating user');
  }
});

module.exports = { verifyJWT };
