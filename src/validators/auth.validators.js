const { body } = require('express-validator');

const PASSWORD_MIN_LIMIT = 6;
const PASSWORD_MAX_LIMIT = 64;
const FIRST_NAME_MAX_LIMIT = 50;
const LAST_NAME_MAX_LIMIT = 50;

const userRegisterValidator = () => {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is not valid')
      .isLowercase()
      .withMessage('Email should be in lowercase'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: PASSWORD_MIN_LIMIT, max: PASSWORD_MAX_LIMIT })
      .withMessage(
        `Password should be between ${PASSWORD_MIN_LIMIT} to ${PASSWORD_MAX_LIMIT} characters`
      ),
    body('firstName')
      .trim()
      .notEmpty()
      .withMessage('Full name is required')
      .isLength({ min: 1, max: FIRST_NAME_MAX_LIMIT })
      .withMessage(
        `First Name should maximum ${FIRST_NAME_MAX_LIMIT} characters`
      ),
    body('lastName')
      .trim()
      .isLength({ max: LAST_NAME_MAX_LIMIT })
      .withMessage(
        `Last Name should maximum ${LAST_NAME_MAX_LIMIT} characters`
      ),
  ];
};

const userLoginValidator = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required'),
  ];
};

module.exports = {
  userRegisterValidator,
  userLoginValidator,
  PASSWORD_MIN_LIMIT,
  PASSWORD_MAX_LIMIT,
  FIRST_NAME_MAX_LIMIT,
  LAST_NAME_MAX_LIMIT,
};
