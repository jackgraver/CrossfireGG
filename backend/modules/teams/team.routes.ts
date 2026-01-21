import { Router } from "express";
import { teamController } from "./team.controller";

const router = Router();

router.post("/register", teamController.registerTeam);

router.get("/:teamId", teamController.getTeamById);

router.get("/:teamId/players", teamController.getTeamPlayers);
router.post("/:teamId/players", teamController.addPlayerToTeam);

router.delete(
    "/:teamId/players/:playerId",
    teamController.removePlayerFromTeam
);

/**
 * @deprecated
 */
// router.get("/players/search", teamController.searchPlayers);

router.get(
    "/:teamId/stages/:stageId/matches",
    teamController.getTeamMatchesByStage
);

export default router;
