import { Router } from "express";
import { tournamentController } from "./tournament.controller";

const router = Router();

router.get("/all", tournamentController.getAllTournaments);
router.get("/stage/:stageId/matches", tournamentController.getMatchesByStageId);
router.get("/stage/:stageId/teams", tournamentController.getStageTeamsByStageId);
router.get("/:tournamentId", tournamentController.getTournamentById);

export default router;
