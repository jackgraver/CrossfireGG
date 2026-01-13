import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@repo/schemas";
import { config } from "../config/env";

const sqlite = new Database(config.database.path);

export const db = drizzle(sqlite, { schema });
