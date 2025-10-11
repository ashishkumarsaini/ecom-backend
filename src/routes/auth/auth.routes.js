const express = require('express');
const {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  resendVerifyEmail,
  forgotPasswordRequest,
  resetForgotPassword,
  changePassword,
} = require('../../controllers/auth');
const {
  validateMiddleware,
} = require('../../middlewares/validate.middlewares');
const {
  userRegisterValidator,
  userLoginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require('../../validators/auth.validators');
const { verifyJWT } = require('../../middlewares/auth.middlewares');

const authRouter = express.Router();

authRouter
  .route('/register')
  .post(userRegisterValidator(), validateMiddleware, registerUser);
authRouter.route('/verify-email/:verificationToken').get(verifyEmail);
authRouter
  .route('/login')
  .post(userLoginValidator(), validateMiddleware, loginUser);
authRouter.route('/logout').post(verifyJWT, logoutUser);
authRouter.route('/resend-verify-email').post(verifyJWT, resendVerifyEmail);
authRouter
  .route('/forgot-password')
  .post(forgotPasswordValidator(), validateMiddleware, forgotPasswordRequest);
authRouter
  .route('/reset-password/:resetToken')
  .post(resetPasswordValidator(), validateMiddleware, resetForgotPassword);
authRouter.route('/change-password').post(verifyJWT, changePassword);

module.exports = { authRouter };
