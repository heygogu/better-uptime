import express, { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { validateUserBody } from "../../middlewares/validation/user.validation";
import { prisma } from "@repo/database";
import jwt from "jsonwebtoken";
import success from "../../responses/success";
import { BadRequestError } from "../../responses/errors/BadRequestError";
import { NotFoundError } from "../../responses/errors/NotFoundError";
import { UnauthorizedError } from "../../responses/errors/UnauthorizedError";

export const authRouter = express.Router();

authRouter.use(validateUserBody);

authRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    //means it is a new user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
      },
    });

    success(res, {
      message: "User created successfully",
      userId: user.id,
    });
  } catch (error: any) {
    throw new BadRequestError("Something went wrong", error);
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    //at this point the req.body has the username and the password
    const { username, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      throw new NotFoundError("User does not exist");
    }
    //verify the password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new BadRequestError("Password does not match");
    }
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET!
    );

    success(res, { message: "Login success", token });
  } catch (error) {
    throw new UnauthorizedError();
  }
});
