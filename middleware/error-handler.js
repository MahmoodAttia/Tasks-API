const errorHandler = (err, req, res, next) => {
  let customError = {
    message: err.message || "Something went wrong",
    statusCode: err.statusCode || 500,
  };
  console.log(customError);
  res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandler;
