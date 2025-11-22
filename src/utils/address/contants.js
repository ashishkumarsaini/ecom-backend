const ADDRESS_LINE_MIN_LENGTH = 2;
const ADDRESS_LINE_MAX_LENGTH = 40;
const ADDRESS_FULL_NAME_MIN_LENGTH = 2;
const ADDRESS_FULL_NAME_MAX_LENGTH = 50;

const AddressTypeEnum = Object.freeze({
  HOME: 'home',
  WORK: 'work',
});

const AvailableAddressType = Object.values(AddressTypeEnum);

module.exports = {
  AvailableAddressType,
  AddressTypeEnum,
  ADDRESS_FULL_NAME_MIN_LENGTH,
  ADDRESS_FULL_NAME_MAX_LENGTH,
  ADDRESS_LINE_MAX_LENGTH,
  ADDRESS_LINE_MIN_LENGTH,
};
