import { Router } from "express";
import { tournamentController } from "./tournament.controller";
import {
    fetchSession,
    requireRoles,
} from "../../core/middleware/auth.middleware";
import { asyncHandler } from "../../core/asyncHandler";
import stagesRoutes from "./stages/stages.routes";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import { Roles } from "@repo/types";

const router = Router();

router.get(
    "/all",
    fetchSession,
    asyncHandler(tournamentController.getAllTournaments),
);

router.use("/stage", stagesRoutes);

router.get("/:tournamentId", tournamentController.getTournamentById);

router.get("/:tournamentId/teams", tournamentController.getTeamsByTournamentId);

router.get(
    "/:tournamentId/registrations",
    tournamentController.getRegistrationsByTournamentId,
);

/**
 * Now unused?
 */
// router.post(
//     "/:tournamentId/register",
//     tournamentController.registerForTournament,
// );

router.post(
    "/create",
    ...authMiddleware,
    requireRoles(Roles.ADMIN),
    tournamentController.createTournament,
);

export default router;
