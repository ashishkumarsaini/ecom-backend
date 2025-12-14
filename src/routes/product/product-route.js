const express = require('express');
const { verifyJWT } = require('../../middlewares/auth.middlewares');
const { verifyAdmin } = require('../../middlewares/user.middlewares');
const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  createColor,
  getColor,
  getProductColors,
  updateColor,
} = require('../../controllers/product');
const {
  createProductValidators,
  getProductValidatiors,
  updateProductValidator,
} = require('../../validators/product.validators');
const {
  validateMiddleware,
} = require('../../middlewares/validate.middlewares');
const { colorDataValidator } = require('../../validators/color.validators');

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

productRouter.route('/:productId').get(getProduct);
productRouter
  .route('/')
  .get(getProductValidatiors, validateMiddleware, getProducts);
productRouter
  .route('/update-product/:productId')
  .post(
    verifyJWT,
    verifyAdmin,
    updateProductValidator,
    validateMiddleware,
    updateProduct
  );
productRouter
  .route('/delete-product/:productId')
  .delete(verifyJWT, verifyAdmin, deleteProduct);

// color routes
productRouter
  .route('/create-color/:productId')
  .post(
    verifyJWT,
    verifyAdmin,
    colorDataValidator,
    validateMiddleware,
    createColor
  );
productRouter.route('/', getColor);
productRouter.route('/:productId', getProductColors);
productRouter
  .route('/updated-color/:colorId')
  .post(
    verifyJWT,
    verifyAdmin,
    colorDataValidator,
    validateMiddleware,
    updateColor
  );

module.exports = { productRouter };
