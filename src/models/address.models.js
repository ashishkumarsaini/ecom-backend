const mongoose = require('mongoose');
const {
  ADDRESS_FULL_NAME_MIN_LENGTH,
  ADDRESS_FULL_NAME_MAX_LENGTH,
  ADDRESS_LINE_MIN_LENGTH,
  ADDRESS_LINE_MAX_LENGTH,
  AvailableAddressType,
  AddressTypeEnum,
} = require('../utils/address');

const addressModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: ADDRESS_FULL_NAME_MIN_LENGTH,
      maxlength: ADDRESS_FULL_NAME_MAX_LENGTH,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    line1: {
      type: String,
      required: true,
      trim: true,
      minlength: ADDRESS_LINE_MIN_LENGTH,
      maxlength: ADDRESS_LINE_MAX_LENGTH,
    },
    line2: {
      type: String,
      trim: true,
      minlength: ADDRESS_LINE_MIN_LENGTH,
      maxlength: ADDRESS_LINE_MAX_LENGTH,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: AvailableAddressType,
      default: AddressTypeEnum.HOME,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Address = mongoose.model('Address', addressModel);

module.exports = { Address };
