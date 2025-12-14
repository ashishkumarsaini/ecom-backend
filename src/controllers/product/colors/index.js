const { updateColor } = require('./update-color.controllers');
const { createColor } = require('./create-color.controllers');
const { getColor } = require('./get-color.controller');
const { getProductColors } = require('./get-product-colors.controllers');

module.exports = { createColor, getColor, getProductColors, updateColor };
