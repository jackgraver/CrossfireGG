// import Database from "better-sqlite3";

// const sqlite = new Database(config.database.path);

// export const db = drizzle(sqlite, { schema });

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@repo/schemas";
import { config } from "../config/env";

const pool = new Pool({
    connectionString: config.database.url,
});

export const db = drizzle(pool, { schema });
