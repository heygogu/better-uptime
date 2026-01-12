import { AppError } from "./AppError";

export class BadRequestError extends AppError {
  constructor(message = "Bad request", details?: unknown) {
    super({
      message,
      statusCode: 400,
      code: "BAD_REQUEST",
      details,
    });
  }
}
