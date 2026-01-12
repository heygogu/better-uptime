import express from "Express";
import "dotenv/config";
import { authRouter } from "./routers/v1/auth.router";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware";
const app = express();
app.use(morgan("dev"));
app.use("v1/auth", authRouter);

app.use(errorHandler);
export { app };
