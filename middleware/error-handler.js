const errorHandler = (err, req, res, next) => {
  let customError = {
    message: err.message || "Something went wrong",
    statusCode: err.statusCode || 500,
  };

  // Duplicate
  if (err.code && err.code == 11000) {
    customError.message = `Email already exists ${err.keyValue.email}`;
    customError.statusCode = 400;
  }
  // Validation
  if (err.name === "ValidationError") {
    console.log(Object.values(err.errors));
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  // CastError
  if (err.name === "CastError") {
    customError.message = `No task found with id ${err.value}`;
    customError.statusCode = 404;
  }
  return res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandler;
