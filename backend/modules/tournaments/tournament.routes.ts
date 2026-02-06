import { Router } from "express";
import { tournamentController } from "./tournament.controller";
import { fetchSession } from "../../core/middleware/auth.middleware";
import { asyncHandler } from "../../core/asyncHandler";

const router = Router();

router.post("/create", tournamentController.createTournament);

router.get(
    "/all",
    fetchSession,
    asyncHandler(tournamentController.getAllTournaments),
);

router.get("/:tournamentId", tournamentController.getTournamentById);
router.get("/:tournamentId/teams", tournamentController.getTeamsByTournamentId);
router.post(
    "/:tournamentId/register",
    tournamentController.registerForTournament,
);

export default router;
