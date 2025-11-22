const { Address } = require('../../models/address.models');
const { APIError, APIResponse } = require('../../utils/api');
const { asyncHandler } = require('../../utils/async-handler');

const getAllAddresses = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new APIError(401, 'User not found!');
  }

  const addresses = await Address.find({ userId: req.user._id });

  return res
    .status(200)
    .json(new APIResponse(200, 'Addresses found!', { addresses }));
});

module.exports = { getAllAddresses };
