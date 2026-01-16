const StatusCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
};

const ReasonStatusCode = {
  OK: "Success",
  CREATED: "Created",
  ACCEPTED: "Accepted",
  NO_CONTENT: "No Content",
};

class SuccessResponse {
  constructor({
    message = "Success",
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {},
  }) {
    this.status = "Success";
    this.code = statusCode;
    this.message = !message ? reasonStatusCode : message;
    this.metadata = metadata;
  }

  send(res) {
    return res.status(this.code).json(this);
  }
}

class OKResponse extends SuccessResponse {
  constructor({ message, metadata }) {
    super({
      message,
      metadata,
      statusCode: StatusCode.OK,
      reasonStatusCode: ReasonStatusCode.OK,
    });
  }
}

class CreatedResponse extends SuccessResponse {
  constructor({ message, metadata, options = {} }) {
    super({
      message,
      metadata,
      statusCode: StatusCode.CREATED,
      reasonStatusCode: ReasonStatusCode.CREATED,
    });
    this.options = options;
  }
}

module.exports = {
  SuccessResponse,
  OKResponse,
  CreatedResponse,
};
