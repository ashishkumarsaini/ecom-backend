const mongoose = require('mongoose');
const { UserRolesEnum, AvailableUserRoles } = require('../utils/user');
const bcrypt = require('bcrypt');
const {
  PASSWORD_MIN_LIMIT,
  PASSWORD_MAX_LIMIT,
  FIRST_NAME_MAX_LIMIT,
  LAST_NAME_MAX_LIMIT,
} = require('../validators/auth.validators');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: PASSWORD_MIN_LIMIT,
      maxlength: PASSWORD_MAX_LIMIT,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: FIRST_NAME_MAX_LIMIT,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: LAST_NAME_MAX_LIMIT,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnum.USER,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
    },
    emailVericationToken: {
      type: String,
    },
    emailVericaitionTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
