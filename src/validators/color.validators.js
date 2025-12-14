const { body } = require('express-validator');

const colorsValidator = body('color')
  .isArray({ min: 1 })
  .withMessage('Product should have at least 1 color');

const colorNameValidator = body('color.colorName')
  .notEmpty()
  .withMessage('Color Name cannot be empty');
const colorCodeValidator = body('color.colorCode')
  .notEmpty()
  .withMessage('Color Code cannot be empty');
const colorMinPriceValidator = body('color.price.min')
  .notEmpty()
  .withMessage('Color minimum price cannot be empty');
const colorMaxPriceValidator = body('color.price.max')
  .notEmpty()
  .withMessage('Color maximum price cannot be empty');
const colorImageValidatorValidator = body('color.image')
  .notEmpty()
  .withMessage('Product image cannot be empty');

// route validators

const colorDataValidator = [
  colorNameValidator,
  colorCodeValidator,
  colorMinPriceValidator,
  colorMaxPriceValidator,
  colorImageValidatorValidator,
];

module.exports = { colorDataValidator };
