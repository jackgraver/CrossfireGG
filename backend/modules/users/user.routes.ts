import { Router } from "express";
import { userController } from "./user.controller";
import { fetchSession } from "../../core/middleware/auth.middleware";

const router = Router();

router.get("/me", fetchSession, userController.getMe);

export default router;
