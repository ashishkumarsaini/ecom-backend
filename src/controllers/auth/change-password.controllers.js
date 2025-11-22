const { asyncHandler } = require('../../utils/async-handler');
const { User } = require('../../models/user.models');
const { APIError, APIResponse } = require('../../utils/api');

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new APIError(401, 'Password is empty');
  }

  if (oldPassword === newPassword) {
    throw new APIError(401, 'Old and New password are same!');
  }

  if (!req.user) {
    throw new APIError(401, 'User not found');
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new APIError(400, 'User not found');
  }

  const isPasswordValid = await user.isValidPassword(oldPassword);

  if (!isPasswordValid) {
    throw new APIError(400, 'Invalid old password');
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new APIResponse(200, 'Password changes successfully'));
});

module.exports = { changePassword };
