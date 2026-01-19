import { Router } from "express";
import { matchController } from "./match.controller";

const router = Router();

router.get("/:matchId", matchController.getMatchById);
router.get("/casting/all", matchController.getAllMatchCasting);
router.post("/casting/claim", matchController.claimMatch);
router.post("/casting/unclaim", matchController.unclaimMatch);

export default router;

