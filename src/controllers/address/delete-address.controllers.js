const { Address } = require('../../models/address.models');
const { APIError, APIResponse } = require('../../utils/api');
const { asyncHandler } = require('../../utils/async-handler');

const deleteAddress = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new APIError(401, 'User not found!');
  }

  if (!Boolean(req.params?.addressId)) {
    throw new APIError(401, 'Invalid Address!');
  }

  const deletedAddress = await Address.findByIdAndDelete(req.params.addressId);

  if (!deletedAddress) {
    throw new APIError(404, 'Unable to delete address!');
  }

  return res
    .status(200)
    .json(new APIResponse(200, 'Address deleted successfully'));
});

module.exports = { deleteAddress };
