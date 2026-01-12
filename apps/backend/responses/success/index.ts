import { type Response } from "express";

export default function success<T>(
  res: Response,
  data: T,
  options?: {
    statusCode?: number;
    meta?: Record<string, unknown>;
  }
) {
  const { statusCode = 200, meta } = options || {};

  return res.status(statusCode).json({
    data,
    ...(meta ? { meta } : {}),
  });
}
