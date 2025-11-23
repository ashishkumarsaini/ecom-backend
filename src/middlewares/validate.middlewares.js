const { validationResult } = require('express-validator');
const { APIError } = require('../utils/api');
const { asyncHandler } = require('../utils/async-handler');

const validateMiddleware = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors
    .array()
    .map((error) => ({ [error.path]: error.msg }));

  throw new APIError(422, 'Data is not valid', extractedErrors);
});

module.exports = { validateMiddleware };
