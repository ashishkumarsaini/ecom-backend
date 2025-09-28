const express = require('express');
const {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  resendVerifyEmail,
} = require('../../controllers/auth');
const {
  validateMiddleware,
} = require('../../middlewares/validate.middlewares');
const {
  userRegisterValidator,
  userLoginValidator,
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

module.exports = { authRouter };
