import express from "express";
import cookieParser from "cookie-parser";
import { config } from "./config/env";
import { errorHandler } from "./core/middleware/errorHandler";
import { authMiddleware } from "./core/middleware/auth";
import tournamentRoutes from "./modules/tournaments/tournament.routes";
import matchRoutes from "./modules/matches/match.routes";
import teamRoutes from "./modules/teams/team.routes";
import userRoutes from "./modules/users/user.routes";
import faceitRoutes from "./modules/faceit/faceit.routes";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const burstLimiter = rateLimit({
    windowMs: 10 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
});

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300,                 // 300 requests per IP per window
    standardHeaders: true,    // RateLimit-* headers
    legacyHeaders: false,     // Disable X-RateLimit-* headers
});

const app = express();
app.set("trust proxy", 1);

// app.use(burstLimiter);
app.use(globalLimiter);
app.use(morgan("dev"));
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
app.use(cors({
    origin: config.cors.allowedOrigins,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", authMiddleware, userRoutes);
app.use("/tournament", authMiddleware, tournamentRoutes);
app.use("/match", authMiddleware, matchRoutes);
app.use("/team", authMiddleware, teamRoutes);
app.use("/faceit", authMiddleware, faceitRoutes);

app.use(errorHandler);

export default app;
