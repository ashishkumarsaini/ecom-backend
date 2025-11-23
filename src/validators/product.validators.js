const { body } = require('express-validator');
const {
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_NAME_MIN_LENGTH,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
} = require('../utils/product');

// field validators
const productNameValidator = body('name')
  .notEmpty()
  .withMessage('Product name cannot be empty')
  .isLength({
    min: PRODUCT_NAME_MIN_LENGTH,
    max: PRODUCT_NAME_MAX_LENGTH,
  })
  .withMessage(
    `Product name should have minimum ${PRODUCT_NAME_MIN_LENGTH} and maximum ${PRODUCT_NAME_MAX_LENGTH} characters`
  );

const productDescriptionValidator = body('description')
  .notEmpty()
  .withMessage('Product description cannot be empty')
  .isLength({
    min: PRODUCT_DESCRIPTION_MIN_LENGTH,
    max: PRODUCT_DESCRIPTION_MAX_LENGTH,
  })
  .withMessage(
    `Product description should have minimum ${PRODUCT_DESCRIPTION_MIN_LENGTH} and maximum ${PRODUCT_DESCRIPTION_MAX_LENGTH} characters`
  );

const productColorsValidators = body('colors')
  .isArray({ min: 1 })
  .withMessage('Product should have at least 1 color');

const productColorName = body('colors.*.colorName')
  .notEmpty()
  .withMessage('Color Name cannot be empty');
const productColorCode = body('colors.*.colorCode')
  .notEmpty()
  .withMessage('Color Code cannot be empty');
const productColorMinPrice = body('colors.*.price.min')
  .notEmpty()
  .withMessage('Color minimum price cannot be empty');
const productColorMaxPrice = body('colors.*.price.max')
  .notEmpty()
  .withMessage('Color maximum price cannot be empty');
const productColorImageValidator = body('colors.*.image')
  .notEmpty()
  .withMessage('Product image cannot be empty');

const productColorValidators = [
  productColorName,
  productColorCode,
  productColorMinPrice,
  productColorMaxPrice,
  productColorImageValidator,
];

// route validators
const createProductValidators = [
  productNameValidator,
  productDescriptionValidator,
  productColorsValidators,
  ...productColorValidators,
];

module.exports = {
  productNameValidator,
  productDescriptionValidator,
  createProductValidators,
};
