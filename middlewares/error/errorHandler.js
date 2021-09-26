const errorHandler = (error, req, res, next) => {
  console.log('error', error);
  if (error.statusCode) {
    return res.status(error.statusCode).json({
      ok: 0,
      message: error.message,
    });
  }
  return res.status(500).json({
    ok: 0,
    message: error.message,
  });
};

module.exports = errorHandler;
