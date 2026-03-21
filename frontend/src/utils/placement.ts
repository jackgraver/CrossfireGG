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

export function placementMedalClassName(placement: number): string {
    switch (placement) {
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
