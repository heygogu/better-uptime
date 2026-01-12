import { AppError } from "./AppError";

export class ServiceUnavailableError extends AppError {
  constructor(message = "Service unavailable") {
    super({
      message,
      statusCode: 503,
      code: "SERVICE_UNAVAILABLE",
    });
  }
}
