// import Database from "better-sqlite3";

// const sqlite = new Database(config.database.path);

// export const db = drizzle(sqlite, { schema });

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../schemas";
import { config } from "../config/env";

const pool = new Pool({
    connectionString: config.database.url,
});

export const db = drizzle(pool, { schema });

export const timedQuery = async <T>(label: string, fn: () => Promise<T>) => {
    const start = process.hrtime.bigint();
    const result = await fn();
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    console.log(`[db] ${label} ${ms.toFixed(2)}ms`);
    return result;
};
