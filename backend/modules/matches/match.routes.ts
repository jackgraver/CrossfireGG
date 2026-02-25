import { Router } from "express";
import { matchController } from "./match.controller";
import { fetchSession } from "../../core/middleware/auth.middleware";
import { requireSession } from "../../core/middleware/auth.middleware";

const router = Router();

router.get("/:matchId", matchController.getMatchById);
router.get("/casting/all", matchController.getAllMatchCasting);
router.post(
    "/casting/claim",
    fetchSession,
    requireSession,
    matchController.claimMatch,
);
router.post("/casting/unclaim", matchController.unclaimMatch);

export default router;
