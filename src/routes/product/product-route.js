const express = require('express');
const { verifyJWT } = require('../../middlewares/auth.middlewares');
const { verifyAdmin } = require('../../middlewares/user.middlewares');
const { createProduct } = require('../../controllers/product');
const {
  createProductValidators,
} = require('../../validators/product.validators');
const {
  validateMiddleware,
} = require('../../middlewares/validate.middlewares');

const productRouter = express.Router();

productRouter
  .route('/create-product')
  .post(
    verifyJWT,
    verifyAdmin,
    createProductValidators,
    validateMiddleware,
    createProduct
  );

module.exports = { productRouter };
