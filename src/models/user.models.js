const mongoose = require('mongoose');
const {
  UserRolesEnum,
  AvailableUserRoles,
  generateEmailVerificationToken,
  generateAccessToken,
  generateRefreshToken,
  generateHashedPassword,
  compareHashedPassword,
} = require('../utils/user');
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

  this.password = await generateHashedPassword(this.password);
});

userSchema.methods.generateTemporaryTokens = generateEmailVerificationToken;

userSchema.methods.isValidPassword = async function (password) {
  return await compareHashedPassword(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const payload = {
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
  };

  return generateAccessToken(payload);
};

userSchema.methods.generateRefreshToken = function () {
  const payload = {
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
  };

  return generateRefreshToken(payload);
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
