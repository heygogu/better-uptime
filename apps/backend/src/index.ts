import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import { errorHandler } from "@/middlewares/error.middleware";
import { v1Router } from "@/routers/v1";
// import { authRouter } from "@/routers/auth"; // Better Auth

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use("/api/v1", v1Router);
app.use(express.json());

app.use(errorHandler);

export { app };
