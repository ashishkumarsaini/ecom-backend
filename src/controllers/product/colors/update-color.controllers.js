const { Color } = require('../../../models/product.models');
const { APIError, APIResponse } = require('../../../utils/api');
const { asyncHandler } = require('../../../utils/async-handler');

const updateColor = asyncHandler(async (req, res) => {
  const colorId = req.params.colorId;
  const colorData = req.body.color;

  if (!colorId) {
    throw new APIError(401, 'Color Id cannot be empty!');
  }

  if (!colorData) {
    throw new APIError(401, 'Color data is required!');
  }

  const updatedColor = await Color.findByIdAndUpdate(colorId, colorData);

  if (!updatedColor) {
    throw new APIError(401, 'Failed to update color');
  }

  return res.status(200).json(
    new APIResponse(200, 'Color updated successfully', {
      color: updatedColor,
    })
  );
});

module.exports = { updateColor };
