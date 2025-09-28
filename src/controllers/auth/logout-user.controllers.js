const { asyncHandler } = require('../../utils/async-handler');
const { User } = require('../../models/user.models');
const { APIError, APIResponse } = require('../../utils/api');

const logoutUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new APIError('401', 'User not found');
  }

  await User.findOneAndUpdate(
    req.user._id,
    { $set: { refreshToken: '' } },
    { new: true }
  );

  const options = {
    httpsOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new APIResponse(200, 'User logout'));
});

module.exports = { logoutUser };
