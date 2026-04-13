import { Router } from "express";
import { matchController } from "./match.controller";
import { fetchSession } from "../../core/middleware/auth.middleware";
import { requireSession } from "../../core/middleware/auth.middleware";

const router = Router();

router.get("/upcoming", matchController.getUpcomingMatches);
router.get("/casting/all", matchController.getAllMatchCasting);
router.get("/:matchId", matchController.getMatchById);
router.post("/casting/claim", fetchSession, requireSession, matchController.claimMatch);
router.post("/casting/unclaim", matchController.unclaimMatch);

export default router;
