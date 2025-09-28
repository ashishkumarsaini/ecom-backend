const express = require('express');
const {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
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

module.exports = { authRouter };
