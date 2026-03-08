import { createClient, type RedisClientType } from "redis";
import { config } from "../config/env";
import { logger } from "./logger";

let client: RedisClientType | null = null;
let connecting: Promise<RedisClientType | null> | null = null;

let lastConnectAttemptAt = 0;
let failureCount = 0;

const reconnectCooldownMs = 10_000;
const maxFailures = 3;

const redisUrl = (config.redis?.url ?? "").trim();
const redisConfigured = redisUrl.length > 0;

async function getClient(): Promise<RedisClientType | null> {
    if (redisDisabled()) return null;

    if (!client) {
        try {
            client = createClient({
                url: redisUrl,
                socket: {
                    reconnectStrategy: () => false,
                },
            });
        } catch (err) {
            failureCount = maxFailures;
            logger.warn("Redis client init failed.");
            return null;
        }

        client.on("error", (err) => {
            if (redisDisabled()) return;
            failureCount++;
            logger.warn("Redis client error.");
        });

        client.on("ready", () => {
            failureCount = 0;
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
                failureCount++;
                logger.warn("Redis connect failed. Not using redis.");
                return null;
            })
            .finally(() => {
                connecting = null;
            });
    }

    const c = await connecting;
    return c?.isOpen ? c : null;
}

function redisDisabled(): boolean {
    return !redisConfigured || failureCount >= maxFailures;
}

export async function isRedisAvailable(): Promise<boolean> {
    const c = await getClient();
    return !!c;
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

export async function redisDel(key: string) {
    try {
        const c = await getClient();
        if (!c) return;
        await c.del(key);
    } catch (err) {
        logger.warn("Redis DEL failed", err);
    }
}

export async function invalidateCache() {
    try {
        const c = await getClient();
        if (!c) return;
        await c.flushDb();
    } catch (err) {
        logger.warn("Redis flushDb failed", err);
    }
}
