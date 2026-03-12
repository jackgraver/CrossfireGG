import { db } from "../../config/database";
import { faceitFetchUtil } from "../../utils/faceitFetch.util";
import { faceitImportService } from "../faceit/faceit.service";
import { tournamentService } from "./tournament.service";

let LAST_REFETCH_TIME = new Map<string, number>();
const CHECK_INTERVAL = 60 * 60 * 1000;

export async function syncTournamentMatches(
    stages: {
        id: number;
        faceit_id: string;
    }[],
) {
    stages.forEach(async (stage) => {
        const { id, faceit_id } = stage;

        if (!faceit_id) return;

        const timeSinceLastRefetch =
            Date.now() - (LAST_REFETCH_TIME.get(faceit_id) ?? 0);
        if (timeSinceLastRefetch < CHECK_INTERVAL) {
            console.log(
                `Refetch interval not met, skipping sync for ${faceit_id}. Time remaining: ${Math.ceil((CHECK_INTERVAL - timeSinceLastRefetch) / 1000)}s`,
            );
            return;
        }

        const matchesData = [
            ...(await faceitFetchUtil.fetchMatchesData(faceit_id, "upcoming")),
            ...(await faceitFetchUtil.fetchMatchesData(faceit_id, "ongoing")),
        ];

        console.log(
            `Processing matches for ${faceit_id}, found ${matchesData.length} matches`,
        );

        const result = await faceitImportService.processNewStageMatches(
            matchesData,
            id,
        );
        console.log(`Processed ${result.newMatchesCount} new matches`);

        LAST_REFETCH_TIME.set(faceit_id, Date.now());

        return;
    });

    // const matchesData = await faceitFetchUtil.fetchMatchesData(championshipId);

    // const result = await faceitImportService.processNewStageMatches(
    //     matchesData,
    //     stageId,
    // );

    // LAST_REFETCH_TIME = Date.now();
}
