/* eslint-disable max-classes-per-file */
class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = 500;
  }
}

class BadRequestError extends GeneralError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends GeneralError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends GeneralError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends GeneralError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

const catchAsyncError = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

module.exports = {
  GeneralError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  catchAsyncError,
};
