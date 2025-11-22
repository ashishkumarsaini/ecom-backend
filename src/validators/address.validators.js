const { body } = require('express-validator');
const {
  ADDRESS_FULL_NAME_MAX_LENGTH,
  ADDRESS_FULL_NAME_MIN_LENGTH,
  ADDRESS_LINE_MIN_LENGTH,
  ADDRESS_LINE_MAX_LENGTH,
} = require('../utils/address');

const fullNameValidator = body('fullName')
  .trim()
  .notEmpty()
  .withMessage('Full name is required!')
  .isLength({
    min: ADDRESS_FULL_NAME_MIN_LENGTH,
    max: ADDRESS_FULL_NAME_MAX_LENGTH,
  })
  .withMessage(
    `Name should have minimum ${ADDRESS_FULL_NAME_MIN_LENGTH} and maximum ${ADDRESS_FULL_NAME_MAX_LENGTH} characters!`
  );

const phoneValidator = body('phone')
  .trim()
  .notEmpty()
  .withMessage('Phone should not be empty!');
// .isMobilePhone(); not verifying as of now

const addressLine1Validator = body('line1')
  .trim()
  .notEmpty()
  .withMessage('Address Line 1 is required!')
  .isLength({
    min: ADDRESS_LINE_MIN_LENGTH,
    max: ADDRESS_LINE_MAX_LENGTH,
  })
  .withMessage(
    `Line 1 should have minimum ${ADDRESS_LINE_MIN_LENGTH} and maximum ${ADDRESS_LINE_MAX_LENGTH} characters!`
  );

const cityValidator = body('city')
  .trim()
  .notEmpty()
  .withMessage('City is required!');

const stateValidator = body('state')
  .trim()
  .notEmpty()
  .withMessage('City is required!');

const countryValidator = body('country')
  .trim()
  .notEmpty()
  .withMessage('City is required!');

const zipCodeValidator = body('zipCode')
  .trim()
  .notEmpty()
  .withMessage('City is required!');

// routes validators

const createAddressValidators = [
  fullNameValidator,
  phoneValidator,
  addressLine1Validator,
  cityValidator,
  stateValidator,
  countryValidator,
  zipCodeValidator,
];

module.exports = {
  fullNameValidator,
  phoneValidator,
  addressLine1Validator,
  cityValidator,
  stateValidator,
  countryValidator,
  zipCodeValidator,
  createAddressValidators,
};
