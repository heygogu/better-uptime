import type { Request, Response } from "express";

export default function ErrorResponse(
  res: Response,
  statusCode: number,
  message: String
) {
  return res.status(statusCode).json({
    message,
  });
}
