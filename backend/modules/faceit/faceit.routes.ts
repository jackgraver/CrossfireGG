import { Router } from "express";
import { faceitController } from "./faceit.controller";
import { config } from "../../config/env";

const router = Router();

/**
 * Only enable test route in development environment
 * Used for fetching faceit data for testing purposes
 */
if (config.nodeEnv === "development") {
    router.post("/test-route", faceitController.testFaceitRoute);
}

/**
 * Import a Faceit championship as a stage for an overall existing tournament
 */
router.post("/import/stage", faceitController.importFaceitStage);

/**
 * Import matches for a specific stage from Faceit data
 */
router.post("/import/matches", faceitController.importFaceitMatches);

/**
 * Get the teams for a specific player from Faceit data
 * - Used for team registration
 */
router.get("/player/:playerId/teams", faceitController.getFaceitPlayerTeams);

/**
 * Get the players for a specific team from Faceit data
 * - Used for team registration
 */
router.get("/team/:teamId/players", faceitController.getTeamPlayers);

export default router;
