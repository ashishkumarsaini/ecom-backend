const { Address } = require('../../models/address.models');
const { APIError, APIResponse } = require('../../utils/api');
const { asyncHandler } = require('../../utils/async-handler');

const updateAddress = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new APIError(401, 'User not found!');
  }

  if (!Boolean(req.params?.addressId)) {
    throw new APIError(401, 'Invalid address id!');
  }

  if (!Boolean(req.body)) {
    throw new APIError(401, 'Address is not completed!');
  }

  const address = await Address.findByIdAndUpdate(req.params.addressId, {
    ...req.body,
  });

  if (!address) {
    throw new APIResponse(400, 'Address not found!');
  }

  return res
    .status(200)
    .json(new APIResponse(200, 'Address Updated!', { address }));
});

module.exports = { updateAddress };
