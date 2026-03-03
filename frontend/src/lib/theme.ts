import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import * as z from "zod";

const themeStorageKey = "theme";
export const getThemeServerFn = createServerFn().handler(
    () => getCookie(themeStorageKey) ?? "auto",
);

const setThemeValidator = z.enum(["light", "dark", "auto"]);
export const setThemeServerFn = createServerFn()
    .inputValidator(setThemeValidator)
    .handler(({ data }) => setCookie(themeStorageKey, data));
