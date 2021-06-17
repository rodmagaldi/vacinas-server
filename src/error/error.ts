export enum StatusCode {
  Success = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  ConflictError = 409,
  ServerError = 500,
  BadGateway = 502,
  ServiceUnavailableError = 503,
}

export enum ErrorType {
  BadGateway = StatusCode.BadGateway,
  ConflictError = StatusCode.ConflictError,
  DataSourceError = StatusCode.ServerError,
  ForbiddenError = StatusCode.Forbidden,
  InvalidDataError = StatusCode.BadRequest,
  BadRequest = StatusCode.BadRequest,
  NotFoundError = StatusCode.NotFound,
  ServerError = StatusCode.ServerError,
  ServiceUnavailableError = StatusCode.ServiceUnavailableError,
  UnauthorizedError = StatusCode.Unauthorized,
}

export class BaseError {
  public readonly code: number;
  public readonly message: string;
  public readonly details?: string;

  constructor(message: string, code = 400, details?: string) {
    this.code = code;
    this.message = message;
    this.details = details;
  }
}
