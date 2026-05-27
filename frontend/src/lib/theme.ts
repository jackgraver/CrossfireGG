import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import * as z from "zod";

const themeStorageKey = "theme";

/** Same value as `getThemeServerFn` but reads `document.cookie` (client navigations only). */
export function getThemeFromBrowser(): string {
    if (typeof document === "undefined") return "dark";
    const prefix = `${themeStorageKey}=`;
    const row = document.cookie.split("; ").find((r) => r.startsWith(prefix));
    if (!row) return "dark";
    const raw = row.slice(prefix.length);
    try {
        return decodeURIComponent(raw) || "dark";
    } catch {
        return raw || "dark";
    }
}

export const getThemeServerFn = createServerFn().handler(
    () => getCookie(themeStorageKey) ?? "dark",
);

const setThemeValidator = z.enum(["light", "dark", "auto"]);
export const setThemeServerFn = createServerFn()
    .inputValidator(setThemeValidator)
    .handler(({ data }) => setCookie(themeStorageKey, data));
