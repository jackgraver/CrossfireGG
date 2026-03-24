import type { Config } from "drizzle-kit";

// export default {
//     schema: "./shared/schemas/index.ts",
//     out: "./drizzle",
//     dialect: "sqlite",
//     dbCredentials: {
//         url: "./cf.db",
//     },
// } satisfies Config;

export default {
    schema: "./backend/schemas",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgres://app-user:defpass@165.232.131.108:5432/cf-db",
    },
} satisfies Config;
