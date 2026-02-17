import { MatchWithParticipantsDTO } from "@repo/contracts";

export interface BracketRound {
    name: string;
    matches: (MatchWithParticipantsDTO | undefined)[];
}

export function getPlayoffRounds(
    matches: MatchWithParticipantsDTO[],
): BracketRound[] {
    const rounds: BracketRound[] = [];

    // Define the standard playoff rounds in order
    const roundConfigs = [
        { id: "1", name: "RO16", count: 8 },
        { id: "2", name: "Quarter-Finals", count: 4 },
        { id: "3", name: "Semi-Finals", count: 2 },
        { id: "4", name: "3rd Place", count: 1 },
        { id: "5", name: "Grand Final", count: 1 },
    ];

    for (const config of roundConfigs) {
        const roundMatches = matches
            .filter((m) => m.round === config.id)
            .sort((a, b) => (a.match_number ?? 0) - (b.match_number ?? 0));

        // Fill with undefined if matches are missing to maintain structure
        const filledMatches = [...roundMatches];
        while (filledMatches.length < config.count) {
            filledMatches.push({} as MatchWithParticipantsDTO);
        }

        rounds.push({
            name: config.name,
            matches: filledMatches,
        });
    }

    return rounds;
}
