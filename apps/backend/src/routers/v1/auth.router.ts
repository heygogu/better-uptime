import express, { type Request, type Response } from "express";
import { validateUserBody } from "@/middlewares/validation/user.validation";
import {
  loginController,
  signUpController,
} from "@/controllers/auth.controller";

export const authRouter = express.Router();

authRouter.post("/signup", validateUserBody, signUpController);

authRouter.post("/login", validateUserBody, loginController);
