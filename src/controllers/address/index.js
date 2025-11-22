const { createAddress } = require('./create-address.controllers');
const { deleteAddress } = require('./delete-address.controllers');
const { getAllAddresses } = require('./get-all-addresses.controller');
const { updateAddress } = require('./update-address.controllers');

module.exports = {
  createAddress,
  updateAddress,
  deleteAddress,
  getAllAddresses,
};
