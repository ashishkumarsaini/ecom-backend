const { body } = require('express-validator');

const FIRST_NAME_MAX_LIMIT = 50;
const LAST_NAME_MAX_LIMIT = 50;

// field validators
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

// route validators
const updateUserProfileValidators = [firstNameValidator, lastNameValidator];

module.exports = {
  updateUserProfileValidators,
  firstNameValidator,
  lastNameValidator,
  FIRST_NAME_MAX_LIMIT,
  LAST_NAME_MAX_LIMIT,
};
