import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { prisma } from "@repo/database";
import { validateWebsiteBody } from "../../middlewares/validation/website.validation";
import { UnauthorizedError } from "../../responses/errors/UnauthorizedError";
import success from "../../responses/success";
import { UnprocessableEntityError } from "../../responses/errors/UnprocessableEntityError";
import { BadRequestError } from "../../responses/errors/BadRequestError";
const websiteRouter = express.Router();

websiteRouter.use(authMiddleware);

websiteRouter.post("/website", validateWebsiteBody, async (req, res) => {
  try {
    const { url } = req.body.url;
    const userId = req.user?.userId;

    if (!userId) {
      throw new UnauthorizedError();
    }

    const website = await prisma.website.create({
      data: {
        url,
        users: {
          create: {
            userId,
          },
        },
      },
    });

    success(res, website);
  } catch (error) {
    throw new BadRequestError("Something went wrong", error);
  }
});
