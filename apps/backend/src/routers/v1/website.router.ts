import express from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { validateWebsiteBody } from "@/middlewares/validation/website.validation";
import { createWebsiteController } from "@/controllers/website.controller";

export const websiteRouter = express.Router();

websiteRouter.use(authMiddleware);

websiteRouter.post("/", validateWebsiteBody, createWebsiteController);
