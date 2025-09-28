const { asyncHandler } = require('../../utils/async-handler');
const { User } = require('../../models/user.models');
const { APIError, APIResponse } = require('../../utils/api');
const {
  sendEmail,
  emailVerificationMailGenerator,
} = require('../../utils/email');

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const searchedUser = await User.findOne({ email });

  if (searchedUser) {
    throw new APIError(400, 'User already registered with this email');
  }

  const createdUser = await User.create({
    email,
    password,
    firstName,
    lastName,
  });

  const { unHashedToken, hashedToken, tokenExpiry } =
    createdUser.generateTemporaryTokens();

  createdUser.emailVerificationToken = hashedToken;
  createdUser.emailVerificaitionTokenExpiry = tokenExpiry;

  createdUser.save({ validateBeforeSave: false });

  await sendEmail({
    email: createdUser.email,
    subject: 'Please verify your email',
    mailgenContent: emailVerificationMailGenerator(
      createdUser.firstName,
      `${req.protocol}://${req.get(
        'host'
      )}/api/auth/verify-email/${unHashedToken}`
    ),
  });

  res
    .status(200)
    .json(new APIResponse(200, 'User registered successfully', createdUser));
});

module.exports = { registerUser };
