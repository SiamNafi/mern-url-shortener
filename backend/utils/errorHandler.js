function createError(message, statusCode) {
  return {
    message,
    statusCode,
    status: `${statusCode}`.startsWith("4") ? "Fail" : "Error",
    isOperational: true,
  };
}

function errorHandler(err, req, res, next) {
  const statusCode = err?.statusCode ? err.statusCode : 500;
  const status = err?.status || "error";
  console.log("Error Details------->:", err);
  res.status(statusCode).json({
    status,
    message: err.message ? err.message : "Something Went Wrong",
  });
}

export { createError, errorHandler };
