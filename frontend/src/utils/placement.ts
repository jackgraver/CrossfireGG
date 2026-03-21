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

export function achievementPlacementFromSummaryLabel(
    label: string,
): 1 | 2 | 3 | null {
    if (label.endsWith(" Winners")) return 1;
    if (label.endsWith(" Runners Up")) return 2;
    if (label.endsWith(" 3rd Place")) return 3;
    const lastSpace = label.lastIndexOf(" ");
    if (lastSpace === -1) return null;
    const tail = label.slice(lastSpace + 1).toLowerCase();
    if (tail.startsWith("3rd")) return 3;
    return null;
}

export function achievementTileClassesForPlacement(placement: 1 | 2 | 3): {
    bg: string;
    text: string;
} {
    switch (placement) {
        case 1:
            return { bg: "bg-yellow-500/20", text: "text-yellow-400" };
        case 2:
            return { bg: "bg-gray-500/20", text: "text-gray-400" };
        case 3:
            return { bg: "bg-yellow-900/20", text: "text-orange-400" };
    }
}

function placementTierFromDisplayString(placement: string): 1 | 2 | 3 | null {
    const p = placement.trim().toLowerCase();
    if (p === "1st") return 1;
    if (p === "2nd") return 2;
    if (p === "3rd" || p.startsWith("3rd-")) return 3;
    return null;
}

export function placementMedalClassName(placement: string | number): string {
    const tier =
        typeof placement === "number"
            ? placement >= 1 && placement <= 3
                ? (placement as 1 | 2 | 3)
                : null
            : placementTierFromDisplayString(placement);
    switch (tier) {
        case 1:
            return "text-amber-400";
        case 2:
            return "text-slate-300";
        case 3:
            return "text-orange-400";
        default:
            return "text-textSecondary";
    }
}
