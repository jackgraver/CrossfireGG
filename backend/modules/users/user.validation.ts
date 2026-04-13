import { z } from "zod";

function firstQueryString(value: unknown): string {
    if (value === undefined || value === null) {
        return "";
    }
    if (Array.isArray(value)) {
        return value[0] !== undefined ? String(value[0]) : "";
    }
    return String(value);
}

/**
 * Normalizes Express `req.query` into a plain object for Zod (handles string | string[]).
 */
export function normalizeUserSearchQuery(query: Record<string, unknown>): { q: string } {
    return { q: firstQueryString(query.q) };
}

export const UserSearchQuerySchema = z.object({
    q: z.string(),
});
