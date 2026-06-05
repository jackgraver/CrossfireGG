import {
    MatchWithParticipantAndMinifiedMapsDTO,
    UpcomingMatchesRefreshDTO,
} from "@repo/contracts";

export type UpcomingMatchChange =
    | "finished"
    | "cancelled"
    | "now_live"
    | "score_updated"
    | "newly_visible";

export type UpcomingMatchDisplayItem = {
    match: MatchWithParticipantAndMinifiedMapsDTO;
    change: UpcomingMatchChange | null;
};

const isLiveStatus = (status: string | null | undefined) => {
    const s = (status ?? "").toLowerCase();
    return s === "live" || s === "ongoing";
};

const participantScores = (match: MatchWithParticipantAndMinifiedMapsDTO) =>
    (match.participants ?? []).map((p) => p.score ?? 0).join(",");

const mapScores = (match: MatchWithParticipantAndMinifiedMapsDTO) =>
    (match.maps ?? []).map((m) => `${m.team1_score}-${m.team2_score}`).join("|");

const getMatchChange = (
    before: MatchWithParticipantAndMinifiedMapsDTO,
    after: MatchWithParticipantAndMinifiedMapsDTO | undefined,
): UpcomingMatchChange | null => {
    if (!after) return null;

    const afterStatus = (after.status ?? "").toLowerCase();
    if (afterStatus === "finished") return "finished";
    if (afterStatus === "cancelled") return "cancelled";
    if (!isLiveStatus(before.status) && isLiveStatus(after.status)) return "now_live";
    if (
        participantScores(before) !== participantScores(after) ||
        mapScores(before) !== mapScores(after)
    ) {
        return "score_updated";
    }
    return null;
};

export const buildUpcomingMatchDisplayItems = (
    baseline: MatchWithParticipantAndMinifiedMapsDTO[],
    refresh: UpcomingMatchesRefreshDTO | undefined,
): UpcomingMatchDisplayItem[] => {
    if (!refresh) {
        return baseline.map((match) => ({ match, change: null }));
    }

    const trackedById = new Map(refresh.trackedMatches.map((match) => [match.id, match]));
    const latestById = new Map(refresh.matches.map((match) => [match.id, match]));
    const baselineIds = new Set(baseline.map((match) => match.id));
    const items: UpcomingMatchDisplayItem[] = [];

    for (const before of baseline) {
        const tracked = trackedById.get(before.id);
        const after = tracked ?? latestById.get(before.id) ?? before;
        const change = getMatchChange(before, tracked ?? after);
        items.push({ match: after, change });
    }

    for (const latest of refresh.matches) {
        if (!baselineIds.has(latest.id)) {
            items.push({ match: latest, change: "newly_visible" });
        }
    }

    return items;
};

export const upcomingMatchChangeLabel = (change: UpcomingMatchChange): string => {
    switch (change) {
        case "finished":
            return "Finished";
        case "cancelled":
            return "Cancelled";
        case "now_live":
            return "Now live";
        case "score_updated":
            return "Score updated";
        case "newly_visible":
            return "New match";
    }
};
