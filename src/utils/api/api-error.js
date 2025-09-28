class APIError extends Error {
  constructor(
    statusCode,
    message = 'Something went wrong',
    errors = [],
    stack = '',
    data = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = { APIError };
