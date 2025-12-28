import type { Config } from "drizzle-kit";

export default {
    schema: "./schemas/schema.ts",
    out: "./drizzle",
    dialect: "sqlite",
    dbCredentials: {
        url: "./cf.db",
    },
} satisfies Config;
