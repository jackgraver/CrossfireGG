import { Router } from "express";
import { stageController } from "./stages.controller";

const router = Router();

router.get("/stage/:stageId/matches", stageController.getMatchesByStageId);
router.get("/stage/:stageId/teams", stageController.getStageTeams);
router.get("/stage/:stageId/bracket", stageController.getStageBracket);
