import "dotenv/config";
import express from "Express";
import morgan from "morgan";
import "express-async-errors";
import { errorHandler } from "@/middlewares/error.middleware";
import { v1Router } from "@/routers/v1";

const app = express();

app.use(morgan("dev"));

app.use("api/v1", v1Router);

app.use(errorHandler);
export { app };
