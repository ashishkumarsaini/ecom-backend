const { User } = require('../../models/user.models');
const { asyncHandler } = require('../../utils/async-handler');
const { APIError, APIResponse } = require('../../utils/api');
const {
  sendEmail,
  emailVerificationMailGenerator,
} = require('../../utils/email');

const resendVerifyEmail = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new APIError('401', 'User not found');
  }

  const user = await User.findById(req.user._id);

  if (user.isEmailVerified) {
    throw new APIError(404, 'User is already verified');
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryTokens();

  user.emailVerificationToken = hashedToken;
  user.emailVerificaitionTokenExpiry = tokenExpiry;

  await sendEmail({
    email: user.email,
    subject: 'Please verify your email',
    mailgenContent: emailVerificationMailGenerator(
      user.firstName,
      `${req.protocol}://${req.get(
        'host'
      )}/api/auth/verify-email/${unHashedToken}`
    ),
  });

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new APIResponse(200, 'Mail has been sent to your email Id'));
});

module.exports = { resendVerifyEmail };
