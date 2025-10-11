const { asyncHandler } = require('../../utils/async-handler');
const { User } = require('../../models/user.models');
const { APIError, APIResponse } = require('../../utils/api');
const {
  sendEmail,
  emailVerificationMailGenerator,
} = require('../../utils/email');
const { FRONTEND_HOST } = require('../../utils/secrets');

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

  if (!createdUser) {
    throw new APIError(400, 'Failed to register user');
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    createdUser.generateTemporaryTokens();

  createdUser.emailVerificationToken = hashedToken;
  createdUser.emailVerificaitionTokenExpiry = tokenExpiry;

  await sendEmail({
    email: createdUser.email,
    subject: 'Please verify your email',
    mailgenContent: emailVerificationMailGenerator(
      createdUser.firstName,
      `${FRONTEND_HOST}/user/verify-email/?verifyToken=${unHashedToken}`
    ),
  });
  createdUser.save({ validateBeforeSave: false });

  const user = await User.findById(createdUser._id).select(
    '-password -refreshToken -forgotPasswordToken -forgotPasswordTokenExpiry -emailVerificationToken -emailVerificaitionTokenExpiry'
  );

  res
    .status(200)
    .json(new APIResponse(200, 'User registered successfully', user));
});

module.exports = { registerUser };
