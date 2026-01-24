import "dotenv/config";
import app from "./app";
import { config } from "./config/env";
import { logger } from "./core/logger";

const PORT = config.port;

const server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

server.on("error", (error: NodeJS.ErrnoException) => {
    console.error(error);
});
