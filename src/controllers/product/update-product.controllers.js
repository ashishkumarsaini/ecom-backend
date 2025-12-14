const { Product } = require('../../models/product.models');
const { APIError, APIResponse } = require('../../utils/api');
const { asyncHandler } = require('../../utils/async-handler');

const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params?.productId;
  const productData = req.body;

  if (!Boolean(productId)) {
    throw new APIError(401, 'Invalid product id!');
  }

  if (!Boolean(productData)) {
    throw new APIError(401, 'Product data is not completed!');
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      name: productData.name,
      description: productData.description,
    },
    { new: true }
  );

  if (!updatedProduct) {
    throw new APIError(401, 'Unable to update product');
  }

  return res
    .status(200)
    .json(new APIResponse(200, { product: updatedProduct }));
});

module.exports = { updateProduct };
