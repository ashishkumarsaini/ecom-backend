const express = require('express');
const { registerUser } = require('../../controllers/auth');
const { validateMiddleware } = require('../../middlewares/validate.middleware');
const { userRegisterValidator } = require('../../validators/auth.validators');
const authRouter = express.Router();

authRouter
  .route('/register')
  .post(userRegisterValidator(), validateMiddleware, registerUser);

module.exports = { authRouter };
