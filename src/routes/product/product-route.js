const express = require('express');
const { verifyJWT } = require('../../middlewares/auth.middlewares');
const { verifyAdmin } = require('../../middlewares/user.middlewares');
const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('../../controllers/product');
const {
  createProductValidators,
  getProductValidatiors,
  updateProductValidator,
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

module.exports = { productRouter };
