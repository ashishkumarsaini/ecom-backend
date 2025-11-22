const { APIError } = require('../utils/api');
const { asyncHandler } = require('../utils/async-handler');
const { UserRolesEnum } = require('../utils/user');

const verifyAdmin = asyncHandler(async (req, res, next) => {
  const user = req.user; // verifyJWT should be execute before
  if (!user) {
    throw new APIError(401, 'Unauthorized Access');
  }

  const isAdminUser = user.role === UserRolesEnum.ADMIN;

  if (!isAdminUser) {
    throw new APIError(401, 'Unauthorized Access');
  }

  req.user = user;
  next();
});

module.exports = { verifyAdmin };
