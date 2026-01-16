export const config = {
    port: parseInt(process.env.PORT || "3000", 10),
    nodeEnv: process.env.NODE_ENV || "development",
    database: {
        path: process.env.DATABASE_PATH || "./cf.db",
        url:
            process.env.DATABASE_URL ??
            "postgresql://app_user:app_password@localhost:5432/app_db",
    },
    cors: {
        allowedOrigins: ["http://localhost:5173"],
    },
    faceit: {
        apiKey: process.env.FACEIT_API_KEY || "",
    },
};
