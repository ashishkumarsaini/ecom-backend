const { registerUser } = require('./register-user.controllers');
const { verifyEmail } = require('./verify-email.controllers');
const { loginUser } = require('./login-user.controllers');
const { logoutUser } = require('./logout-user.controllers');
const { resendVerifyEmail } = require('./resend-verify-email.controllers');

module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  resendVerifyEmail,
};
