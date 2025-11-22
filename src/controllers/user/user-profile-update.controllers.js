const { User } = require('../../models/user.models');
const { APIError, APIResponse } = require('../../utils/api');
const { asyncHandler } = require('../../utils/async-handler');

const userProfileUpdate = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new APIError(401, 'User not found!');
  }

  const { firstName, lastName } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      firstName: firstName,
      lastName: lastName,
    },
    { new: true }
  ).select(
    '-password -refreshToken -forgotPasswordToken -forgotPasswordTokenExpiry -emailVerificationToken -emailVerificaitionTokenExpiry'
  );

  user.filteredUser();

  if (!user) {
    throw new APIError(401, 'Failed to update user!');
  }

  return res
    .status(200)
    .json(new APIResponse(200, 'User updated successfully', { user }));
});

module.exports = { userProfileUpdate };
