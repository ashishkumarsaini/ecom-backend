const { Color, Product } = require('../../../models/product.models');
const { APIError, APIResponse } = require('../../../utils/api');
const { asyncHandler } = require('../../../utils/async-handler');

const getProductColors = asyncHandler(async (req, res) => {
  const productId = req.params.productId;

  if (!productId) {
    throw new APIError(401, 'Product id is required!');
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new APIError(401, 'Product not found!');
  }

  const colors = Color.findById({ _id: { $in: product.colors } });

  if (!colors) {
    throw new APIError(401, 'Color not found!');
  }

  return res
    .status(200)
    .json(new APIResponse(200, 'Colors found!', { colors }));
});

module.exports = { getProductColors };
