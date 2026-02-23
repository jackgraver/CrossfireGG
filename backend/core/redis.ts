import { createClient, type RedisClientType } from "redis";
import { config } from "../config/env";
import { logger } from "./logger";

let client: RedisClientType | null = null;
let connecting: Promise<RedisClientType> | null = null;

async function getClient() {
    if (!client) {
        client = createClient({ url: config.redis.url });
        client.on("error", (err) => {
            logger.warn("Redis client error", err);
        });
    }

    if (client.isOpen) return client;
    if (!connecting) {
        connecting = client.connect().then(() => client!).finally(() => {
            connecting = null;
        });
    }
    return connecting;
}

export async function redisGet(key: string) {
    try {
        const c = await getClient();
        return await c.get(key);
    } catch (err) {
        logger.warn("Redis GET failed", err);
        return null;
    }
}

export async function redisSet(key: string, value: string) {
    try {
        const c = await getClient();
        await c.set(key, value);
    } catch (err) {
        logger.warn("Redis SET failed", err);
    }
}

