import { createClient, type RedisClientType } from "redis";
import { config } from "../config/env";
import { logger } from "./logger";

let client: RedisClientType | null = null;
let connecting: Promise<RedisClientType> | null = null;
let lastConnectAttemptAt = 0;
const reconnectCooldownMs = 10_000;
const redisUrl = (config.redis?.url ?? "").trim();
const redisConfigured = redisUrl.length > 0;

async function getClient() {
    if (!redisConfigured) {
        return null;
    }
    if (!client) {
        client = createClient({ url: redisUrl });
        client.on("error", (err) => {
            logger.warn("Redis client error", err);
        });
    }

    if (client.isOpen) return client;
    const now = Date.now();
    if (now - lastConnectAttemptAt < reconnectCooldownMs) {
        return null;
    }
    if (!connecting) {
        lastConnectAttemptAt = now;
        connecting = client
            .connect()
            .then(() => client!)
            .catch((err) => {
                logger.warn("Redis connect failed", err);
                return null as unknown as RedisClientType;
            })
            .finally(() => {
                connecting = null;
            });
    }
    const connected = await connecting;
    return connected && connected.isOpen ? connected : null;
}

export function isRedisConfigured() {
    return redisConfigured;
}

export async function isRedisAvailable() {
    const c = await getClient();
    return !!c?.isOpen;
}

export async function redisGet(key: string) {
    try {
        const c = await getClient();
        if (!c) return null;
        return await c.get(key);
    } catch (err) {
        logger.warn("Redis GET failed", err);
        return null;
    }
}

export async function redisSet(key: string, value: string, ttl: number = 900) {
    try {
        const c = await getClient();
        if (!c) return;
        await c.set(key, value, { EX: ttl });
    } catch (err) {
        logger.warn("Redis SET failed", err);
    }
}
