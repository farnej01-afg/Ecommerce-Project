const errorHandler = (err, req, res, next) => {
  console.log(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Server Error!";

  res.status(statusCode).json({
    message: message,
    error: process.env.NODE_ENV === "Production" ? {} : err,
  });
};

export default errorHandler;
