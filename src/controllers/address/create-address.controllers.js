const { Address } = require('../../models/address.models');
const { APIError, APIResponse } = require('../../utils/api');
const { asyncHandler } = require('../../utils/async-handler');

const createAddress = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    throw new APIError(401, 'User not found!');
  }

  if (!req.body) {
    throw new APIError(401, 'Address is not completed!');
  }

  const {
    fullName,
    phone,
    line1,
    line2,
    city,
    state,
    country,
    zipCode,
    type,
    isDefault,
  } = req.body;

  const address = await Address.create({
    userId: req.user._id,
    fullName,
    phone,
    line1,
    line2,
    city,
    state,
    country,
    zipCode,
    type,
    isDefault,
  })
    .then()
    .catch((error) => console.log(error));

  if (!address) {
    throw new APIResponse(400, 'Failed to save address');
  }

  return res
    .status(200)
    .json(new APIResponse(200, 'Address saved!', { address }));
});

module.exports = { createAddress };
