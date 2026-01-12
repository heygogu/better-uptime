import { AppError } from "./AppError";

export class InvalidTokenError extends AppError {
  constructor() {
    super({
      message: "Invalid token",
      statusCode: 401,
      code: "INVALID_TOKEN",
    });
  }
}
