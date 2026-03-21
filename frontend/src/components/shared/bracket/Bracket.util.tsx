import type { Match } from "../../types/Types";

export const groupMatchesByRound = (matches: Match[]) => {
    const rounds = new Map<string, Match[]>();

    matches.forEach((match) => {
        const key = match.round;
        if (!rounds.has(key ?? "")) {
            rounds.set(key ?? "", []);
        }
        rounds.get(key ?? "")!.push(match);
    });

    return rounds;
};

export const sortMatchesBySeed = (matches: Match[]) => {
    return matches.sort((a, b) => {
        const aMinSeed = Math.min(a.teams?.team1?.seed ?? 0, a.teams?.team2?.seed ?? 0);
        const bMinSeed = Math.min(b.teams?.team1?.seed ?? 0, b.teams?.team2?.seed ?? 0);
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

export const filterAndSortMatchesByRound = (matches: Match[], round: string) => {
    return matches
        .filter((m) => m.round === round)
        .sort((a, b) => (a.teams?.team1?.seed ?? 0) - (b.teams?.team1?.seed ?? 0));
};

export const getMatchesByGroup = (matches: Match[]) => {
    // Helper: compare rounds (numeric or alphabetical fallback)
    const bracketRoundSortKey = (round: string | null | undefined): number => {
        const r = round ?? "";
        const legacy: Record<string, number> = {
            "1": 4,
            "2": 5,
            "3": 6,
            "4": 7,
            "5": 8,
        };
        if (r in legacy) return legacy[r]!;
        if (r === "QF") return 5;
        if (r === "SF") return 6;
        if (r === "3RD") return 7;
        if (r === "GF" || r === "F") return 8;
        const ro = r.match(/^RO(\d+)$/);
        if (ro) {
            const n = parseInt(ro[1], 10);
            const log = Math.log2(n);
            if (Number.isInteger(log) && log >= 4) return 8 - log;
        }
        const aNum = Number(r);
        if (!isNaN(aNum) && r !== "") return aNum;
        return 1000;
    };

    const roundOrder = (a: Match, b: Match) => {
        const ka = bracketRoundSortKey(a.round);
        const kb = bracketRoundSortKey(b.round);
        if (ka !== kb) return ka - kb;
        return (a.round ?? "").localeCompare(b.round ?? "");
    };

    // Helper: get highest seed between participants
    const maxSeed = (match: Match) => {
        const t1 = match.participants?.[0]?.team?.seed ?? 0;
        const t2 = match.participants?.[1]?.team?.seed ?? 0;
        return Math.max(t1, t2);
    };

    // Group matches
    const grouped = matches.reduce(
        (acc, match) => {
            const groupId = match.group_id ?? "";
            if (!acc[groupId]) {
                acc[groupId] = [];
            }
            acc[groupId].push(match);
            return acc;
        },
        {} as Record<string, Match[]>,
    );

    // Sort each group's matches by round (asc) then by highest seed (desc)
    Object.values(grouped).forEach((matchArr) => {
        matchArr.sort((a, b) => {
            const roundCmp = roundOrder(a, b);
            if (roundCmp !== 0) return roundCmp;
            // If same round, sort by highest seed DESCENDING (highest first)
            return maxSeed(b) - maxSeed(a);
        });
    });

    return grouped;
};
