import { AppError } from "./AppError";

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super({
      message,
      statusCode: 409,
      code: "CONFLICT",
    });
  }
}
