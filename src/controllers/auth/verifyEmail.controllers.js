const { asyncHandler } = require('../../utils/async-handler');
const { APIError, APIResponse } = require('../../utils/api');
const { generateHashedToken } = require('../../utils/crypto');
const { User } = require('../../models/user.models');

const verifyEmail = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    throw new APIError(400, 'Email veification token is missing');
  }

  const hashedToken = generateHashedToken(verificationToken);

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificaitionTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new APIError(400, 'Token is invalid or expired');
  }

  user.emailVerificationToken = undefined;
  user.emailVerificaitionTokenExpiry = undefined;
  user.isEmailVerified = true;

  await user.save({ validateBeforeSave: false });

  return res.status(200).json(
    new APIResponse(200, 'Email verified', {
      email: user.email,
      firstName: user.firstName,
    })
  );
});

module.exports = { verifyEmail };
