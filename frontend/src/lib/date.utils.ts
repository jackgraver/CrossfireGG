/**
 * Formats a Unix timestamp to a specific format: Sept 2nd, 2025 @ 9:00PM
 * @param timestamp Unix timestamp in seconds
 * @returns Formatted date string
 */
export const formatScheduledDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);

    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();

    const getOrdinal = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return s[(v - 20) % 10] || s[v] || s[0];
    };

    const time = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    return `${month} ${day}${getOrdinal(day)}, ${year} @ ${time.replace(" ", "")}`;
};

/**
 * Returns the short timezone abbreviation for the user's local timezone
 * (e.g. "EST", "PDT", "GMT+2"). Falls back to an empty string if unavailable.
 */
const getLocalTimezoneAbbr = (date: Date): string => {
    try {
        const parts = new Intl.DateTimeFormat("en-US", {
            timeZoneName: "short",
        }).formatToParts(date);
        return parts.find((p) => p.type === "timeZoneName")?.value ?? "";
    } catch {
        return "";
    }
};

/** US-style week: Sunday–Saturday, matching en-US calendar expectations. */
const startOfCalendarWeek = (d: Date): number => {
    const sod = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const day = d.getDay();
    return sod - day * 24 * 60 * 60 * 1000;
};

/**
 * Formats a Unix timestamp for display in a user-friendly format, always in
 * the user's local timezone.
 *
 * Relative labels: "Today", "Tomorrow". Other days in the same calendar week
 * (Sun–Sat) use the weekday name; further dates use a numeric date. This
 * matches common calendar/agenda UIs (scan-friendly near term, unambiguous
 * when the match is weeks away or in another week).
 *
 * @param timestamp Unix timestamp in seconds
 * @returns Formatted date string
 */
export const formatMatchDate = (timestamp: number): string => {
    const matchDate = new Date(timestamp * 1000);
    const now = new Date();

    const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const dayDiff = Math.round((startOfDay(matchDate) - startOfDay(now)) / MS_PER_DAY);

    const time = matchDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
    const tz = getLocalTimezoneAbbr(matchDate);
    const tzSuffix = tz ? ` ${tz}` : "";

    if (dayDiff === 0) return `Today @${time}${tzSuffix}`;
    if (dayDiff === 1) return `Tomorrow @${time}${tzSuffix}`;

    const sameWeek = startOfCalendarWeek(matchDate) === startOfCalendarWeek(now);
    if (dayDiff > 1 && sameWeek) {
        const weekday = matchDate.toLocaleDateString("en-US", {
            weekday: "long",
        });
        return `${weekday} @${time}${tzSuffix}`;
    }

    const date = matchDate.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    });
    return `${date} @${time}${tzSuffix}`;
};

/**
 * Formats a Unix timestamp to a full date and time string
 * @param timestamp Unix timestamp in seconds
 * @returns Full date and time string
 */
export const formatFullDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString();
};

/**
 * Formats a Unix timestamp to just the date
 * @param timestamp Unix timestamp in seconds
 * @returns Date string
 */
export const formatDateOnly = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleDateString();
};

/**
 * Formats a Unix timestamp to just the time
 * @param timestamp Unix timestamp in seconds
 * @returns Time string
 */
export const formatTimeOnly = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

/**
 * Checks if a date is today
 * @param timestamp Unix timestamp in seconds
 * @returns boolean indicating if the date is today
 */
export const isToday = (timestamp: number): boolean => {
    const matchDate = new Date(timestamp * 1000);
    const today = new Date();
    return matchDate.toDateString() === today.toDateString();
};

/**
 * Converts a date (ISO string, Date object, or Unix timestamp) to Unix timestamp in seconds
 * @param date Date string, Date object, or Unix timestamp in seconds
 * @returns Unix timestamp in seconds
 */
export const toUnixTimestamp = (date: string | Date | number | null | undefined): number | null => {
    if (!date) return null;
    if (typeof date === "number") return date;
    if (typeof date === "string") {
        return Math.floor(new Date(date).getTime() / 1000);
    }
    return Math.floor(date.getTime() / 1000);
};
