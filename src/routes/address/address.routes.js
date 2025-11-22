const express = require('express');
const { verifyJWT } = require('../../middlewares/auth.middlewares');
const {
  createAddressValidators,
} = require('../../validators/address.validators');
const { createAddress } = require('../../controllers/address');

const addressRouter = express.Router();

addressRouter
  .route('/create-address')
  .post(verifyJWT, createAddressValidators, createAddress);

module.exports = { addressRouter };
