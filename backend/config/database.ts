import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../schemas";
import { config } from "../config/env";

const pool = new Pool({
    connectionString: config.database.url,
});

export const db = drizzle(pool, { schema });
