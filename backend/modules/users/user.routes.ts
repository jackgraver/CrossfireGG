import { Router } from "express";
import { userController } from "./user.controller";
import {
    fetchSession,
    requireRoles,
} from "../../core/middleware/auth.middleware";
import { Roles } from "@repo/types";

const router = Router();

router.get("/me", fetchSession, userController.getMe);

router.get(
    "/all",
    // fetchSession,
    // requireRoles(Roles.ADMIN),
    userController.getAllUsers,
);

export default router;
