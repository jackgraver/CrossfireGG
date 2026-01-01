export const config = {
    port: parseInt(process.env.PORT || "3000", 10),
    nodeEnv: process.env.NODE_ENV || "development",
    database: {
        path: process.env.DATABASE_PATH || "./cf.db",
    },
    cors: {
        allowedOrigins: [
            "http://localhost:5173",
            "http://localhost:3000",
        ],
    },
    faceit: {
        apiKey: process.env.FACEIT_API_KEY || "",
    },
};

