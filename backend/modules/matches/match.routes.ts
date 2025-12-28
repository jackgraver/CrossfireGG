import { Router } from "express";
import { matchController } from "./match.controller";

const router = Router();

router.get("/:matchId", matchController.getMatchById);

export default router;

