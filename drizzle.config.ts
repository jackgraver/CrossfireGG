import type { Config } from "drizzle-kit";
import { config as loadEnv } from "dotenv";

loadEnv({ path: "./backend/.env" });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error(
        "DATABASE_URL is required for drizzle-kit. Set it in backend/.env (see backend/env.example).",
    );
}

export default {
    schema: "./backend/schemas",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: databaseUrl,
    },
} satisfies Config;
