import type { Request, Response, NextFunction } from "Express";
import { websiteRegistrationSchema } from "../../schemas/website.schema";
import { BadRequestError } from "../../responses/errors/BadRequestError";

export function validateWebsiteBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    websiteRegistrationSchema.parse({
      body: req.body,
    });
    next();
  } catch (error) {
    throw new BadRequestError("Invalid inputs");
  }
}
