export function timestampToUnix(timestamp: Date | null): number | null {
    if (!timestamp) return null;
    return Math.floor(timestamp.getTime() / 1000);
}

export function unixToTimestamp(unix: number): Date {
    return new Date(unix * 1000);
}
