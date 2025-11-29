const { APIError, APIResponse } = require('../../utils/api');
const { asyncHandler } = require('../../utils/async-handler');
const { Product } = require('../../models/product.models');

const getProducts = asyncHandler(async (req, res) => {
  const productIds = req.body.productIds;

  if (
    !productIds ||
    !Array.isArray(productIds) ||
    !Boolean(productIds.length)
  ) {
    throw new APIError(401, 'Products Ids not found!');
  }

  const products = await Product.find({ _id: { $in: productIds } })
    .populate('colors')
    .exec();

  if (!products) {
    throw new APIError(401, 'Unable to find products!');
  }

  return res.status(200).json(
    new APIResponse(200, 'Products found!', {
      products,
      count: (await products).length,
    })
  );
});

module.exports = { getProducts };
