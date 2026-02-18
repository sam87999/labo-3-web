import { Router } from "express";
import { login, register, profile } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

export const authRouter = Router();
authRouter.post("/auth/register", register);
authRouter.post("/auth/login", login);
authRouter.get("/auth/profile", requireAuth, profile);