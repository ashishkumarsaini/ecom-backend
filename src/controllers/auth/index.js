const { registerUser } = require('./register-user.controllers');
const { verifyEmail } = require('./verifyEmail.controllers');
const { loginUser } = require('./login-user.controllers');

module.exports = { registerUser, verifyEmail, loginUser };
