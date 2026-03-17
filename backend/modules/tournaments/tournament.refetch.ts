import { redisGet, redisSet, redisDel } from "../../core/redis";
import { faceitFetchUtil } from "../../utils/faceitFetch.util";
import { faceitImportService } from "../faceit/faceit.service";

const stageCacheKeys = (stageId: number) => [
    `cache:GET:/tournament/stage/${stageId}/matches`,
    `cache:GET:/tournament/stage/${stageId}/bracket`,
    `cache:GET:/tournament/stage/${stageId}/teams`,
];

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
    stages: { id: number; faceit_id: string }[],
): Promise<"processing" | "idle"> {
    const stagesToSync: typeof stages = [];
    let anySyncing = false;

    for (const stage of stages) {
        if (!stage.faceit_id) continue;

        if (await isStageSyncing(stage.faceit_id)) {
            anySyncing = true;
            continue;
        }

        const last = await getLastRefetchTime(stage.faceit_id);
        if (Date.now() - last < CHECK_INTERVAL) {
            console.log(
                `Skipping ${stage.faceit_id}, last refetch was ${Date.now() - last}ms ago`,
            );
            continue;
        }

        stagesToSync.push(stage);
    }

    if (stagesToSync.length === 0) {
        return anySyncing ? "processing" : "idle";
    }

    for (const { faceit_id } of stagesToSync) {
        await markStageSyncing(faceit_id);
    }

    syncStages(stagesToSync).catch(console.error);

    return "processing";
}

async function syncStages(stages: { id: number; faceit_id: string }[]) {
    for (const { id, faceit_id } of stages) {
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
            await Promise.all(stageCacheKeys(id).map(redisDel));
            await clearStageSyncing(faceit_id);
        }
    }
}
