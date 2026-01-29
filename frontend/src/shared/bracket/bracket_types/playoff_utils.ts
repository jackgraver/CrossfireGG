import { MatchWithParticipantsDTO } from "@repo/contracts";

export interface BracketRound {
    name: string;
    matches: (MatchWithParticipantsDTO | undefined)[];
}

export function getPlayoffRounds(matches: MatchWithParticipantsDTO[]): BracketRound[] {
    const rounds: BracketRound[] = [];
    
    // Define the standard playoff rounds in order
    const roundConfigs = [
        { id: "1", name: "RO16", count: 8 },
        { id: "2", name: "QF", count: 4 },
        { id: "3", name: "SF", count: 2 },
        { id: "5", name: "F", count: 1 }
    ];

    for (const config of roundConfigs) {
        const roundMatches = matches
            .filter(m => m.round === config.id)
            .sort((a, b) => (a.match_number ?? 0) - (b.match_number ?? 0));
        
        // Fill with undefined if matches are missing to maintain structure
        const filledMatches = [...roundMatches];
        while (filledMatches.length < config.count) {
            filledMatches.push(undefined);
        }
        
        rounds.push({
            name: config.name,
            matches: filledMatches
        });
    }

    return rounds;
}
