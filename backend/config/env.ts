export const config = {
    port: parseInt(process.env.PORT || "5000", 10),
    nodeEnv: process.env.NODE_ENV || "development",
    database: {
        path: process.env.DATABASE_PATH || "./cf.db",
        url: process.env.DATABASE_URL,
    },
    cors: {
        allowedOrigins: ["http://localhost:5173", "http://localhost:3000"],
    },
    auth: {
        clientId: process.env.FACEIT_CLIENT_ID,
        clientSecret: process.env.FACEIT_CLIENT_SECRET,
    },
    faceit: {
        apiKey: process.env.FACEIT_API_KEY || "",
    },
};
