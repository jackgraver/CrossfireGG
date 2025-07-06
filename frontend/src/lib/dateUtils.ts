/**
 * Formats a Unix timestamp for display in a user-friendly format
 * @param timestamp Unix timestamp in seconds
 * @returns Formatted date string
 */
export const formatMatchDate = (timestamp: number): string => {
    console.log(timestamp);
    const matchDate = new Date(timestamp * 1000);
    const today = new Date();

    // Check if the match is today
    const isToday = matchDate.toDateString() === today.toDateString();

    if (isToday) {
        return (
            "Today @" +
            matchDate.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
        );
    }

    return (
        matchDate.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        }) +
        " @" +
        matchDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
    );
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
