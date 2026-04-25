export const DOCUMENT_TITLE_BASE = "CROSSFIRE";

export function crossfireTitle(...segments: (string | undefined | null | false)[]): string {
    const parts = segments.filter((s): s is string => Boolean(s && String(s).trim()));
    if (parts.length === 0) {
        return DOCUMENT_TITLE_BASE;
    }
    return `${DOCUMENT_TITLE_BASE} - ${parts.join(" - ")}`;
}
`z`;

export function defaultTitleFromMatches(matches: { pathname: string }[]): string {
    const leaf = matches[matches.length - 1];
    const pathname = leaf?.pathname ?? "/";
    const normalized = pathname.replace(/\/+$/, "") || "/";
    if (normalized === "/") {
        return crossfireTitle("Home");
    }
    const segments = normalized.split("/").filter(Boolean);
    const lastRaw = segments[segments.length - 1] ?? "";
    const isNumericOrUuid =
        /^\d+$/.test(lastRaw) ||
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(lastRaw);
    const key = isNumericOrUuid && segments.length >= 2 ? segments[segments.length - 2]! : lastRaw;
    const label = key
        .replace(/-/g, " ")
        .split(" ")
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
    return crossfireTitle(label);
}

export function teamNameFromMatches(matches: { loaderData?: unknown }[]): string | undefined {
    for (let i = matches.length - 1; i >= 0; i--) {
        const d = matches[i]?.loaderData;
        if (
            d &&
            typeof d === "object" &&
            "teamName" in d &&
            typeof (d as { teamName: unknown }).teamName === "string"
        ) {
            return (d as { teamName: string }).teamName;
        }
    }
    return undefined;
}
