const { Product, Color } = require('../../../models/product.models');
const { APIError, APIResponse } = require('../../../utils/api');
const { asyncHandler } = require('../../../utils/async-handler');

const createColor = asyncHandler(async (req, res) => {
  const productId = req.params?.productId;
  const colorData = req.body?.color;

  if (!productId) {
    throw new APIError(401, 'Product cannot be empty!');
  }

  if (!colorData) {
    throw new APIError(401, 'Invalid color data');
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new APIError(401, 'Product not found!');
  }

  const color = await Color.create(colorData);

  if (!color) {
    throw new APIError(401, 'Failed to create color');
  }

  product.colors = [...product.colors, color._id];

  const updatedProduct = await product.save({ validateBeforeSave: false });
  const productData = await updatedProduct.populate('colors');

  if (!productData) {
    throw new APIError(401, 'Failed to update color to product');
  }

  return res.status(200).json(new APIResponse(200, { product: productData }));
});

module.exports = { createColor };
