import express, { Request, Response, NextFunction } from "express";
import { initializeDatabase } from "./db";
import tournamentRoutes from "./routes/tournamentRoutes";
import matchRoutes from "./routes/matchRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

initializeDatabase();

app.use((req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;
    if (
        origin === "http://localhost:5173" ||
        origin === "http://localhost:3000"
    ) {
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

app.get("/", (req: Request, res: Response) => {
    res.send({ message: "API Running" });
});

app.use("/tournament", tournamentRoutes);
app.use("/match", matchRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
