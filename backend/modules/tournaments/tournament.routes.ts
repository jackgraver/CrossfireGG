import { Router } from "express";
import { tournamentController } from "./tournament.controller";

const router = Router();

router.get("/all", tournamentController.getAllTournaments);
router.get("/stage/:stageId/matches", tournamentController.getMatchesByStageId);
router.get("/stage/:stageId/teams", tournamentController.getStageTeams);
router.get("/stage/:stageId/standings", tournamentController.getStageStandings);
router.get("/:tournamentId", tournamentController.getTournamentById);
router.post("/register", tournamentController.registerForTournament);

export default router;
