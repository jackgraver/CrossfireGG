export function formatTeamPlacementSummary(
    tournamentName: string,
    placement: number,
): string | null {
    if (placement === 1) return `${tournamentName} Winners`;
    if (placement === 2) return `${tournamentName} Runners Up`;
    if (placement === 3) return `${tournamentName} 3rd Place`;
    return null;
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
