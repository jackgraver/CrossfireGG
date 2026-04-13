export function formatOrdinal(n: number): string {
    const k = Math.abs(Math.floor(n));
    const mod100 = k % 100;
    if (mod100 >= 11 && mod100 <= 13) return `${k}th`;
    switch (k % 10) {
        case 1:
            return `${k}st`;
        case 2:
            return `${k}nd`;
        case 3:
            return `${k}rd`;
        default:
            return `${k}th`;
    }
}

export function formatTeamPlacementSummary(tournamentName: string, placement: string): string {
    const t = placement.trim();
    if (!t) return tournamentName;
    const p = t.toLowerCase();
    if (p === "1st") return `${tournamentName} Winners`;
    if (p === "2nd") return `${tournamentName} Runners Up`;
    if (p === "3rd") return `${tournamentName} 3rd Place`;
    return `${tournamentName} ${t}`;
}

/**
 * Single-elim 3rd-place (bronze) vs grand final: Faceit round numbers overlap (e.g. bronze round 4 / GF round 5, or GF round 4 when there is no bronze).
 * Do not use round alone. Bronze is the only remaining match where either side already has a stage loss before kickoff (both SF losers with ≥1 loss).
 */
export function isThirdPlaceSingleElim(lossesBefore1: number, lossesBefore2: number): boolean {
    return lossesBefore1 > 0 || lossesBefore2 > 0;
}

export function computeRoundsFromFinal(round: number, totalTeams: number): number {
    const totalRounds = Math.max(1, Math.ceil(Math.log2(Math.max(2, totalTeams))));
    let rf = totalRounds - round + 1;
    // Faceit often labels the grand-final match as round (totalRounds + 1), which makes rf === 0.
    // Anything still "at or after" the nominal final round index is treated as one step from the trophy.
    if (rf < 1 && round >= totalRounds) {
        return 1;
    }
    return rf;
}

export function formatLoserPlacementSingleElim(roundsFromFinal: number): string | null {
    if (roundsFromFinal < 1) return null;
    if (roundsFromFinal === 1) return "2nd";
    const low = Math.pow(2, roundsFromFinal - 1) + 1;
    const high = Math.pow(2, roundsFromFinal);
    return `${formatOrdinal(low)}-${formatOrdinal(high)}`;
}

export function shortName(name: string): string {
    const clean = name.trim();

    // Split words
    const words = clean.split(/\s+/).filter(Boolean);

    // Multiple words → first letter of each word
    if (words.length > 1) {
        return words
            .map((w) => w[0].toUpperCase())
            .join("")
            .slice(0, 4);
    }

    const word = words[0];

    // CamelCase → collect uppercase letters
    const caps = word.match(/[A-Z]/g);
    if (caps && caps.length > 1) {
        return caps.join("").slice(0, 4);
    }

    // Fallback → remove vowels (except possibly first letter)
    const noVowels = word.replace(/[aeiou]/gi, "").toUpperCase();

    if (noVowels.length >= 2) {
        return noVowels.slice(0, Math.min(3, noVowels.length));
    }

    // Final fallback if word is very short or vowel-heavy
    return word.toUpperCase().slice(0, 3);
}
