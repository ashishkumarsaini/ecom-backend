const { asyncHandler } = require('../../utils/async-handler');
const { User } = require('../../models/user.models');
const { APIError, APIResponse } = require('../../utils/api');

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new APIError(400, 'User already registered with this email');
  }

  const createdUser = await User.create({
    email,
    password,
    firstName,
    lastName,
  });

  res.status(200).json(
    new APIResponse(200, 'User registered successfully', {
      user: createdUser,
    })
  );
});

module.exports = { registerUser };
