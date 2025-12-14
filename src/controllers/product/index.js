const {
  createColor,
  getColor,
  getProductColors,
  updateColor,
} = require('./colors');
const { createProduct } = require('./create-product.controllers');
const { deleteProduct } = require('./delete-product.controllers');
const { getProduct } = require('./get-product.controllers');
const { getProducts } = require('./get-products.controllers');
const { updateProduct } = require('./update-product.controllers');

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  createColor,
  getColor,
  getProductColors,
  updateColor,
};
