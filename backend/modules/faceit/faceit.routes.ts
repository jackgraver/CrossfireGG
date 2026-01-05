import { Router } from "express";
import { faceitController } from "./faceit.controller";

const router = Router();

router.post("/import/stage", faceitController.importFaceitStage);
router.post("/import/matches", faceitController.importFaceitMatches);
router.get("/player/:playerId/teams", faceitController.getFaceitPlayerTeams);
router.get("/team/:teamId/players", faceitController.getTeamPlayers);

export default router;
