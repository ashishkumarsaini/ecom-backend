const express = require('express');
const {
  registerUser,
  verifyEmail,
  loginUser,
} = require('../../controllers/auth');
const { validateMiddleware } = require('../../middlewares/validate.middleware');
const {
  userRegisterValidator,
  userLoginValidator,
} = require('../../validators/auth.validators');
const authRouter = express.Router();

authRouter
  .route('/register')
  .post(userRegisterValidator(), validateMiddleware, registerUser);
authRouter.route('/verify-email/:verificationToken').get(verifyEmail);
authRouter
  .route('/login')
  .post(userLoginValidator(), validateMiddleware, loginUser);

module.exports = { authRouter };
