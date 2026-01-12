import { AppError } from "./AppError";

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super({
      message,
      statusCode: 401,
      code: "UNAUTHORIZED",
    });
  }
}
