import type { MatchWithParticipantsDTO } from "@repo/contracts";
import { formatDateOnly } from "@/lib/date.utils";

export type MatchDayGroup = {
    dateKey: string;
    label: string;
    matches: MatchWithParticipantsDTO[];
};

const UNSCHEDULED_KEY = "__unscheduled__";

function localDateKey(timestampSec: number): string {
    const d = new Date(timestampSec * 1000);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

function sortGroupMatches(dateKey: string, matches: MatchWithParticipantsDTO[]): void {
    if (dateKey === UNSCHEDULED_KEY) {
        matches.sort((a, b) => b.id - a.id);
        return;
    }
    matches.sort((a, b) => {
        const ta = a.scheduled_at ?? 0;
        const tb = b.scheduled_at ?? 0;
        return ta - tb;
    });
}

export function groupMatchesByCalendarDay(matches: MatchWithParticipantsDTO[]): MatchDayGroup[] {
    const map = new Map<string, MatchWithParticipantsDTO[]>();
    for (const m of matches) {
        const key = m.scheduled_at != null ? localDateKey(m.scheduled_at) : UNSCHEDULED_KEY;
        const arr = map.get(key);
        if (arr) arr.push(m);
        else map.set(key, [m]);
    }
    for (const [key, arr] of map) {
        sortGroupMatches(key, arr);
    }
    const datedKeys = [...map.keys()].filter((k) => k !== UNSCHEDULED_KEY);
    datedKeys.sort();
    const groups: MatchDayGroup[] = datedKeys.map((dateKey) => {
        const ms = map.get(dateKey)!;
        const firstTs = ms[0].scheduled_at!;
        return {
            dateKey,
            label: formatDateOnly(firstTs),
            matches: ms,
        };
    });
    if (map.has(UNSCHEDULED_KEY)) {
        groups.push({
            dateKey: UNSCHEDULED_KEY,
            label: "Unscheduled",
            matches: map.get(UNSCHEDULED_KEY)!,
        });
    }
    return groups;
}
