class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

class InternalServerError extends ErrorResponse {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}

class UnauthorizedError extends ErrorResponse {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

module.exports = {
  ErrorResponse,
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
};
