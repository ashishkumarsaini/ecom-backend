const { asyncHandler } = require('../../utils/async-handler');
const { User } = require('../../models/user.models');
const { APIError, APIResponse } = require('../../utils/api');
const { sendEmail, forgotPasswordMailGenerator } = require('../../utils/email');
const { generateCryptoHashedToken } = require('../../utils/crypto');

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new APIError(404, 'Email is required');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new APIError(404, 'Email does not exists');
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryTokens();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordTokenExpiry = tokenExpiry;

  await sendEmail({
    email: user.email,
    subject: 'Password reset request',
    mailgenContent: forgotPasswordMailGenerator(
      user.username,
      `${req.protocol}://${req.get(
        'host'
      )}/api/auth/reset-password/${unHashedToken}`
    ),
  });

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new APIResponse(200, 'Password reset email has been sent to your mail ID')
    );
});

const resetForgotPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
  const { resetToken } = req.params;

  if (!resetToken) {
    throw new APIError(400, 'Reset password token is missing');
  }

  if (!newPassword) {
    throw new APIError(404, 'Email is required');
  }

  const hashedToken = generateCryptoHashedToken(resetToken);

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new APIError(404, 'Token is invalid or expired');
  }

  user.forgotPasswordExpiry = undefined;
  user.forgotPasswordToken = undefined;
  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new APIResponse(200, 'Password reset successfully'));
});

module.exports = { forgotPasswordRequest, resetForgotPassword };
