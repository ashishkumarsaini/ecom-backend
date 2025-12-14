const { Color } = require('../../../models/product.models');
const { APIError, APIResponse } = require('../../../utils/api');
const { asyncHandler } = require('../../../utils/async-handler');

const getColor = asyncHandler(async (req, res) => {
  const colorId = req.params.colorId;

  if (!colorId) {
    throw new APIError(401, 'Color id is required!');
  }

  const color = Color.findById(colorId);

  if (!color) {
    throw new APIError(401, 'Color not found!');
  }

  return res.status(200).json(new APIResponse(200, 'Color found!', { color }));
});

module.exports = { getColor };
