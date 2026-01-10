import Database, { type Database as DatabaseType } from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@repo/schemas";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as path from "path";
import { config } from "./env";

const sqlite: DatabaseType = new Database(config.database.path);
export const db = drizzle(sqlite, { schema });

export function initializeDatabase() {
    try {
        const isCompiled = __dirname.includes("dist");
        // From backend/config/ we need to go up one level to backend/, then into drizzle/
        // From backend/dist/config/ we need to go up two levels to backend/, then into drizzle/
        const migrationsFolder = isCompiled
            ? path.join(__dirname, "../../drizzle")
            : path.join(__dirname, "../drizzle");
        console.log(`Running migrations from: ${migrationsFolder}`);
        migrate(db, { migrationsFolder });
        console.log("Database initialized successfully");
    } catch (error) {
        console.error("Migration error:", error);
        throw error;
    }
}

export default db;
