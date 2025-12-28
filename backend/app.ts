import express, { Request, Response, NextFunction } from "express";
import { initializeDatabase } from "./config/database";
import { config } from "./config/env";
import { errorHandler } from "./core/middleware/errorHandler";
import { authMiddleware } from "./core/middleware/auth";
import { requestLogger } from "./core/middleware/requestLogger";
import tournamentRoutes from "./modules/tournaments/tournament.routes";
import matchRoutes from "./modules/matches/match.routes";
import teamRoutes from "./modules/teams/team.routes";

const app = express();

initializeDatabase();

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
app.use(authMiddleware);

app.get("/", (req: Request, res: Response) => {
    res.send({ message: "API Running" });
});

app.use("/tournament", tournamentRoutes);
app.use("/match", matchRoutes);
app.use("/team", teamRoutes);

app.use(errorHandler);

export default app;
