const { Product, Color } = require('../../models/product.models');
const { APIError, APIResponse } = require('../../utils/api');
const { asyncHandler } = require('../../utils/async-handler');

const createProduct = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new APIError(401, 'Product Data not provided');
  }

  const { colors } = req.body;

  const createdColors = await Color.insertMany(colors);

  if (!colors || !colors.length) {
    throw new APIError(401, 'Unable to create product colors');
  }

  const product = await Product.create({
    ...req.body,
    colors: createdColors.map((color) => color._id),
  });

  if (!product) {
    throw new APIError(401, 'Unable to create product');
  }

  const productWithColors = await product.populate('colors');

  if (!productWithColors) {
    throw new APIError(401, 'Unable to create product');
  }

  return res
    .status(200)
    .json(
      new APIResponse(200, 'Product created!', { product: productWithColors })
    );
});

module.exports = { createProduct };
