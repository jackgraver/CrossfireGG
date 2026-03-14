import { redisGet, redisSet, redisDel } from "../../core/redis";
import { faceitFetchUtil } from "../../utils/faceitFetch.util";
import { faceitImportService } from "../faceit/faceit.service";

let LAST_REFETCH_TIME = new Map<string, number>();
const SYNCING_STAGES = new Set<string>();
const CHECK_INTERVAL = 60 * 60 * 1000;
const LAST_REFETCH_TTL = Math.ceil(CHECK_INTERVAL / 1000);
const SYNC_LOCK_TTL = 300;

const lastRefetchKey = (faceitId: string) =>
    `tournament:stage:${faceitId}:last-sync`;
const syncingStageKey = (faceitId: string) =>
    `tournament:stage:${faceitId}:syncing`;

async function getLastRefetchTime(faceitId: string): Promise<number> {
    const redisValue = await redisGet(lastRefetchKey(faceitId));
    if (redisValue) {
        const parsed = Number(redisValue);
        if (!Number.isNaN(parsed)) {
            LAST_REFETCH_TIME.set(faceitId, parsed);
            return parsed;
        }
    }

    return LAST_REFETCH_TIME.get(faceitId) ?? 0;
}

async function setLastRefetchTime(faceitId: string, timestamp: number) {
    LAST_REFETCH_TIME.set(faceitId, timestamp);
    await redisSet(
        lastRefetchKey(faceitId),
        String(timestamp),
        LAST_REFETCH_TTL,
    );
}

async function isStageSyncing(faceitId: string): Promise<boolean> {
    if (SYNCING_STAGES.has(faceitId)) return true;
    return !!(await redisGet(syncingStageKey(faceitId)));
}

async function markStageSyncing(faceitId: string) {
    SYNCING_STAGES.add(faceitId);
    await redisSet(syncingStageKey(faceitId), "1", SYNC_LOCK_TTL);
}

async function clearStageSyncing(faceitId: string) {
    SYNCING_STAGES.delete(faceitId);
    await redisDel(syncingStageKey(faceitId));
}

export async function syncTournamentMatches(
    stages: {
        id: number;
        faceit_id: string;
    }[],
) {
    for (const stage of stages) {
        const { id, faceit_id } = stage;

        if (!faceit_id) continue;

        const lastRefetchTime = await getLastRefetchTime(faceit_id);
        const timeSinceLastRefetch = Date.now() - lastRefetchTime;
        if (timeSinceLastRefetch < CHECK_INTERVAL) {
            console.log(
                `Refetch interval not met, skipping sync for ${faceit_id}. Time remaining: ${Math.ceil((CHECK_INTERVAL - timeSinceLastRefetch) / 1000)}s`,
            );
            continue;
        }

        if (await isStageSyncing(faceit_id)) {
            console.log(`Stage ${faceit_id} is already syncing, skipping.`);
            continue;
        }

        await markStageSyncing(faceit_id);

        try {
            const matchesData =
                await faceitFetchUtil.fetchMatchesData(faceit_id);

            console.log(
                `Processing matches for ${faceit_id}, found ${matchesData.length} matches`,
            );

            const result = await faceitImportService.processNewStageMatches(
                matchesData,
                id,
            );
            console.log(`Processed ${result.newMatchesCount} new matches`);

            await setLastRefetchTime(faceit_id, Date.now());
        } finally {
            await clearStageSyncing(faceit_id);
        }
    }
}
