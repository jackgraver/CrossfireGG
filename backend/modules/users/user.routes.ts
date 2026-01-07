import { Router, Request, Response } from "express";
import { userRepository } from "./user.repository";

const router = Router();

// Get current user with roles - requires authentication
router.get("/me", async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const roles = await userRepository.getUserRoles(req.user.id);

        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            image: req.user.image,
            emailVerified: req.user.emailVerified,
            roles,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
