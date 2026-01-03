import { Router } from "express";
import { faceitController } from "./faceit.controller";

const router = Router();

router.post("/import/stage", faceitController.importFaceitStage);
router.post("/import/matches", faceitController.importFaceitMatches);

export default router;
