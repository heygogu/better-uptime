import { AppError } from "./AppError";

export class UnprocessableEntityError extends AppError {
  constructor(message = "Unprocessable entity", details?: unknown) {
    super({
      message,
      statusCode: 422,
      code: "UNPROCESSABLE_ENTITY",
      details,
    });
  }
}
