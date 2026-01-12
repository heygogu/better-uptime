import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { BadRequestError } from "@/responses/errors/BadRequestError";
import { InvalidTokenError } from "@/responses/errors/InvalidTokenError";
import { AppError } from "@/responses/errors/AppError";

interface AuthPayload extends JwtPayload {
  userId: string;
  username: string;
}
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const headers = req.headers;
    const bearer = headers["authorization"];
    if (!bearer) {
      throw new BadRequestError("Authorization header is missing");
    }

    let token = bearer?.split(" ")[1];

    if (!token) {
      throw new BadRequestError("Token missing after bearer");
    }

    const payload = jwt.verify(
      token || "",
      process.env.JWT_SECRET!
    ) as AuthPayload;

    req.user = {
      userId: payload.userId,
      username: payload.username,
    };

    if (!payload.userId || !payload.username) {
      throw new InvalidTokenError();
    }

    next();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new InvalidTokenError();
  }
}
