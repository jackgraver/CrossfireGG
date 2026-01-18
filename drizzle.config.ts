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
    schema: "./shared/schemas/index.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgres://app_user:app_password@localhost:5432/cf-db",
    },
} satisfies Config;
