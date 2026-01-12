// errors/AppError.ts
export class AppError extends Error {
  statusCode: number;
  code: string;
  details?: unknown;
  isOperational: boolean;

  constructor({
    message,
    statusCode,
    code,
    details,
  }: {
    message: string;
    statusCode: number;
    code: string;
    details?: unknown;
  }) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
