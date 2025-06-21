import type { Match } from "../../types/Types";

export const groupMatchesByRound = (matches: Match[]) => {
    const rounds = new Map<string, Match[]>();

    matches.forEach((match) => {
        const key = match.round;
        if (!rounds.has(key)) {
            rounds.set(key, []);
        }
        rounds.get(key)!.push(match);
    });

    return rounds;
};

export const sortMatchesBySeed = (matches: Match[]) => {
    return matches.sort((a, b) => {
        const aMinSeed = Math.min(a.teams.team1.seed, a.teams.team2.seed);
        const bMinSeed = Math.min(b.teams.team1.seed, b.teams.team2.seed);
        return aMinSeed - bMinSeed;
    });
};

export const groupMatchesByRoundAndSort = (matches: Match[]) => {
    const rounds = groupMatchesByRound(matches);

    // Sort each round's matches by seed
    rounds.forEach((roundMatches) => {
        sortMatchesBySeed(roundMatches);
    });

    return rounds;
};
