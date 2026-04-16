import type { MatchWithParticipantAndMinifiedMapsDTO } from "@repo/contracts";

export interface BracketRound {
    name: string;
    matches: (MatchWithParticipantAndMinifiedMapsDTO | undefined)[];
}

const LEGACY_IDS: Record<string, string[]> = {
    RO16: ["1"],
    QF: ["2"],
    SF: ["3"],
    GF: ["5", "F"],
};

function matchRoundColumn(round: string | null | undefined, columnId: string): boolean {
    if (!round) return false;
    if (round === columnId) return true;
    return LEGACY_IDS[columnId]?.includes(round) ?? false;
}

export function getPlayoffRounds(
    matches: MatchWithParticipantAndMinifiedMapsDTO[],
): BracketRound[] {
    const rounds: BracketRound[] = [];

    const roundConfigs = [
        { id: "RO16", name: "RO16", count: 8 },
        { id: "QF", name: "QF", count: 4 },
        { id: "SF", name: "SF", count: 2 },
        { id: "GF", name: "F", count: 1 },
    ];

    for (const config of roundConfigs) {
        const roundMatches = matches
            .filter((m) => matchRoundColumn(m.round, config.id))
            .sort((a, b) => (a.match_number ?? 0) - (b.match_number ?? 0));

        const filledMatches: (MatchWithParticipantAndMinifiedMapsDTO | undefined)[] = [
            ...roundMatches,
        ];
        while (filledMatches.length < config.count) {
            filledMatches.push(undefined);
        }

        rounds.push({
            name: config.name,
            matches: filledMatches,
        });
    }

    return rounds;
}
