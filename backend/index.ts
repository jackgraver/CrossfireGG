import "dotenv/config";
import app from "./app";
import { config } from "./config/env";
import { logger } from "./core/logger";
import { syncSystemRoles } from "./core/syncRoles";

const PORT = config.port;

async function startServer() {
    try {
        await syncSystemRoles();

        const server = app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });

        server.on("error", (error: NodeJS.ErrnoException) => {
            console.error(error);
        });
    } catch (error) {
        logger.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();
