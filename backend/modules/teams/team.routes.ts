import { Router } from "express";
import { teamController } from "./team.controller";

const router = Router();

router.get("/:teamId", teamController.getTeamById);

export default router;
