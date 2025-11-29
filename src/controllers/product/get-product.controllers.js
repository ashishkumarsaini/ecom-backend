const { APIError, APIResponse } = require('../../utils/api');
const { asyncHandler } = require('../../utils/async-handler');
const { Product, Color } = require('../../models/product.models');

const getProduct = asyncHandler(async (req, res) => {
  if (!req.params?.productId) {
    throw new APIError(401, 'Product id not found!');
  }

  const product = await Product.findById(req.params.productId)
    .populate('colors')
    .exec();

  if (!product) {
    throw new APIError(401, 'Unable to find product');
  }

  return res
    .status(200)
    .json(new APIResponse(200, 'Product found!', { product }));
});

module.exports = { getProduct };
