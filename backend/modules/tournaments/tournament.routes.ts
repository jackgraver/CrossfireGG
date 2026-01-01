import { Router } from "express";
import { tournamentController } from "./tournament.controller";

const router = Router();

router.get("/all", tournamentController.getAllTournaments);
router.get("/stage/:stageId/matches", tournamentController.getMatchesByStageId);
router.get('/faceit', tournamentController.getFaceitTournaments);
router.post('/faceit/import', tournamentController.importFaceitData);
router.post('/faceit/import-file', tournamentController.importFaceitDataFromFile);
router.get("/:tournamentId", tournamentController.getTournamentById);

export default router;
