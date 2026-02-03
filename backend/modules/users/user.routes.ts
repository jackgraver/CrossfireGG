import { Router } from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../../core/middleware/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, userController.getMe);

export default router;
