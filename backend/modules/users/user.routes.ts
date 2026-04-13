import { Router } from "express";
import { userController } from "./user.controller";
import { fetchSession, requireRoles } from "../../core/middleware/auth.middleware";
import { Roles } from "@repo/types";

const router = Router();

router.get("/me", fetchSession, userController.getMe);

router.get("/all", fetchSession, requireRoles(Roles.ADMIN), userController.getAllUsers);

router.get("/staff", fetchSession, requireRoles(Roles.ADMIN), userController.getStaffUsers);

router.get("/search", fetchSession, requireRoles(Roles.ADMIN), userController.searchUsers);

router.patch(
    "/:userId/roles",
    fetchSession,
    requireRoles(Roles.ADMIN),
    userController.patchUserRoles,
);

export default router;
