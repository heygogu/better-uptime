import express from "express";
import { authRouter } from "@/routers/v1/auth.router";
import { websiteRouter } from "@/routers/v1/website.router";

export const v1Router = express.Router();

v1Router.use("/auth", authRouter);
v1Router.use("/website", websiteRouter);
