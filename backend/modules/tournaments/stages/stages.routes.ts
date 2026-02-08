import { Router } from "express";
import { stageController } from "./stages.controller";

const router = Router();

router.get("/:stageId/matches", stageController.getMatchesByStageId);
router.get("/:stageId/teams", stageController.getStageTeams);
router.get("/:stageId/bracket", stageController.getStageBracket);

export default router;
