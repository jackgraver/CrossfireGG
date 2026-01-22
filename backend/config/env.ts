export const config = {
    port: parseInt(process.env.PORT || "3000", 10),
    nodeEnv: process.env.NODE_ENV || "development",
    database: {
        path: process.env.DATABASE_PATH || "./cf.db",
        url:
            process.env.DATABASE_URL ??
            "postgresql://app_user:app_password@localhost:5432/cf-db",
    },
    cors: {
        allowedOrigins: ["http://localhost:5173", "https://noted-europe-drainage-stripes.trycloudflare.com"],
    },
    auth: {
        clientId: process.env.FACEIT_CLIENT_ID,
        clientSecret: process.env.FACEIT_CLIENT_SECRET,
    },
    faceit: {
        apiKey: process.env.FACEIT_API_KEY || "",
    },
};
