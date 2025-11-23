const express = require('express');
const { verifyJWT } = require('../../middlewares/auth.middlewares');
const { addressValidators } = require('../../validators/address.validators');
const {
  createAddress,
  updateAddress,
  deleteAddress,
  getAllAddresses,
} = require('../../controllers/address');
const {
  validateMiddleware,
} = require('../../middlewares/validate.middlewares');

const addressRouter = express.Router();

addressRouter
  .route('/create-address')
  .post(verifyJWT, addressValidators, validateMiddleware, createAddress);

addressRouter
  .route('/update-address/:addressId')
  .post(verifyJWT, addressValidators, validateMiddleware, updateAddress);

addressRouter
  .route('/delete-address/:addressId')
  .delete(verifyJWT, deleteAddress);

addressRouter.route('/all').get(verifyJWT, getAllAddresses);

module.exports = { addressRouter };
