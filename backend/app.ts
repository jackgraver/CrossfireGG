import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { config } from "./config/env";
import { errorHandler } from "./core/middleware/errorHandler";
import { authMiddleware } from "./core/middleware/auth";
import { requestLogger } from "./core/middleware/requestLogger";
import tournamentRoutes from "./modules/tournaments/tournament.routes";
import matchRoutes from "./modules/matches/match.routes";
import teamRoutes from "./modules/teams/team.routes";
import userRoutes from "./modules/users/user.routes";
import faceitRoutes from "./modules/faceit/faceit.routes";

const app = express();

app.use(requestLogger);

app.use((req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;
    if (origin && config.cors.allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, x-api-key"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authMiddleware);

app.use("/user", userRoutes);
app.use("/tournament", tournamentRoutes);
app.use("/match", matchRoutes);
app.use("/team", teamRoutes);
app.use("/faceit", faceitRoutes);

app.use(errorHandler);

export default app;
