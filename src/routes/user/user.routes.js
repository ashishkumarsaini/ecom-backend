const express = require('express');
const { verifyJWT } = require('../../middlewares/auth.middlewares');
const {
  updateUserProfileValidators,
} = require('../../validators/user.validators');
const { userProfileUpdate } = require('../../controllers/user');
const {
  validateMiddleware,
} = require('../../middlewares/validate.middlewares');
const userRouter = express.Router();

userRouter
  .route('/update-profile')
  .post(
    verifyJWT,
    updateUserProfileValidators,
    validateMiddleware,
    userProfileUpdate
  );

module.exports = { userRouter };
