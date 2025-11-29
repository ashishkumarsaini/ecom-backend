const { Product, Color } = require('../../models/product.models');
const { APIError, APIResponse } = require('../../utils/api');
const { asyncHandler } = require('../../utils/async-handler');

const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params?.productId;

  if (!productId) {
    throw new APIError(401, 'Product id not found!');
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new APIError(401, 'Product not found!');
  }

  const deletedColors = await Color.deleteMany({
    _id: { $in: product.colors },
  });

  if (!deletedColors) {
    throw new APIError('Unable to delete the colors in product');
  }

  const deletedProduct = await Product.findByIdAndDelete(productId);

  if (!deletedProduct) {
    throw new APIError(401, 'Unable to delete product');
  }

  return res
    .status(200)
    .json(new APIResponse(200, 'Product deleted successfully!'));
});

module.exports = { deleteProduct };
