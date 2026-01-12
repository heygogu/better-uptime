import { AppError } from "./AppError";

export class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
    super({
      message,
      statusCode: 500,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
