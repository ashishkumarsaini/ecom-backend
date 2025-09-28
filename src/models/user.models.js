const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
const { UserRolesEnum, AvailableUserRoles } = require('../utils/user');
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
    isEmailVerified: {
      type: Boolean,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificaitionTokenExpiry: {
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

userSchema.methods.generateTemporaryTokens = function () {
  const unHashedToken = crypto.randomBytes(20).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(unHashedToken)
    .digest('hex');

  const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 min

  return { unHashedToken, hashedToken, tokenExpiry };
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
