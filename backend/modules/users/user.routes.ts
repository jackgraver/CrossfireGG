import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.post("/refresh", userController.refresh);
router.get("/user-role", userController.getUserRole);
router.post("/sign-out", userController.signOut);

export default router;

