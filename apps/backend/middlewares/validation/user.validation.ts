import type { Request, Response, NextFunction } from "express";
import { userRegistrationSchema } from "../../schemas/user.schema";
import { BadRequestError } from "../../responses/errors/BadRequestError";

export function validateUserBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    userRegistrationSchema.parse({
      body: req.body,
    });
    next();
  } catch (error) {
    throw new BadRequestError("Invalid inputs");
  }
}
