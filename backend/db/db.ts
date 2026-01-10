import Database, { type Database as DatabaseType } from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../../packages/schemas";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as path from "path";

const sqlite: DatabaseType = new Database("./cf.db");
export const db = drizzle(sqlite, { schema });

export function initializeDatabase() {
    try {
        // Handle both compiled (dist/) and source locations
        const isCompiled = __dirname.includes("dist");
        const migrationsFolder = isCompiled
            ? path.join(__dirname, "../drizzle")
            : path.join(__dirname, "./drizzle");
        console.log(`Running migrations from: ${migrationsFolder}`);
        migrate(db, { migrationsFolder });
        console.log("Database initialized successfully");
    } catch (error) {
        console.error("Migration error:", error);
        throw error;
    }
}

export default db;
