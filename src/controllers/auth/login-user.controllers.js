const { asyncHandler } = require('../../utils/async-handler');
const { User } = require('../../models/user.models');
const { APIError, APIResponse } = require('../../utils/api');

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const searchedUser = await User.findById(userId);

    const accessToken = searchedUser.generateAccessToken();
    const refreshToken = searchedUser.generateRefreshToken();

    searchedUser.refreshToken = refreshToken;
    searchedUser.save({ validateBeforeSave: false });

    return { accessToken, refreshToken, searchedUser };
  } catch (error) {
    throw new APIError(
      500,
      'Something went wrong while generating access/refresh token'
    );
  }
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const searchedUser = await User.findOne({ email });

  if (!searchedUser) {
    throw new APIError(400, 'User does not exists');
  }

  const isValidPassword = await searchedUser.isValidPassword(password);

  if (!isValidPassword) {
    throw new APIError(400, 'Password is incorrect');
  }

  const userId = searchedUser._id;

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    userId
  );

  const user = await User.findById(userId).select(
    '-password -refreshToken -forgotPasswordToken -forgotPasswordTokenExpiry -emailVerificationToken -emailVerificaitionTokenExpiry'
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(new APIResponse(200, 'User loggedin successfully', user));
});

module.exports = { loginUser, generateAccessAndRefreshTokens };
