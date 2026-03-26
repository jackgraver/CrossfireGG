import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import * as z from "zod";

const themeStorageKey = "theme";

/** Same value as `getThemeServerFn` but reads `document.cookie` (client navigations only). */
export function getThemeFromBrowser(): string {
    if (typeof document === "undefined") return "auto";
    const prefix = `${themeStorageKey}=`;
    const row = document.cookie.split("; ").find((r) => r.startsWith(prefix));
    if (!row) return "auto";
    const raw = row.slice(prefix.length);
    try {
        return decodeURIComponent(raw) || "auto";
    } catch {
        return raw || "auto";
    }
}

export const getThemeServerFn = createServerFn().handler(
    () => getCookie(themeStorageKey) ?? "auto",
);

const setThemeValidator = z.enum(["light", "dark", "auto"]);
export const setThemeServerFn = createServerFn()
    .inputValidator(setThemeValidator)
    .handler(({ data }) => setCookie(themeStorageKey, data));
