import "dotenv/config";
import app from "./app";
import { config } from "./config/env";
import { logger } from "./core/logger";

const PORT = config.port;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

