const mongoose = require('mongoose');
const {
  CATEGORY_NAME_MIN_LENGTH,
  CATEGORY_NAME_MAX_LENGTH,
  CATEGORY_DESCRIPTION_MIN_LENGTH,
  CATEGORY_DESCRIPTION_MAX_LENGTH,
} = require('../utils/category');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: CATEGORY_NAME_MIN_LENGTH,
      maxLength: CATEGORY_NAME_MAX_LENGTH,
    },
    description: {
      type: String,
      trim: true,
      minLength: CATEGORY_DESCRIPTION_MIN_LENGTH,
      maxLength: CATEGORY_DESCRIPTION_MAX_LENGTH,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = { Category };
