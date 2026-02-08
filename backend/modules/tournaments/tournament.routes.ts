import { Router } from "express";
import { tournamentController } from "./tournament.controller";
import { fetchSession } from "../../core/middleware/auth.middleware";
import { asyncHandler } from "../../core/asyncHandler";
import stagesRoutes from "./stages/stages.routes";

const router = Router();

router.use("/stage", stagesRoutes);

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
router.post("/create", tournamentController.createTournament);

export default router;
