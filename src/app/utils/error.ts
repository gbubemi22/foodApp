export class UnauthorizedError extends Error {
  httpStatusCode: number;
  errorCode?: number;
  constructor(message: string, errorCode?: number) {
    super(message);
    this.errorCode = errorCode;
    this.name = 'VALIDATION_ERROR';
    this.httpStatusCode = 401;
  }
}

export class BadRequestError extends Error {
  httpStatusCode: number;
  errorCode?: number;
  constructor(message: string, errorCode?: number) {
    super(message);
    this.errorCode = errorCode;
    this.name = 'VALIDATION_ERROR';
    this.httpStatusCode = 400;
  }
}

export class ConflictError extends Error {
  httpStatusCode: number;
  errorCode?: number;
  constructor(message: string, errorCode?: number) {
    super(message);
    this.errorCode = errorCode;
    this.name = 'VALIDATION_ERROR';
    this.httpStatusCode = 409;
  }
}

export class InternalServerError extends Error {
  httpStatusCode: number;
  errorCode?: number;
  constructor(message: string, errorCode?: number) {
    super(message);
    this.errorCode = errorCode;
    this.name = 'VALIDATION_ERROR';
    this.httpStatusCode = 500;
  }
}

export class UnauthenticatedError extends Error {
  httpStatusCode: number;
  errorCode?: number;
  constructor(message: string, errorCode?: number) {
    super(message);
    this.errorCode = errorCode;
    this.name = 'VALIDATION_ERROR';
    this.httpStatusCode = 401;
  }
}

export class NotFoundError extends Error {
  httpStatusCode: number;
  errorCode?: number;
  constructor(message: string, errorCode?: number) {
    super(message);
    this.errorCode = errorCode;
    this.name = 'VALIDATION_ERROR';
    this.httpStatusCode = 404;
  }
}

export class ValidationError extends Error {
  httpStatusCode: number;
  errorCode?: number;
  constructor(message: string, errorCode?: number) {
    super(message);
    this.errorCode = errorCode;
    this.name = 'VALIDATION_ERROR';
    this.httpStatusCode = 400;
  }
}
