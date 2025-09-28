const { registerUser } = require('./register-user.controllers');
const { verifyEmail } = require('./verifyEmail.controllers');
const { loginUser } = require('./login-user.controllers');
const { logoutUser } = require('./logout-user.controllers');

module.exports = { registerUser, verifyEmail, loginUser, logoutUser };
