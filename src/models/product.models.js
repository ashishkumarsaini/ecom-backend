const mongoose = require('mongoose');
const {
  PRODUCT_NAME_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
} = require('../utils/product');

const colorSchema = new mongoose.Schema({
  colorName: {
    type: String,
    required: true,
  },
  colorCode: {
    type: String,
    required: true,
  },
  price: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  stock: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
});

const Color = mongoose.model('Color', colorSchema);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: PRODUCT_NAME_MIN_LENGTH,
      maxLength: PRODUCT_NAME_MAX_LENGTH,
    },
    description: {
      type: String,
      trim: true,
      minLength: PRODUCT_DESCRIPTION_MIN_LENGTH,
      maxLength: PRODUCT_DESCRIPTION_MAX_LENGTH,
    },
    colors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Color' }],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = { Product, Color };
