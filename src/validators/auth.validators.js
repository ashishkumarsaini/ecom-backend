const { body } = require('express-validator');

const PASSWORD_MIN_LIMIT = 6;
const PASSWORD_MAX_LIMIT = 64;
const FIRST_NAME_MAX_LIMIT = 50;
const LAST_NAME_MAX_LIMIT = 50;

const emailValidator = body('email')
  .trim()
  .notEmpty()
  .withMessage('Email is required')
  .isEmail()
  .withMessage('Email is not valid')
  .isLowercase()
  .withMessage('Email should be in lowercase');

const passwordValidator = (validateKey) =>
  body(validateKey)
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: PASSWORD_MIN_LIMIT, max: PASSWORD_MAX_LIMIT })
    .withMessage(
      `Password should be between ${PASSWORD_MIN_LIMIT} to ${PASSWORD_MAX_LIMIT} characters`
    );

const firstNameValidator = body('firstName')
  .trim()
  .notEmpty()
  .withMessage('Full name is required')
  .isLength({ min: 1, max: FIRST_NAME_MAX_LIMIT })
  .withMessage(`First Name should maximum ${FIRST_NAME_MAX_LIMIT} characters`);

const lastNameValidator = body('lastName')
  .trim()
  .isLength({ max: LAST_NAME_MAX_LIMIT })
  .withMessage(`Last Name should maximum ${LAST_NAME_MAX_LIMIT} characters`);

const userRegisterValidator = () => [
  emailValidator,
  passwordValidator('password'),
  firstNameValidator,
  lastNameValidator,
];

const userLoginValidator = () => [
  emailValidator,
  passwordValidator('password'),
];

const forgotPasswordValidator = () => [emailValidator];
const resetPasswordValidator = () => [passwordValidator('newPassword')];
const changePasswordValidator = () => [passwordValidator('newPassword')];

module.exports = {
  userRegisterValidator,
  userLoginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
  PASSWORD_MIN_LIMIT,
  PASSWORD_MAX_LIMIT,
  FIRST_NAME_MAX_LIMIT,
  LAST_NAME_MAX_LIMIT,
};
