const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      const { statusCode, data, success, errors, message } = error;
      console.log({ statusCode, message });

      res.status(statusCode).json({
        statusCode,
        data,
        success,
        errors,
        message,
      });
    });
  };
};

module.exports = { asyncHandler };
