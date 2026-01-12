import { AppError } from "./AppError";

export class TokenExpiredError extends AppError {
  constructor() {
    super({
      message: "Token expired",
      statusCode: 401,
      code: "TOKEN_EXPIRED",
    });
  }
}
