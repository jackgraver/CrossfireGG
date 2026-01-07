import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { initializeDatabase } from "./config/database";
import { config } from "./config/env";
import { errorHandler } from "./core/middleware/errorHandler";
import { requestLogger } from "./core/middleware/requestLogger";
import { auth, Session } from "./lib/auth";
import tournamentRoutes from "./modules/tournaments/tournament.routes";
import matchRoutes from "./modules/matches/match.routes";
import teamRoutes from "./modules/teams/team.routes";
import userRoutes from "./modules/users/user.routes";
import faceitRoutes from "./modules/faceit/faceit.routes";

declare global {
    namespace Express {
        interface Request {
            apiKey?: string;
            user?: Session["user"] | null;
            session?: Session["session"] | null;
        }
    }
}

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

// Better Auth handler MUST be mounted BEFORE express.json() middleware
// Express v5 requires named wildcard parameters
app.all("/api/auth/{*splat}", toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Better Auth session middleware - replaces old authMiddleware
app.use(async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers["x-api-key"];
    if (apiKey) {
        req.apiKey = apiKey as string;
    }

    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        req.user = session?.user ?? null;
        req.session = session?.session ?? null;
    } catch {
        req.user = null;
        req.session = null;
    }
    next();
});

app.get("/", (req: Request, res: Response) => {
    res.send({ message: "API Running" });
});

app.use("/user", userRoutes);
app.use("/tournament", tournamentRoutes);
app.use("/match", matchRoutes);
app.use("/team", teamRoutes);
app.use("/faceit", faceitRoutes);

app.use(errorHandler);

export default app;
