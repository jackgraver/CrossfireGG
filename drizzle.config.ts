import type { Config } from "drizzle-kit";

export default {
    schema: "./schemas/index.ts",
    out: "./drizzle",
    dialect: "sqlite",
    dbCredentials: {
        url: "./cf.db",
    },
} satisfies Config;
